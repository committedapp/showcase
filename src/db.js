import {MongoClient} from "mongodb";

let db;

async function connectToDb(cb){
    const client = new MongoClient(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.owpnjqq.mongodb.net/?retryWrites=true&w=majority`);
    await client.connect();
     db = client.db('committed-show-case-db'); // cli 'da use react-blog-db 'ye eşir
     cb();
}

export {
    db,
    connectToDb,
};