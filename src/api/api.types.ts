export type AssetType = 'stock' | 'fiat' | 'crypto'

export type StockOptions = 'APPL' | 'TSLA'

export type FiatOptions = 'USD'

export type CryptoOptions = 'BTC' | 'ETH'

export type AssetOptions = StockOptions | FiatOptions | CryptoOptions;

export type Assets = {
    id: string;
    name: AssetOptions;
    type: AssetType;
}

export type Price = {
    id: string;
    asset: AssetOptions;
    price: number
}

export type Positions = {
    id: number;
    asset: AssetOptions;
    quantity: number;
    price: number;
}

export type Portfolio = {
    id: string;
    asOf: string;
    positions: Positions[]
}