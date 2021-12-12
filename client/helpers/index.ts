// sortes the table by the given sortBy string and SortBy direction
export const sortTable = (
  shownValues: Stockvalue[],
  sortBy: keyof Stockvalue,
  sortDescending: boolean
) => {
  return shownValues.sort((value1: Stockvalue, value2: Stockvalue) => {
    if (sortBy === "symbol") {
      if (sortDescending) return value2.symbol.localeCompare(value1.symbol);
      return value1.symbol.localeCompare(value2.symbol);
    }
    if (sortBy === "mentions" || sortBy === "sentiment") {
      if (sortDescending) return value1[sortBy] < value2[sortBy] ? 1 : -1;
      return value1[sortBy] > value2[sortBy] ? 1 : -1;
    }
    if (sortBy === "price") {
      return sortByParsedFloat(
        value1.price.split("$")[0],
        value2.price.split("$")[0],
        sortDescending
      );
    }
    return sortByParsedFloat(value1[sortBy], value2[sortBy], sortDescending);
  });
};

const sortByParsedFloat = (
  firstValue: string,
  secondValue: string,
  sortDescending: boolean
) => {
  const firstParsed = parseFloat(firstValue);
  const secondParsed = parseFloat(secondValue);
  if (sortDescending) return firstParsed < secondParsed ? 1 : -1;
  return firstParsed < secondParsed ? -1 : 1;
};

  //takes all stockvalues and groups them by the corresponding stock symbol
export const groupStockValuesByStock = (stockValues: Stockvalue[]) => {
    let groups: StockvalueGroup[] = [];
    for (let i = 0; i < stockValues.length; i++) {
      const value = stockValues[i];
      const groupSymbols = groups.map((group: Stockvalue) => group.symbol);
      const indexOfValue = groupSymbols.indexOf(value.symbol);
      // if there is no group for the current symbol create a new one and add the current entry
      if (indexOfValue === -1) {
        groups.push({ ...value, numberOfValues: 1, cummulativePrice: value.price });
        continue;
      } 
      //add the current value's values to the totals of the group
      const cummulativePrice = parseFloat(groups[indexOfValue].price.split("$")[1]);
      const newPrice = parseFloat(value.price.split("$")[1]);
      groups[indexOfValue] = {
        ...groups[indexOfValue],
        mentions: groups[indexOfValue].mentions + value.mentions,
        sentiment: groups[indexOfValue].sentiment + value.sentiment,
        lastPrice: value.price,
        cummulativePrice: `$${cummulativePrice + newPrice}`,
        numberOfValues: groups[indexOfValue].numberOfValues + 1,
      };
    }
    return groups;
  };

// takes a group of stackvalues and calculates all the values needed to display it in the table
export const summarizeStockValueGroup = (stockValueGroup: StockvalueGroup) => {
  const averageSentiment = (100 * stockValueGroup.sentiment) / stockValueGroup.numberOfValues;
  const roundedAverageSentiment = Math.round(averageSentiment) / 100;
  const firstPrice = parseFloat(stockValueGroup.price.split("$")[1]);
  const lastPrice = stockValueGroup.lastPrice
    ? parseFloat(stockValueGroup.lastPrice?.split("$")[1])
    : firstPrice;
  const priceChange = stockValueGroup.lastPrice
    ? `${(lastPrice - firstPrice).toFixed(2)}$`
    : stockValueGroup.priceChange;
  let pricePercentChange;
  if (stockValueGroup.lastPrice) pricePercentChange = (((lastPrice - firstPrice) / firstPrice) * 100)
  // if no lastPrice is given the stock group has a length of 1 and thus the pricePercentChange would always return 0 
  // => return the pricePercentChange of the single value
  else pricePercentChange = parseFloat(stockValueGroup.pricePercentChange.split("%")[0])
  return {
    ...stockValueGroup,
    sentiment: roundedAverageSentiment,
    firstPrice: firstPrice,
    price: lastPrice + "$",
    lastPrice: lastPrice,
    priceChange,
    pricePercentChange: pricePercentChange.toFixed(2) + "%",
  };
};

export const formatDateForXAxis = (date: string) => {
  const dateSplit = date.split(".");
  return dateSplit[0] + "." + dateSplit[1];
}
