import { getFacebookAccessToken, fetchAllStats } from './services.js';

async function fetchStats() {
    try {
        await fetchAllStats();    
    } catch (error) {
        console.error(error);
    } 
}

async function updateFBToken(token) {
    try {
        await getFacebookAccessToken(token);
        await fetchAllStats();
        console.log('Successfully updated token');
    } catch (error) {
        console.error(error);
    }
}

// (async () => {
//     await updateFBToken('');
// })();

// (async () => {
//     await fetchStats();
// })();