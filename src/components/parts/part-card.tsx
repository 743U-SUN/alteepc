import React from 'react';
import Image from 'next/image';
import Button from '../ui/button';
import Card, { CardContent, CardFooter, CardTitle } from '../ui/card';

type PartCardProps = {
  id: string;
  name: string;
  manufacturer: string;
  imageUrl: string;
  specs: { label: string; value: string | number | boolean }[];
  price: number;
  onSelect: (id: string) => void;
};

export default function PartCard({
  id,
  name,
  manufacturer,
  imageUrl,
  specs,
  price,
  onSelect,
}: PartCardProps) {
  return (
    <Card className="transition-shadow hover:shadow-lg">
      <div className="flex flex-col h-full">
        <div className="relative h-48 w-full bg-gray-100 rounded-md mb-4 flex items-center justify-center">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={`${manufacturer} ${name}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain p-2"
            />
          ) : (
            <div className="text-gray-400">画像なし</div>
          )}
        </div>

        <CardTitle>
          <div className="text-sm text-gray-500">{manufacturer}</div>
          <div className="text-lg font-semibold truncate">{name}</div>
        </CardTitle>

        <CardContent className="flex-grow">
          <div className="space-y-2">
            {specs.map((spec, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="text-gray-600">{spec.label}:</span>
                <span className="font-medium">
                  {typeof spec.value === 'boolean'
                    ? spec.value
                      ? 'あり'
                      : 'なし'
                    : spec.value}
                </span>
              </div>
            ))}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between items-center">
          <div className="text-lg font-bold">¥{price.toLocaleString()}</div>
          <Button variant="primary" onClick={() => onSelect(id)}>
            選択
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
