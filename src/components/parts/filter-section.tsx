import React from 'react';
import Button from '../ui/button';

type FilterOption = {
  label: string;
  value: string;
};

type FilterSectionProps = {
  title: string;
  options: FilterOption[];
  selectedValue: string;
  onChange: (value: string) => void;
};

export default function FilterSection({
  title,
  options,
  selectedValue,
  onChange,
}: FilterSectionProps) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedValue === '' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => onChange('')}
        >
          すべて
        </Button>
        {options.map((option) => (
          <Button
            key={option.value}
            variant={selectedValue === option.value ? 'primary' : 'outline'}
            size="sm"
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
