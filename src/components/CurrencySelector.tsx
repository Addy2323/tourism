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
      className={`h-12 min-w-[112px] px-4 rounded-full border text-sm font-medium shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none bg-right bg-no-repeat pr-9 ${className ?? ''}`}
      style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'16\\' height=\\'16\\' viewBox=\\'0 0 24 24\\'><path fill=\\'%236b7280\\' d=\\'M7 10l5 5 5-5z\\'/></svg>')" }}
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
