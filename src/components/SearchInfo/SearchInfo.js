import React from 'react';
import { useSelector } from 'react-redux';
import styles from './SearchInfo.module.css';

const getFilterInfo = (filters) => {
  const filterParts = [];
  if (filters.city) filterParts.push(`in ${filters.city}`);
  if (filters.countryCode) filterParts.push(filters.countryCode === 'US' ? 'United States' : 'Canada');
  if (filters.classificationName) filterParts.push(`Category: ${filters.classificationName}`);
  return filterParts.join(', ');
};

const SearchInfo = () => {
  const { searchTerm, totalResults } = useSelector(state => state.events);
  const { filters, type } = useSelector(state => state.filters);

  const hasFilters = Object.values(filters).some(value => value !== '');
  if (!searchTerm && !hasFilters) return null;

  const filterInfo = getFilterInfo(filters);

  const renderMessage = () => {
    if (totalResults === 0) {
      return searchTerm 
        ? `No results found for "${searchTerm}"${filterInfo ? ` (${filterInfo})` : ''}`
        : `No results found ${filterInfo ? `for ${filterInfo}` : ''}`;
    } else {
      return searchTerm 
        ? `Found ${totalResults} ${type || 'result'}${totalResults === 1 ? '' : 's'} for "${searchTerm}"${filterInfo ? ` (${filterInfo})` : ''}`
        : `Found ${totalResults} ${type || 'result'}${totalResults === 1 ? '' : 's'} ${filterInfo ? `for ${filterInfo}` : ''}`;
    }
  };

  return (
    <div className={styles.container}>
      <p className={styles.info}>
        {renderMessage()}
      </p>
    </div>
  );
};

export default SearchInfo;