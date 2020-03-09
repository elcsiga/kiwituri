import { Client } from 'pg';


export class pgDb {

  private client: Client;
  isConnected(): boolean {
    return !!this.client;
  }

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: true,
      });
      console.log('Connecting to database... ', process.env.DATABASE_URL);
      this.client.connect();
      this.client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
        if (err || !res) {
          console.error('Database connection failed: ' + err.stack);
          reject(err);
        }
        console.log('Connected to database.');
        resolve();
      });
    });
  }

  query<T>(queryString: string): Promise<T>;
  query<T, V>(queryString: string, values?: any[]): Promise<T>;

  query<T, V>(queryString: string, values?: any[]): Promise<T> {
    return new Promise((resolve, reject) => {    
      this.client.query(queryString, values, (err, res) => {
        if (err || !res) {
          console.error('Query failed: ' + err.stack);
          reject(err);
        } else {
          console.log('Query successfully executed.');
          resolve(res.rows);
        }
      });
    });
  }

  disconnect(): void {
    if (this.client) {
      this.client.end();
    }
  }
}

export const db = new pgDb();
