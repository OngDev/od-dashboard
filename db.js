import monk from 'monk';
import dotenv from 'dotenv';

dotenv.config();
const { MONGODB_URL } = process.env;
const db = monk(MONGODB_URL || 'localhost/mydb');

const youtube = db.get('youtube');
youtube.createIndex({ loggedAt: 1 }, { unique: true });

const facebook = db.get('facebook');
facebook.createIndex({ loggedAt: 1 }, { unique: true });

const github = db.get('github');
github.createIndex({ loggedAt: 1 }, { unique: true });

export default db;
