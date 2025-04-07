import React from 'react';

type SortOption = {
  label: string;
  value: string;
};

type SortControlProps = {
  options: SortOption[];
  selectedValue: string;
  onChange: (value: string) => void;
};

export default function SortControl({
  options,
  selectedValue,
  onChange,
}: SortControlProps) {
  return (
    <div className="flex items-center mb-6">
      <label htmlFor="sort" className="mr-2 font-medium">
        並び替え:
      </label>
      <select
        id="sort"
        value={selectedValue}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
