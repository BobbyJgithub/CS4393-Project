
import React from 'react';
import { useSelector } from 'react-redux';
import styles from './SearchInfo.module.css';

function SearchInfo() {
  const { searchTerm, totalResults } = useSelector(state => state.events);
  const { filters, type } = useSelector(state => state.filters);

  if (!searchTerm) return null;

  const getFilterInfo = () => {
    const filterParts = [];
    if (filters.city) filterParts.push(`in ${filters.city}`);
    if (filters.countryCode) filterParts.push(filters.countryCode === 'US' ? 'United States' : 'Canada');
    if (filters.classificationName) filterParts.push(`Category: ${filters.classificationName}`);
    
    return filterParts.length ? ` (${filterParts.join(', ')})` : '';
  };

  return (
    <div className={styles.container}>
      <p className={styles.info}>
        {totalResults === 0 ? (
          `No results found for "${searchTerm}"${getFilterInfo()}`
        ) : (
          `Found ${totalResults} ${type}${totalResults === 1 ? '' : 's'} for "${searchTerm}"${getFilterInfo()}`
        )}
      </p>
    </div>
  );
}

export default SearchInfo;