
import * as mysql from 'mysql';
import { Connection } from "mysql";

export class mysqlDb {

    private connection: Connection;
    connect(): Promise<void> {
        //this.connection = mysql.createConnection({
        //    host     : process.env.RDS_HOSTNAME || 'localhost',
        //    user     : process.env.RDS_USERNAME || 'kiwituri',
        //    password : process.env.RDS_PASSWORD || 'kiwituri',
        //    port     : +process.env.RDS_PORT || 3306,
        //    database : process.env.RDS_DB_NAME || 'kiwituri'
        //});//

        this.connection = mysql.createConnection({
            host     : 'kiwituri-db.cfmu4x1pt5tn.eu-central-1.rds.amazonaws.com',
            user     : 'root',
            password : '27esMysql',
            port     : 3306,
            database : 'kiwituri'
        });

        return new Promise( (resolve, reject) => {
            this.connection.connect(err => {
                if (err) {
                    console.error('Database connection failed: ' + err.stack);
                    reject(err);
                } else {
                    console.log('Connected to database.');
                    resolve();
                }
            });
        });
    }

    query( queryString: string, values?: any): Promise<any> {
        return new Promise( (resolve, reject) => {
            this.connection.query( queryString, values, (err, rows) => {
                if (err) {
                    console.error('Query failed: ' + err.stack);
                    reject(err);
                } else {
                    console.log('Query executed.');
                    resolve(rows);
                }
            });
        });
    }

    disconnect(): void {
        if (this.connection){
            this.connection.end();
        }
    }
}

export const db = new mysqlDb();
