let getBestProduct = (bankProducts, userInput) => {
  let bestProduct;
  let filteredProducts = filterProducts(bankProducts, userInput);
  if (filteredProducts.length > 0) {
    bestProduct = calculate(filteredProducts, userInput);
    return bestProduct[0];
  } else {
    return "Sorry we can't find appropriate product";
  }
};

let filterProducts = (bankProducts, userInput) => {
  let filteredProducts = bankProducts
    .filter((product) => {
      return (
        product.minSumm <= userInput.initSum &&
        (product.maxSumm >= userInput.initSum || product.maxSumm === "")
      );
    })
    .filter((product) => {
      return (
        product.minTerm <= userInput.term && product.maxTerm >= userInput.term
      );
    });
  return filteredProducts;
  // .filter( (bankProduct) =>{
  //     return bankProduct.currency == userInput.currency;
  // })
};

let calculate = (bankProducts, userInput) => {
  let result = [];
  for (let product of bankProducts) {
    let totalSum = userInput.initSum;
    // * (1 + product.income / 100 / 12);
    let monthlyDeposit = getMonthlyDeposit(
      userInput.initSum,
      userInput.desiredSum,
      userInput.term,
      product.income / 100 / 12
    );
    let monthlyInfo = [];
    // monthlyInfo.push({
    //     startBalance: userInput.initSum,
    //     endBalance: totalSum,
    //     monthlyInterest: userInput.initSum * (product.income / 100 / 12)
    // });
    for (let i = 0; i < userInput.term; i++) {
      let currentMonth = {};
      currentMonth.startBalance = totalSum;
      currentMonth.monthlyInterest = totalSum * (product.income / 100 / 12);
      totalSum = totalSum * (1 + product.income / 100 / 12) + monthlyDeposit;
      currentMonth.endBalance = totalSum;
      monthlyInfo.push(currentMonth);
    }
    let option = {
      deposit: product.deposit,
      income: product.income,
      sum: Math.ceil(totalSum),
      userTerm: userInput.term,
      minTerm: product.minTerm,
      monthlyDeposit: monthlyDeposit,
      monthlyInfo: monthlyInfo,
    };
    result.push(option);
  }
  return sortResults(result);
};

let sortResults = (result) => {
  let sortedResult = result.sort((a, b) => {
    return b.totalSum - a.totalSum;
  });
  let highestSum = sortedResult[0].totalSum;
  let finalResult = sortedResult.filter(
    (option) => option.totalSum == highestSum
  );
  if (finalResult.length > 1) {
    let sortedFinalResult = finalResult.sort((a, b) => {
      return b.requiredMonthes - a.requiredMonthes;
    });
    let shortestTerm = sortedFinalResult[0].requiredMonthes;
    let superFinalResult = sortedFinalResult.filter(
      (option) => option.requiredMonthes == shortestTerm
    );
    return superFinalResult;
  } else return finalResult;
};

let getMonthlyDeposit = (initial, target, t, perc) => {
  let monthlyDeposit = ((target - initial * (1 + perc) ** t) * perc) / ((1 + perc) ** t - 1);
  if (monthlyDeposit<0){
    return 0;
  } else return monthlyDeposit;
};

module.exports = { getBestProduct };
