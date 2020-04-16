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
    let monthes = 0;
    for (let i = 0; i < userInput.term; i++) {
      if (totalSum < userInput.desiredSum) {
        totalSum *= 1 + product.income / 100 / 12;
        monthes++;
      } else break;
    }
    let option = {
      deposit: product.deposit,
      income: product.income,
      sum: totalSum,
      userTerm: userInput.term,
      requiredMonthes: monthes,
    };
    if (totalSum < userInput.desiredSum) {
      let additionalMonthlySaving = (userInput.desiredSum - totalSum) / 12;
      option.addSaving = additionalMonthlySaving;
    } else option.addSaving = 0;
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

module.exports = { getBestProduct };
