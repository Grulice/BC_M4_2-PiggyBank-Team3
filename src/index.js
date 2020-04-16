const fetcher = require("./fetcher");

// FETCHER DEMO
const goBtn = document.getElementById("goFetch");

goBtn.addEventListener("click", () => {
  fetcher.getDeposits().then((result) => console.log(result));
});
