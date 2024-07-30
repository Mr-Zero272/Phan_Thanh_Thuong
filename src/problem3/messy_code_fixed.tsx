import React, { useMemo } from "react";

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}
interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

interface BoxProps {
  children: React.ReactNode;
}

const useWalletBalances = (): WalletBalance[] => {
  return [
    {
      currency: "ABC",
      amount: 123,
      blockchain: "Osmosis",
    },
    {
      currency: "TYU",
      amount: 456,
      blockchain: "Ethereum",
    },
  ];
};

interface Prices {
  [key: string]: number;
}

const usePrices = (): Prices => {
  return {
    ABC: 888,
    TYU: 999,
  };
};

interface WalletRowProps {
  className: string;
  amount: number;
  usdValue: number;
  formattedAmount: string;
}

const WalletRow: React.FC<WalletRowProps> = (props: WalletRowProps) => (
  <div>{props.amount}</div>
);

type WalletPageClasses = {
  row: string;
};

interface Props extends BoxProps {
  classes: WalletPageClasses;
}

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, classes, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = (blockchain: string): number => {
    switch (blockchain) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa":
        return 20;
      case "Neo":
        return 20;
      default:
        return -99;
    }
  };

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        return balancePriority > -99 && balance.amount <= 0;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        return getPriority(rhs.blockchain) - getPriority(lhs.blockchain);
      })
      .map((balance: WalletBalance) => {
        return {
          ...balance,
          formatted: balance.amount.toFixed(),
        };
      });
  }, [balances]);

  const rows = sortedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow
          className={classes.row}
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    }
  );

  return <div {...rest}>{rows}</div>;
};
export default WalletPage;
