import React from 'react';
import { useCurrency } from '../contexts/CurrencyContext';

interface PriceProps {
  amountUSD: number; // base amount in USD
  className?: string;
  prefix?: string; // e.g., 'From '
  suffix?: string; // e.g., ' total'
  unit?: string;   // e.g., '/day'
  options?: Intl.NumberFormatOptions;
}

const Price: React.FC<PriceProps> = ({ amountUSD, className, prefix, suffix, unit, options }) => {
  const { format } = useCurrency();
  const money = format(amountUSD, undefined, options);

  return (
    <span className={className}>
      {prefix}{money}{unit ? unit : ''}{suffix}
    </span>
  );
};

export default Price;
