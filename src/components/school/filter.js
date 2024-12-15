'use client';

import { ChevronDownIcon } from '@/icons/chevronDown';
import { getAllCategories } from '@/lib/actions/category';
import { Autocomplete, AutocompleteItem } from '@nextui-org/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import styles from './filter.module.css';


export default function CategoryFilterComponent() {
  const [categories, setCategories] = useState([]);
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilter = (categoryId) => {
    const params = new URLSearchParams(searchParams);
    if (categoryId) {
      params.set('category', categoryId);
    } else {
      params.delete('category');
    }
    params.set('page', '1');
    router.replace(`${pathName}?${params.toString()}`);
  };
  const getCategories = useCallback(async () => {
    const categories = await getAllCategories({ currentPage: 1, pageSize: -1 });
    setCategories(categories.list);
  }, []);

  useEffect(() => {
    getCategories().then();
  }, [getCategories]);

  return (
    <Autocomplete allowsCustomValue={true} aria-label={'Category'} classNames={{
      base: styles.base,
      clearButton: styles.clearButton,
      endContentWrapper: styles.endContentWrapper,
      listbox: styles.listbox,
      listboxWrapper: styles.listboxWrapper,
      popoverContent: styles.popoverContent,
      selectorButton: styles.selectorButton,
    }} defaultItems={categories} defaultSelectedKey={searchParams.get('categories')} fullWidth={false} label={''}
      labelPlacement={'outside'} name={'categories'} placeholder={'Category'} radius={'sm'}
      selectorIcon={<ChevronDownIcon />} size={'sm'} variant={'bordered'} onClear={handleFilter}
      onSelectionChange={handleFilter}>
      {(category) => <AutocompleteItem key={category._id} value={category._id}>{category.name}</AutocompleteItem>}
    </Autocomplete>
  );
}
