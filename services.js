import axios from 'axios';
import dotenv from 'dotenv';
import moment from 'moment';
import logger from 'node-color-log';
import db from './db.js';

dotenv.config();

const youtube = db.get('youtube');
const facebook = db.get('facebook');
const github = db.get('github');

const {
  YOUTUBE_API_URL,
  YOUTUBE_API_KEY,
  YOUTUBE_CHANNEL_ID,
  FACEBOOK_API_URL,
  FACEBOOK_PAGE_ID,
  FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET,
} = process.env;

// export async function getAllStats(){

// }

let longLivedFacebookToken = '';
let fbPageToken = '';

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
    let result = await youtube.findOneAndUpdate({ loggedAt: today }, {
      $set: {
        viewCount,
        subscriberCount,
        videoCount,
      },
    });
    console.log('here');
    if (!result) {
      result = await youtube.insert(youtubeRecord);
    }
    return result;
  } catch (error) {
    return error.message;
  }
}

export async function getFacebookAccessToken(shortLivedToken) {
  try {
    const ENDPOINT = `${FACEBOOK_API_URL}oauth/access_token?grant_type=fb_exchange_token&client_id=${FACEBOOK_CLIENT_ID}&client_secret=${FACEBOOK_CLIENT_SECRET}&fb_exchange_token=${shortLivedToken}`;
    const response = await axios.get(ENDPOINT);
    logger.info(response.data.access_token);
    longLivedFacebookToken = response.data.access_token;
    const PAGE_TOKEN_ENDPOINT = `${FACEBOOK_API_URL}${FACEBOOK_PAGE_ID}?fields=access_token&access_token=${shortLivedToken}`;
    const pageTokenResponse = await axios.get(PAGE_TOKEN_ENDPOINT);
    fbPageToken = pageTokenResponse.data.access_token;
  } catch (error) {
    logger.error(error.message);
  }
}

export async function fetchFacebookImpressions() {
  const ENDPOINT = `${FACEBOOK_API_URL}${FACEBOOK_PAGE_ID}/insights?metric=page_impressions&date_preset=today&access_token=${fbPageToken}`;
  const response = await axios.get(ENDPOINT);
  return response.data.data[0]?.values[0]?.value;
}

export async function fetchFacebookFollowerCount() {
  const FOLLOWER_COUNT_ENDPOINT = `${FACEBOOK_API_URL}${FACEBOOK_PAGE_ID}?fields=followers_count&access_token=${longLivedFacebookToken}`;
  const response = await axios(FOLLOWER_COUNT_ENDPOINT);
  return response.data.followers_count;
}

export async function fetchFacebookStats() {
  try {
    if (!longLivedFacebookToken || longLivedFacebookToken === '' || !fbPageToken || fbPageToken === '') {
      throw Error('Token is invalid, please try generate new token');
    }
    const followerCount = await fetchFacebookFollowerCount();
    const impressionCount = await fetchFacebookImpressions();
    const today = moment().format('LL');
    const facebookRecord = {
      followerCount,
      impressionCount,
      loggedAt: today,
    };
    let result = await facebook.findOneAndUpdate({ loggedAt: today }, {
      $set: {
        followerCount,
        impressionCount,
      },
    });
    if (!result) {
      result = await facebook.insert(facebookRecord);
    }
    logger.info(`Saved facebook record with followerCount: ${followerCount} and impressionCount: ${impressionCount}`);
  } catch (error) {
    logger.error(error.response.data);
  }
}

// export async function fetchGithubStats(){

// }
