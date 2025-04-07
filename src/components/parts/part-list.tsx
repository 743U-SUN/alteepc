import React from 'react';
import PartCard from './part-card';

type PartListProps = {
  parts: any[];
  onSelectPart: (id: string) => void;
  getSpecs: (part: any) => { label: string; value: string | number | boolean }[];
};

export default function PartList({ parts, onSelectPart, getSpecs }: PartListProps) {
  if (parts.length === 0) {
    return (
      <div className="py-8 text-center text-gray-500">
        該当するパーツが見つかりませんでした。
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {parts.map((part) => (
        <PartCard
          key={part.id}
          id={part.id}
          name={part.model}
          manufacturer={part.manufacturer}
          imageUrl={part.imageUrl}
          specs={getSpecs(part)}
          price={part.price}
          onSelect={onSelectPart}
        />
      ))}
    </div>
  );
}
