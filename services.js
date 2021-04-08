import axios from 'axios';
import dotenv from 'dotenv';
import moment from 'moment';
import db from './db.js';

dotenv.config();

const youtube = db.get('youtube');
const facebook = db.get('facebook');
const github = db.get('github');

const { YOUTUBE_API_URL, YOUTUBE_API_KEY, YOUTUBE_CHANNEL_ID } = process.env;

// export async function getAllStats(){

// }

export async function fetchYoutubeStats() {
  const ENDPOINT = `${YOUTUBE_API_URL}channels?part=statistics&id=${YOUTUBE_CHANNEL_ID}&key=${YOUTUBE_API_KEY}`;
  console.log(ENDPOINT);
  try {
    const response = await axios.get(ENDPOINT);
    const channel = response.data.items[0];
    const {
      statistics: {
        viewCount,
        subscriberCount,
        videoCount,
      },
    } = channel;
    const today = moment().format('LL');
    const youtubeRecord = {
      viewCount,
      subscriberCount,
      videoCount,
      loggedAt: today,
    };
    let result = await youtube.findOneAndUpdate({ loggedAt: today }, { $set: {
      viewCount,
      subscriberCount,
      videoCount,
    }});
    console.log('here');
    if (!result) {
      result = await youtube.insert(youtubeRecord);
    }
    return result;
  } catch (error) {
    return error.message;
  }
}

export async function fetchFacebookStats(){
  // Get facebook like
  
}

// export async function fetchGithubStats(){

// }
