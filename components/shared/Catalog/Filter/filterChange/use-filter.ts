import qs from 'qs';
import { useEffect, useState } from 'react';
import { priceProps } from './type-filter';
import { useSearchParams } from 'next/navigation';

export const useFilterParams = () => {
  const searchParams = useSearchParams();
  const [price, setPrice] = useState<priceProps>({
    priceForm: Number(searchParams.get('priceForm')) || 90,
    priceTo: Number(searchParams.get('priceTo')) || 429990,
  });

  const [filters, setFilters] = useState({
    Capacity: [],
    Diagonal: [],
    Memory: [],
    Power: [],
    Brand: [],
    Voltage: [],
    Color: [],
    Connector: [],
    ...price,
  });

  const filterUrl = qs.stringify(filters, { arrayFormat: 'comma' });

  const updateFilters = (obj: Set<number>, name: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: Array.from(obj),
    }));
  };

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      ...price,
    }));
  }, [price]);

  useEffect(() => {
    if (!searchParams.get('priceForm') && !searchParams.get('priceTo')) {
      setPrice({ priceForm: undefined, priceTo: undefined });
    }
  }, [searchParams]);

  return { filterUrl, updateFilters, setPrice, price };
};
