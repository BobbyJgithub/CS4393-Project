import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setType, setFilters, clearFilters } from "../../redux/slices/filterSlice";
import styles from "./FilterBar.module.css";

const FilterSelect = ({ value, onChange, options, placeholder }) => (
  <select className={styles.filterSelect} value={value} onChange={onChange}>
    <option value="">{placeholder}</option>
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

const FilterInput = ({ value, onChange, placeholder }) => (
  <input
    className={styles.filterInput}
    type="text"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  />
);

const FilterBar = () => {
  const dispatch = useDispatch();
  const { type, filters } = useSelector((state) => state.filters);

  const handleTypeChange = (newType) => {
    dispatch(setType(newType));
    dispatch(clearFilters());
  };

  const handleFilterChange = (key, value) => {
    dispatch(setFilters({ [key]: value }));
  };

  const eventFilterOptions = [
    { value: "date,asc", label: "Date (Ascending)" },
    { value: "date,desc", label: "Date (Descending)" },
    { value: "name,asc", label: "Name (A-Z)" },
    { value: "name,desc", label: "Name (Z-A)" },
  ];

  const countryOptions = [
    { value: "US", label: "United States" },
    { value: "CA", label: "Canada" },
  ];

  const categoryOptions = [
    { value: "Music", label: "Music" },
    { value: "Sports", label: "Sports" },
    { value: "Arts", label: "Arts & Theatre" },
    { value: "Family", label: "Family" },
  ];

  const renderEventFilters = () => (
    <div className={styles.filters}>
      <FilterSelect
        value={filters.sort || ""}
        onChange={(e) => handleFilterChange("sort", e.target.value)}
        options={eventFilterOptions}
        placeholder="Sort By"
      />
      <FilterSelect
        value={filters.countryCode || ""}
        onChange={(e) => handleFilterChange("countryCode", e.target.value)}
        options={countryOptions}
        placeholder="Country"
      />
      <FilterInput
        value={filters.city || ""}
        onChange={(e) => handleFilterChange("city", e.target.value)}
        placeholder="City"
      />
      <FilterSelect
        value={filters.classificationName || ""}
        onChange={(e) => handleFilterChange("classificationName", e.target.value)}
        options={categoryOptions}
        placeholder="Category"
      />
    </div>
  );

  const renderAttractionFilters = () => (
    <div className={styles.filters}>
      <FilterSelect
        value={filters.sort || ""}
        onChange={(e) => handleFilterChange("sort", e.target.value)}
        options={eventFilterOptions.slice(2)}
        placeholder="Sort By"
      />
      <FilterSelect
        value={filters.classificationName || ""}
        onChange={(e) => handleFilterChange("classificationName", e.target.value)}
        options={categoryOptions}
        placeholder="Category"
      />
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.typeSelector}>
        <button
          className={`${styles.typeButton} ${type === "" ? styles.active : ""}`}
          onClick={() => handleTypeChange("")}
        >
          All
        </button>
        <button
          className={`${styles.typeButton} ${type === "event" ? styles.active : ""}`}
          onClick={() => handleTypeChange("event")}
        >
          Events
        </button>
        <button
          className={`${styles.typeButton} ${type === "attraction" ? styles.active : ""}`}
          onClick={() => handleTypeChange("attraction")}
        >
          Attractions
        </button>
      </div>
      {type === "event" ? renderEventFilters() : type === "attraction" ? renderAttractionFilters() : null}
    </div>
  );
};

export default FilterBar;