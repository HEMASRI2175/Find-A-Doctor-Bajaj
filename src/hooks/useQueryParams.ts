
import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FilterState, ConsultationType, SortOption } from '@/types/doctor';

const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    consultationType: '',
    specialties: [],
    sort: '',
  });

  // Initialize filters from URL params on mount
  useEffect(() => {
    const search = searchParams.get('search') || '';
    const consultationType = (searchParams.get('moc') || '') as ConsultationType;
    const specialties = searchParams.get('specialties') 
      ? searchParams.get('specialties')!.split(',')
      : [];
    const sort = (searchParams.get('sort') || '') as SortOption;

    setFilters({
      search,
      consultationType,
      specialties,
      sort,
    });
  }, [searchParams]);

  // Update the URL when filters change
  const updateFilters = useCallback((newFilters: Partial<FilterState>) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters, ...newFilters };
      
      // Update URL params
      const params: Record<string, string> = {};
      
      if (updatedFilters.search) params.search = updatedFilters.search;
      if (updatedFilters.consultationType) params.moc = updatedFilters.consultationType;
      if (updatedFilters.specialties.length > 0) params.specialties = updatedFilters.specialties.join(',');
      if (updatedFilters.sort) params.sort = updatedFilters.sort;
      
      setSearchParams(params);
      return updatedFilters;
    });
  }, [setSearchParams]);

  return {
    filters,
    updateFilters,
  };
};

export default useQueryParams;
