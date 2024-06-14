export type CurrencyInfo = {
    currency: string;
    date: string;
    price: number;
};

export type CurrencyState = {
    send: CurrencyInfo;
    receive: CurrencyInfo;
};

export type ExChangeInfo = {
    send: string;
    receive: string;
};
