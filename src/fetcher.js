const INFO_EXPIRY_THRESHOLD_SECONDS = 60;
const MOCKAPI_BASE_URL = "https://5e8e012722d8cd0016a79e5c.mockapi.io";
let lastFetchTime = -1;
let lastFetchResult = [];

function getDeposits() {
  if (
    Date.now() - lastFetchTime > INFO_EXPIRY_THRESHOLD_SECONDS * 1000 ||
    lastFetchTime === -1
  ) {
    // only fetch if info is older than threshold or if invoking for the first time
    const fetchURL = MOCKAPI_BASE_URL + "/deposits";
    const fetchResult = fetch(fetchURL);

    return fetchResult
      .then((unparsed) => {
        return unparsed.json();
      })
      .then((parsed) => {
        // save the timestamp and cache the result
        lastFetchTime = Date.now();
        lastFetchResult = parsed;

        return parsed;
      });
  } else {
    // return the cached result if info is fresh
    return Promise.resolve(lastFetchResult);
  }
}

module.exports = {
  getDeposits,
};
