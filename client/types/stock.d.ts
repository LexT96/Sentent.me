interface Stock {
    _id: string;
    companyName: string;
    industry: string;
    website: string;
    description: string;
    sector: string;
    image: string;
    historical?: HistoricalEntry[];
}