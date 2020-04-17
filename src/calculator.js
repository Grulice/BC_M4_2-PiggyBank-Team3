let getBestProduct = (bankProducts, userInput) => {
  let bestProduct;
  let filteredProducts = filterProducts(bankProducts, userInput);
  let sortedFilteredProducts = sortFilteredProducts(filteredProducts)
  if (typeof sortedFilteredProducts === "string") return "Sorry we can't find appropriate product";
  else {
    bestProduct = calculate(sortedFilteredProducts[0], userInput);
    return bestProduct;
  }
}

let getAlternativeProduct = (bankProducts, userInput) => {
  let filteredBankProducts = alternativeProductsFilter(bankProducts, userInput);
  let alternativeOption = [];

  if (filteredBankProducts.length > 1 && filteredBankProducts.length != undefined) {
    let bestProductBySum = calculate(filteredBankProducts[0], userInput);
    alternativeOption.push(bestProductBySum);
    let bestProductByTerm = calculate(filteredBankProducts[1], userInput);
    alternativeOption.push(bestProductByTerm);
    return alternativeOption;
  } if (filteredBankProducts.length == 1 && filteredBankProducts.length != undefined) {
    let bestProduct = calculate(filteredBankProducts[0], userInput);
    alternativeOption.push(bestProduct);
    return alternativeOption;
  } if (filteredBankProducts.length == undefined || filteredBankProducts.length == 0) {
    return "Sorry we can't find appropriate product";
  }
}

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

let sortFilteredProducts = (bankProducts) => {
  let finalProduct = [];
  if (bankProducts.length > 1) {
    let sorted = bankProducts.sort((a, b) => {
      return b.income - a.income;
    });
    finalProduct.push(sorted[0])
    return finalProduct;;
  } else if (bankProducts.length == 1) {
    finalProduct.push(bankProducts[0]);
    return finalProduct;
  }
  else return 'По вашим параметрам вкладов не найдено'
};

let calculate = (bankProduct, userInput) => {
  let totalSum = userInput.initSum;
  let monthlyDeposit = getMonthlyDeposit(
    userInput.initSum,
    userInput.desiredSum,
    userInput.term,
    bankProduct.income / 100 / 12
  );
  let monthlyInfo = [];

  for (let i = 0; i < userInput.term; i++) {
    let currentMonth = {};
    currentMonth.startBalance = totalSum;
    currentMonth.monthlyInterest = totalSum * (bankProduct.income / 100 / 12);
    totalSum = totalSum * (1 + bankProduct.income / 100 / 12) + monthlyDeposit;
    currentMonth.endBalance = totalSum;
    monthlyInfo.push(currentMonth);
  }
  let option = {
    deposit: bankProduct.deposit,
    income: bankProduct.income,
    sum: Math.ceil(totalSum),
    userTerm: userInput.term,
    minTerm: bankProduct.minTerm,
    monthlyDeposit: monthlyDeposit,
    monthlyInfo: monthlyInfo,
  };
  ;

  return option;
};

let getMonthlyDeposit = (initial, target, t, perc) => {
  let monthlyDeposit = ((target - initial * (1 + perc) ** t) * perc) / ((1 + perc) ** t - 1);
  if (monthlyDeposit < 0) {
    return 0;
  } else return monthlyDeposit;
};

let alternativeProductsFilter = (bankProducts, userInput) => {
  let highestIncomeBySum;
  let highestIncomeByTerm;
  let filteredBySum = bankProducts
    .filter((product) => {
      return (
        product.minSumm <= userInput.initSum + 50000 &&
        (product.maxSumm >= userInput.initSum + 50000 || product.maxSumm === "")
      );
    })
  if (filteredBySum.length > 1) {
    highestIncomeBySum = filteredBySum.sort((a, b) => {
      return b.income - a.income;
    });
  }

  let filteredByTerm = bankProducts.filter((product) => {
    return (
      product.minTerm <= userInput.term + 3 && product.maxTerm >= userInput.term + 3
    );
  });
  if (filteredByTerm.length > 1) {
    highestIncomeByTerm = filteredByTerm.sort((a, b) => {
      return b.income - a.income;
    });
  }
  return [highestIncomeBySum[0], highestIncomeByTerm[0]];
  // .filter( (bankProduct) =>{
  //     return bankProduct.currency == userInput.currency;
  // })
};


module.exports = { getBestProduct, getAlternativeProduct };


