import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setType, setFilters, clearFilters } from "../../redux/filterSlice";
import styles from "./FilterBar.module.css";

function FilterBar() {
  const dispatch = useDispatch();
  const { type, filters } = useSelector((state) => state.filters);

  const handleTypeChange = (newType) => {
    dispatch(setType(newType));
    dispatch(clearFilters());
  };

  const handleFilterChange = (key, value) => {
    dispatch(setFilters({ [key]: value }));
  };

  const renderEventFilters = () => (
    <div className={styles.filters}>
      <select
        className={styles.filterSelect}
        value={filters.sort || ""}
        onChange={(e) => handleFilterChange("sort", e.target.value)}
      >
        <option value="">Sort By</option>
        <option value="date,asc">Date (Ascending)</option>
        <option value="date,desc">Date (Descending)</option>
        <option value="name,asc">Name (A-Z)</option>
        <option value="name,desc">Name (Z-A)</option>
      </select>

      <select
        className={styles.filterSelect}
        value={filters.countryCode || ""}
        onChange={(e) => handleFilterChange("countryCode", e.target.value)}
      >
        <option value="">Country</option>
        <option value="US">United States</option>
        <option value="CA">Canada</option>
      </select>

      <input
        className={styles.filterInput}
        type="text"
        placeholder="City"
        value={filters.city || ""}
        onChange={(e) => handleFilterChange("city", e.target.value)}
      />

      <select
        className={styles.filterSelect}
        value={filters.classificationName || ""}
        onChange={(e) =>
          handleFilterChange("classificationName", e.target.value)
        }
      >
        <option value="">Category</option>
        <option value="Music">Music</option>
        <option value="Sports">Sports</option>
        <option value="Arts">Arts & Theatre</option>
        <option value="Family">Family</option>
      </select>
    </div>
  );

  const renderAttractionFilters = () => (
    <div className={styles.filters}>
      <select
        className={styles.filterSelect}
        value={filters.sort || ""}
        onChange={(e) => handleFilterChange("sort", e.target.value)}
      >
        <option value="">Sort By</option>
        <option value="name,asc">Name (A-Z)</option>
        <option value="name,desc">Name (Z-A)</option>
      </select>

      <select
        className={styles.filterSelect}
        value={filters.classificationName || ""}
        onChange={(e) =>
          handleFilterChange("classificationName", e.target.value)
        }
      >
        <option value="">Category</option>
        <option value="Music">Music</option>
        <option value="Sports">Sports</option>
        <option value="Arts">Arts & Theatre</option>
        <option value="Family">Family</option>
      </select>
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.typeSelector}>
        <button
          className={`${styles.typeButton} ${
            type === "" ? styles.active : ""
          }`}
          onClick={() => handleTypeChange("")}
        >
          All
        </button>
        <button
          className={`${styles.typeButton} ${
            type === "event" ? styles.active : ""
          }`}
          onClick={() => handleTypeChange("event")}
        >
          Events
        </button>
        <button
          className={`${styles.typeButton} ${
            type === "attraction" ? styles.active : ""
          }`}
          onClick={() => handleTypeChange("attraction")}
        >
          Attractions
        </button>
      </div>
      {type === "event" ? renderEventFilters() : type === "attraction" ? renderAttractionFilters() : null}
    </div>
  );
}

export default FilterBar;