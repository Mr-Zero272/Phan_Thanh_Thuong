## Here is my opinion to fix the code in the problem 3

-   Add missing field blockchain for interface WalletBalance.
-   FormattedWalletBalance interfaces can inherit from WalletBalance interface which is more clear.
-   Optimize useMemo:
    -   Delete dependency prices because prices are not used within the memoized function.
    -   Correct the filter logic, the lhsPriority is undefined and should be balancePriority.
    -   Optimize the complex logic code in filter and sort.
    -   Combine the block code add the formatted to the useMemo to avoid unnecessary re-computation and multiple passes over the data.
-   Besides, I also added functions and interfaces so that the entire code would not be warned.
