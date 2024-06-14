import {
    Combobox,
    ComboboxButton,
    ComboboxInput,
    ComboboxOption,
    ComboboxOptions,
    Transition,
} from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import { useState } from 'react';
import { currencyData } from '../data/currencyData';
import { type CurrencyInfo } from '../types/currencyType';

type SelectCurrencyProps = {
    name: 'send' | 'receive';
    value: CurrencyInfo;
    onChange: (cur: CurrencyInfo, name: 'send' | 'receive') => void;
};

function SelectCurrency({ name, value, onChange }: SelectCurrencyProps) {
    const [query, setQuery] = useState('');

    const filteredCurrency =
        query === ''
            ? currencyData
            : currencyData.filter((person) => {
                  return person.currency.toLowerCase().includes(query.toLowerCase());
              });

    const displayValueFunc = (currencyInfo: CurrencyInfo | null): string => {
        if (currencyInfo !== null) {
            return currencyInfo?.currency;
        }
        return '';
    };
    return (
        <div className="mx-auto w-32">
            <Combobox value={value} onChange={(value: CurrencyInfo) => onChange(value, name)}>
                <div className="relative">
                    <ComboboxInput
                        className={clsx(
                            'w-full rounded-lg border-none py-1.5 pl-3 pr-8 text-sm/6 text-gray-400',
                            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
                        )}
                        displayValue={displayValueFunc}
                        onChange={(event) => setQuery(event.target.value)}
                    />
                    <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
                        <ChevronDownIcon className="fill-dark/60 group-data-[hover]:fill-dark size-4" />
                    </ComboboxButton>
                </div>
                <Transition
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    afterLeave={() => setQuery('')}
                >
                    <ComboboxOptions
                        anchor="bottom"
                        className="z-20 w-[var(--input-width)] rounded-xl border border-white/5 bg-white p-1 [--anchor-gap:var(--spacing-1)] empty:hidden"
                    >
                        {filteredCurrency.map((cur) => (
                            <ComboboxOption
                                key={cur.currency}
                                value={cur}
                                className="group flex cursor-default select-none items-center gap-2 rounded-lg px-3 py-1.5 data-[focus]:bg-white/10"
                            >
                                <CheckIcon className="invisible size-4 group-data-[selected]:visible" />
                                <div className="text-sm/6">{cur.currency}</div>
                            </ComboboxOption>
                        ))}
                    </ComboboxOptions>
                </Transition>
            </Combobox>
        </div>
    );
}

export default SelectCurrency;
