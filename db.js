import monk from 'monk';
import dotenv from 'dotenv';

dotenv.config();
const { MONGODB_URL } = process.env;
const db = monk(MONGODB_URL || 'localhost/mydb');

const youtube = db.get('youtube');
(async () => await youtube.createIndex({ loggedAt: 1 }, { unique: true }))();

const facebook = db.get('facebook');
(async () => await facebook.createIndex({ loggedAt: 1 }, { unique: true }))();

const github = db.get('github');
(async () => await github.createIndex({ loggedAt: 1 }, { unique: true }))();

export default db;
