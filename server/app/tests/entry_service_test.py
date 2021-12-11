from app.services.entry_service import group_entries_by_stock, find_all_stock_symbols_in_entries

def test_grouping_by_stock():
    first_test_entry = {"_id": "1", "values": [{"symbol": "A"}, {"symbol": "B"}]}
    second_test_entry = {"_id": "2", "values": [{"symbol": "B"}, {"symbol": "C"}]}
    entries = [first_test_entry, second_test_entry]
    grouped_entries = group_entries_by_stock(entries)
    print(grouped_entries)
    # assert 

def test_stock_symbol_finding():
    first_test_entry = {"_id": "1", "values": [{"symbol": "A"}, {"symbol": "B"}]}
    second_test_entry = {"_id": "2", "values": [{"symbol": "B"}, {"symbol": "C"}]}
    entries = [first_test_entry, second_test_entry]
    symbols = find_all_stock_symbols_in_entries(entries)
    assert symbols == {"A", "B", "C"}
