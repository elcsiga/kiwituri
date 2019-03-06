import * as passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import {db} from "../db/mysql";
import {ChangePasswordData, User} from "../common/interfaces/user";
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
                        return done(null, users[0]);
                    } else {
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


    passport.serializeUser(function (user: User, cb) {
        cb(null, user.email);
    });

    passport.deserializeUser(function (email, cb) {
        db.query<User[], any>('SELECT email, fullName FROM users WHERE email = ?', email)
            .then(users => {
                if (users.length === 1) {
                    cb(null, users[0]);
                } else {
                    cb('No user found for session')
                }
            })
            .catch(err => {
                cb(err);
            });
    });

    //app.use(passport.authenticate('local'));

    app.post('/api/auth/login', function (req, res, next) {
        passport.authenticate('local', function (err, user: User, info) {

            if (err) {
                sendError(res, 400, 'Authentucation error', err);
            } else if (user) {
                req.logIn(user, function (err) {
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

        expectLoggedInUser(req);

        req.logOut();
        console.log('SUCCESSFUL LOGOUT');
        res.json(null);
    });

    app.post('/api/auth/change-password', function (req, res, next) {
        expectLoggedInUser(req);
        const data: ChangePasswordData = req.body;
        if (data && data.newPassword && data.oldPassword && data.newPasswordAgain) {
            db.query<any[], string>('SELECT password FROM users WHERE email = ?', req.user.email)
                .then(users => {
                    if (users.length !== 1) {
                        sendError(res, 400, 'Cannot find user.');
                    } else if (users[0].password !== data.oldPassword) {
                        sendError(res, 400, 'Old password does not match.', 'WRONG_OLD_PASSWORD');
                    } else if (data.newPassword !== data.newPasswordAgain) {
                        sendError(res, 400, 'New passwords do not match.', 'PASSWORDS_NOT_MATCH');
                    } else if (data.newPassword.length < 6) {
                        sendError(res, 400, 'New passwords is too short.', 'PASSWORD_TOO_SHORT');
                    } else {
                        db.query<any, [{password: string}, number]>('UPDATE users SET ? WHERE email = ?',
                            [{password: data.newPassword}, req.user.email])
                            .then(() => {
                                res.json(req.user);
                            })
                            .catch(err => {
                                sendError(res, 400, 'Could not update user.', err);
                            });
                    }

                })
                .catch(err => {
                    sendError(res, 400, 'Could not find user.', err);
                });
        } else {
            sendError(res, 400, 'No payload provided.');
        }
    });

    app.get('/api/user', function (req, res, next) {
        expectLoggedInUser(req);

        db.query<User[]>('SELECT email, fullName FROM users')
            .then(users => {
                res.json(users);
            })
            .catch(err => {
                sendError(res, 400, 'Could not retrieve users.', err);
            });
    });
}


