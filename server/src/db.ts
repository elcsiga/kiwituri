import { Collection, Db, MongoClient, MongoClientOptions, ObjectId } from 'mongodb';

export async function setupDb(): Promise<Db> {

    const server = process.env.MONGODB_URI || 'mongodb://localhost:27017';
    const user = process.env.MONGODB_USER;
    const password = process.env.MONGODB_PASSWORD;

    const options: MongoClientOptions = (user && password) ? {
        useNewUrlParser: true,
        auth: { user, password }
    } : {
        useNewUrlParser: true
    };

    const client = await MongoClient.connect(server,  options);
    console.log('Connected to mongoDB');

    return client.db('kiwituri');
}
