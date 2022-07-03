import axios from 'axios';
import dotenv from 'dotenv';
import moment from 'moment';
import logger from 'node-color-log';
import nodemailer from 'nodemailer';
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
  GITHUB_API_URL,
  EMAIL_USERNAME,
  EMAIL_PASSWORD,
  ONGDEV_EMAIL,
} = process.env;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USERNAME,
    pass: EMAIL_PASSWORD,
  },
});

let longLivedFacebookToken = '';
let fbPageToken = '';

let statCache;

function sendNotificationEmail() {
  const mailOptions = {
    from: EMAIL_USERNAME,
    to: ONGDEV_EMAIL,
    subject: 'Update facebook token',
    text: 'Nothing',
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      logger.error(error);
    } else {
      logger.info(`Email sent: ${info.response}`);
    }
  });
}

export async function fetchYoutubeStats() {
  const ENDPOINT = `${YOUTUBE_API_URL}channels?part=statistics&id=${YOUTUBE_CHANNEL_ID}&key=${YOUTUBE_API_KEY}`;
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
      viewCount: +viewCount,
      subscriberCount: +subscriberCount,
      videoCount: +videoCount,
      loggedAt: today,
    };

    let result = await youtube.findOneAndUpdate({ loggedAt: today }, {
      $set: {
        viewCount: +viewCount,
        subscriberCount: +subscriberCount,
        videoCount: +videoCount,
      },
    });

    if (!result) {
      result = await youtube.insert(youtubeRecord);
    }
    return result;
  } catch (error) {
    logger.error(error.message);
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
  } catch (error) {
    if (error.response) {
      sendNotificationEmail();
      logger.error(error.response.data);
    } else {
      logger.error(error.message);
    }
  }
}

export async function fetchGithubStats() {
  try {
    const USER_ENDPOINT = `${GITHUB_API_URL}users/milonguyen95`;
    const response = await axios.get(USER_ENDPOINT);
    const {
    // eslint-disable-next-line camelcase
      public_repos,
      // eslint-disable-next-line camelcase
      public_gists,
      followers,
    } = response.data;
    const today = moment().format('LL');
    const githubRecord = {
      repoCount: public_repos,
      gistCount: public_gists,
      followerCount: followers,
      loggedAt: today,
    };
    let result = await github.findOneAndUpdate({ loggedAt: today }, {
      $set: {
        repoCount: public_repos,
        gistCount: public_gists,
        followerCount: followers,
      },
    });
    if (!result) {
      result = await github.insert(githubRecord);
    }
  } catch (error) {
    logger.error(error.message);
  }
}

export async function fetchAllStats() {
  await fetchYoutubeStats();
  await fetchFacebookStats();
  await fetchGithubStats();
}

export async function getTotalStats() {
  if (statCache) {
    const { cacheTime, data } = statCache;
    const durationUntilNow = moment.duration(cacheTime.diff(moment())).asSeconds();
    if (durationUntilNow < 30) {
      return data;
    }
  }
  const today = moment().format('LL');
  const youtubeStat = await youtube.findOne({ loggedAt: today });
  const facebookStat = await facebook.findOne({ loggedAt: today });
  const githubStat = await github.findOne({ loggedAt: today });
  const stats = {};
  if (youtubeStat) {
    const {
      viewCount,
      subscriberCount,
      videoCount,
    } = youtubeStat;
    stats.youtube = {
      viewCount,
      subscriberCount,
      videoCount,
    };
  }

  if (facebookStat) {
    const {
      followerCount,
    } = facebookStat;

    stats.facebook = {
      followerCount,
    };
  }

  if (githubStat) {
    const {
      repoCount,
      gistCount,
      followerCount: githubFollowerCount,
    } = githubStat;
    stats.github = {
      repoCount,
      gistCount,
      followerCount: githubFollowerCount,
    };
  }
  statCache = {
    cacheTime: moment(),
    data: stats,
  };
  return stats;
}
