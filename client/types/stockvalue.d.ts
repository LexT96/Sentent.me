interface Stockvalue {
    symbol: string;
    name: string;
    priceChange: string;
    sentiment: number;
    sentimentChange?: number;
    pricePercentChange: number;
    mentions: number;
    price: string;
}