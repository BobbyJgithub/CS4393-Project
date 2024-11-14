
import React from 'react';
import styles from './TicketSelector.module.css';

const TypeSelect = ({ selectedSectionData, selectedType, setSelectedType }) => (
  <div className={styles.typeSelect}>
    <label>Ticket Type:</label>
    <select
      value={selectedType}
      onChange={(e) => setSelectedType(e.target.value)}
    >
      <option value="">Select ticket type</option>
      {selectedSectionData?.types.map(type => (
        <option key={type.typeId} value={type.typeId}>
          {type.name} - ${type.price} ({type.available} available)
        </option>
      ))}
    </select>
  </div>
);

export default TypeSelect;