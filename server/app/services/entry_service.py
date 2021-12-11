

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


# finds the relevant stock inside of the values of a single entry
def _find_stock_by_symbol(entry, symbol):
    for stock_value in entry.values:
        if stock_value.symbol == entry.stock:
            return stock_value
    return None