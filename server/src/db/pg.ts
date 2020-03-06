import { Client } from 'pg';


export class pgDb {

  private client: Client;
  isConnected(): boolean {
    return !!this.client;
  }

  connect(): Promise<void> {

    console.log('Connecting to database...');
    return new Promise((resolve, reject) => {

      this.client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: true,
      });
      console.log('Connecting to database... client created');

      this.client.connect();
      console.log('Connecting to database... connected');

      this.client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
        if (err) {
          console.error('Database connection failed: ' + err.stack);
          reject(err);
        }

        console.log('Connecting to database... res:', res);
        if (res && res.rows && res.rows.length) {
          for (let row of res.rows) {
            console.log(JSON.stringify(row));
          }
        }

        console.log('Connected to database.');
        resolve();
      });
    });
  }

  query<T>(queryString: string): Promise<T>;
  query<T, V>(queryString: string, values?: V): Promise<T>;

  query<T, V>(queryString: string, values?: V): Promise<T> {
    return new Promise((resolve, reject) => {
      // const query = this.connection.query( queryString, values, (err, rows) => {
      //     if (err) {
      //         console.error('Query failed: ' + err.stack);
      //         reject(err);
      //     } else {
      //         console.log('Query successfully executed.');
      //         resolve(rows);
      //     }
      // });
      // console.log('Query: ', query.sql);
      reject();
    });
  }

  disconnect(): void {
    if (this.client) {
      this.client.end();
    }
  }
}

export const db = new pgDb();
