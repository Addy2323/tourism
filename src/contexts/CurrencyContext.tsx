import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'TZS';

type Rates = Record<CurrencyCode, number>;

interface CurrencyContextValue {
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  rates: Rates;
  base: CurrencyCode; // base currency for amounts in code, default USD
  convert: (amountInBase: number, to?: CurrencyCode) => number;
  format: (amountInBase: number, to?: CurrencyCode, options?: Intl.NumberFormatOptions) => string;
}

const DEFAULT_BASE: CurrencyCode = 'USD';
const STORAGE_KEY = 'selected_currency';

// Fixed sample rates relative to USD. In real scenario, consider fetching from an API.
const DEFAULT_RATES: Rates = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.78,
  TZS: 2625, // Tanzanian Shilling approx
};

const CurrencyContext = createContext<CurrencyContextValue | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<CurrencyCode>(() => {
    const saved = typeof window !== 'undefined' ? (localStorage.getItem(STORAGE_KEY) as CurrencyCode | null) : null;
    return saved ?? 'USD';
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, currency);
    } catch {}
  }, [currency]);

  const rates = DEFAULT_RATES;
  const base = DEFAULT_BASE;

  const convert = useMemo(() => {
    return (amountInBase: number, to: CurrencyCode = currency) => {
      const rate = rates[to] ?? 1;
      return amountInBase * rate;
    };
  }, [currency]);

  const format = useMemo(() => {
    const currencyMap: Record<CurrencyCode, string> = {
      USD: 'USD',
      EUR: 'EUR',
      GBP: 'GBP',
      TZS: 'TZS',
    };
    return (amountInBase: number, to: CurrencyCode = currency, options?: Intl.NumberFormatOptions) => {
      const value = convert(amountInBase, to);
      const nf = new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: currencyMap[to],
        maximumFractionDigits: to === 'TZS' ? 0 : 2,
        minimumFractionDigits: 0,
        ...options,
      });
      return nf.format(value);
    };
  }, [currency, convert]);

  const value: CurrencyContextValue = {
    currency,
    setCurrency,
    rates,
    base,
    convert,
    format,
  };

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
};

export const useCurrency = () => {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error('useCurrency must be used within a CurrencyProvider');
  return ctx;
};
