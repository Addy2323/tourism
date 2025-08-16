import React from 'react';
import { useCurrency, CurrencyCode } from '../contexts/CurrencyContext';

const options: { code: CurrencyCode; label: string }[] = [
  { code: 'USD', label: 'USD $' },
  { code: 'EUR', label: 'EUR €' },
  { code: 'GBP', label: 'GBP £' },
  { code: 'TZS', label: 'TZS TSh' },
];

const CurrencySelector: React.FC<{ className?: string }> = ({ className }) => {
  const { currency, setCurrency } = useCurrency();

  return (
    <select
      aria-label="Select currency"
      className={`px-3 py-2 rounded-full border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 ${className ?? ''}`}
      value={currency}
      onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
    >
      {options.map((opt) => (
        <option key={opt.code} value={opt.code}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};

export default CurrencySelector;
