import * as passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import {db} from "../db/mysql";
import {User} from "../common/interfaces/user";
import {sendError, ServerError} from "../utils/error";
import {Express} from "express";
import * as session from 'express-session';


export function expectLoggedInUser(req) {
    if (!req.user) {
        throw new ServerError(401, 'This feature is for authenticated users only.')
    }
}
export function initAuth(app: Express) {

    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        }, (email, password, done) => {
            db.query<User[], [string, string]>('SELECT email, fullName FROM users WHERE email = ? AND password = ?', [email, password])
                .then(users => {

                    console.log(users);

                    if (users.length === 1) {
                        console.log('ok');
                        return done(null, users[0]);
                    } else {
                        console.log('nem');
                        return done(null, false, {message: 'Invalid username or password'});
                    }
                })
                .catch(err => {
                    done(err);
                });
        }
    ));


    app.use(session({secret: "kwtscrt"}));
    app.use(passport.initialize());
    app.use(passport.session());


    passport.serializeUser(function(user: User, cb) {
        cb(null, user.email);
    });

    passport.deserializeUser(function(email, cb) {
        db.query<User[], any>('SELECT email, fullName FROM users WHERE email = ?', email)
            .then(users => {
                if (users.length === 1) {
                    cb(null, users[0]);
                }
                else {
                    cb('No user found for session')
                }
            })
            .catch( err => {
                cb(err);
            });
    });

    //app.use(passport.authenticate('local'));

    app.post('/api/auth/login', function (req, res, next) {
        passport.authenticate('local', function (err, user: User, info) {

            if (err) {
                sendError(res, 400, 'Authentucation error', err);
            } else if (user) {
                req.logIn(user, function(err) {
                    if (err) {
                        sendError(res, 400, 'Error setting up session', err);
                    } else {
                        console.log('SUCCESSFUL LOGIN: ' + user.email);
                        res.json(user);
                    }
                });
            } else {
                sendError(res, 401, 'Authentication failed', info);
            }

        })(req, res, next);
    });

    app.get('/api/auth/me', function (req, res, next) {
        const user = req.user;
        if (user) {
            res.json(user);
        } else {
            res.json(null);
        }
    });

    app.get('/api/auth/logout', function (req, res, next) {
        req.logOut();
        console.log('SUCCESSFUL LOGOUT');
        res.json(null);
    });
}


