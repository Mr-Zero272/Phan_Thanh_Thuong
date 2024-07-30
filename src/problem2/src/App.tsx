import { ArrowsUpDownIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';
import SelectCurrency from './components/SelectCurrency';
import { currencyData } from './data/currencyData';
import { type ExChangeInfo, CurrencyInfo, CurrencyState } from './types/currencyType';
import images from './assets';
import { clsx } from 'clsx';

function App() {
    const [selectedCurrency, setSelectedCurrency] = useState<CurrencyState>({
        send: currencyData[0],
        receive: currencyData[1],
    });
    const [exchangeInfo, setExchangeInfo] = useState<ExChangeInfo>({ send: '', receive: '' });
    const [loading, setLoading] = useState<boolean>(false);
    const [amountSendValid, setAmountSendValid] = useState<boolean>(true);

    const handleInputAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setExchangeInfo((prev) => {
            if (Object.keys(exchangeInfo).includes(e.target.name)) {
                return { ...prev, [e.target.name]: e.target.value };
            }
            return prev;
        });
    };

    const handleSelectCurrency = (cur: CurrencyInfo, name: 'send' | 'receive') => {
        setSelectedCurrency((prev) => {
            if (exchangeInfo.send !== '') {
                if (name === 'send') {
                    calculateResult(cur, selectedCurrency.receive);
                } else {
                    calculateResult(selectedCurrency.send, cur);
                }
            }
            return { ...prev, [name]: cur };
        });
    };

    const handExchange = () => {
        setSelectedCurrency(() => {
            if (exchangeInfo.send !== '') {
                calculateResult(selectedCurrency.receive, selectedCurrency.send);
            }
            return {
                send: selectedCurrency.receive,
                receive: selectedCurrency.send,
            };
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (exchangeInfo.send === '') {
            setAmountSendValid(false);
            return;
        } else {
            setAmountSendValid(true);
        }
        calculateResult(selectedCurrency.send, selectedCurrency.receive);
    };

    const calculateResult = (sendInfo: CurrencyInfo | null, receiveInfo: CurrencyInfo | null): void => {
        let result: number = 0;

        if (sendInfo === null || receiveInfo === null) {
            result = 0;
            return;
        }

        if (sendInfo.currency === receiveInfo.currency) {
            result = +exchangeInfo.send;
        } else {
            result = (+exchangeInfo.send * sendInfo.price) / receiveInfo.price;
        }

        setLoading(true);
        setTimeout(() => {
            setExchangeInfo((prev) => ({
                ...prev,
                receive: result.toString(),
            }));
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-lg">
                <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">Currency swap</h1>

                <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
                    Now you can start your currency conversions more simply than ever.
                </p>

                <form
                    action="#"
                    className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
                    onSubmit={handleSubmit}
                >
                    <p className="text-center text-lg font-medium">Amount to send</p>

                    <div>
                        <label htmlFor="send" className="sr-only">
                            Amount to send
                        </label>

                        <div className="relative">
                            {!amountSendValid && <p className="text-sm italic text-red-500">This field is required!</p>}
                            <input
                                data-testid="send"
                                id="send"
                                autoFocus={true}
                                type="number"
                                name="send"
                                className={clsx(
                                    'w-full rounded-lg border border-gray-200 p-4 pe-28 text-sm shadow-sm',
                                    {
                                        'border-red-500 outline-red-500': !amountSendValid,
                                    },
                                )}
                                placeholder="Amount to send..."
                                value={exchangeInfo.send}
                                disabled={loading}
                                onChange={handleInputAmountChange}
                            />
                            <span
                                className={clsx('absolute inset-y-0 end-0 grid place-content-center px-4', {
                                    'top-5': !amountSendValid,
                                })}
                            >
                                {/* <span className="text-gray-400">VND</span> */}
                                <SelectCurrency
                                    name="send"
                                    value={selectedCurrency.send}
                                    onChange={handleSelectCurrency}
                                />
                            </span>
                        </div>
                    </div>
                    <div>
                        <span className="flex justify-center">
                            <ArrowsUpDownIcon
                                className="size-6 cursor-pointer text-gray-400 duration-300 ease-in hover:text-gray-600"
                                onClick={handExchange}
                            />
                        </span>
                    </div>

                    <div>
                        <label className="sr-only">Amount to receive</label>

                        <div className="relative">
                            <input
                                type="text"
                                name="receive"
                                className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Amount to receive"
                                value={exchangeInfo.receive}
                                disabled
                            />

                            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                {/* <span className="text-gray-400">USD</span> */}
                                <SelectCurrency
                                    name="receive"
                                    value={selectedCurrency.receive}
                                    onChange={handleSelectCurrency}
                                />
                            </span>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white disabled:bg-indigo-400"
                        disabled={loading}
                    >
                        <div className="flex justify-center">
                            {loading ? (
                                <img className="size-5" src={images.threeDotsLoading} alt="loading" />
                            ) : (
                                <span>Confirm swap</span>
                            )}
                        </div>
                    </button>
                </form>
            </div>
        </div>
    );
}

export default App;
