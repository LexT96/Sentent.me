from datetime import datetime
from app.services.stock_api_service import fetch_stock_information
from app.services.db_service import get_entries, get_all_stocks, insert_stock, insert_entry
from app.services.reddit_service import get_posts, group_posts_by_stock
from app.services.sentiment_service import add_sentiment_to_posts, calculate_average_sentiment

# iterates through all entries and groups them by stocksymbols
def group_entries_by_stock(entries):
    entries_by_stock = []
    symbols = find_all_stock_symbols_in_entries(entries)
    for symbol in symbols:
        for entry in entries:
            for value in entry["values"]:
                if value["symbol"] == symbol:
                    value_with_date = value.copy()
                    value_with_date["date"] = entry["_id"]
                    entries_by_stock.append(value_with_date)
    return entries_by_stock


# find all unique stock symbols
def find_all_stock_symbols_in_entries(entries):
    symbols = set()
    for entry in entries:
        for value in entry["values"]:
            symbols.add(value["symbol"])
    return symbols

# TODO
# finds the relevant stock inside of the values of a single entry
def _find_stock_by_symbol(entry, symbol):
    for stock_value in entry.values:
        if stock_value.symbol == entry.stock:
            return stock_value
    return None

#   const groupStockValuesByStock = (stockValues: Stockvalue[]) => {
#     let groups: StockvalueGroup[] = [];
#     for (let i = 0; i < stockValues.length; i++) {
#       const value = stockValues[i];
#       const groupSymbols = groups.map((group: Stockvalue) => group.symbol);
#       const indexOfValue = groupSymbols.indexOf(value.symbol);
#       if (indexOfValue === -1) {
#         groups.push({ ...value, numberOfValues: 1, cummulativePrice: value.price });
#       } else {
#         const cummulativePrice = parseFloat(groups[indexOfValue].price.split("$")[1]);
#         const newPrice = parseFloat(value.price.split("$")[1]);
#         groups[indexOfValue] = {
#           ...groups[indexOfValue],
#           mentions: groups[indexOfValue].mentions + value.mentions,
#           sentiment: groups[indexOfValue].sentiment + value.sentiment,
#           lastPrice: value.price,
#           cummulativePrice: `$${cummulativePrice + newPrice}`,
#           numberOfValues: groups[indexOfValue].numberOfValues + 1,
#         };
#       }
#     }
#     return groups;
#   };

#   // TODO: Remove
#   const summarizeStockValueGroup = (stockValueGroup: StockvalueGroup) => {
#     const averageSentiment =
#       Math.round(
#         (100 * stockValueGroup.sentiment) / stockValueGroup.numberOfValues
#       ) / 100;
#     const firstPrice = parseFloat(stockValueGroup.price.split("$")[1]);
#     const lastPrice = stockValueGroup.lastPrice
#       ? parseFloat(stockValueGroup.lastPrice?.split("$")[1])
#       : firstPrice;
#     const priceChange = stockValueGroup.lastPrice
#       ? `${(lastPrice - firstPrice).toFixed(2)}$`
#       : stockValueGroup.priceChange;
#     const pricePercentChange = stockValueGroup.lastPrice
#       ? (((lastPrice - firstPrice) / firstPrice) * 100).toFixed(2) + "%"
#       : parseFloat(stockValueGroup.pricePercentChange.split("%")[0]).toFixed(
#           2
#         ) + "%";
#     return {
#       ...stockValueGroup,
#       sentiment: averageSentiment,
#       firstPrice: firstPrice,
#       price: lastPrice + "$",
#       lastPrice: lastPrice,
#       priceChange,
#       pricePercentChange,
#     };
#   };


# creates a new stock entry and adds it to the database
def create_entry(stock_data):
    posts = get_posts()
    stocks = get_all_stocks()
    posts = add_sentiment_to_posts(posts)
    grouped_posts = group_posts_by_stock(posts)
    sorted(grouped_posts, key=len, reverse=True)
    entry_values = []
    # iterates through all grouped stocks, gets the other needed attributes
    # and saves them as an new entry in the entry collection
    for group in grouped_posts:
        symbol = group[0].stock
        mentions = len(group)
        sentiment = calculate_average_sentiment(group)
        for stock in stock_data:
            # as soon as the stock is found in the data from the stock api
            # add the average sentiment and the number of mentions to it
            if stock["symbol"] == symbol:
                entry_values.append({**stock, "sentiment": sentiment, "mentions": mentions})
                # if the stock does not already exist in the stock collection fetch
                # the stock_information and create a new document in the collection
                if not any(db_stock["_id"] == stock["symbol"] for db_stock in stocks):
                    stock_information = fetch_stock_information(stock["symbol"])
                    if stock_information:
                        insert_stock(stock_information)
                break
    today = datetime.today().strftime('%d.%m.%Y')
    entry = {"_id": today, "values": entry_values}
    insert_entry(entry)
    return entry

