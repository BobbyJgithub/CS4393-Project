
import React from 'react';
import styles from './TicketSelector.module.css';

const SectionSelect = ({ ticketData, selectedSection, setSelectedSection }) => (
  <div className={styles.sectionSelect}>
    <label>Section:</label>
    <select
      value={selectedSection}
      onChange={(e) => setSelectedSection(e.target.value)}
    >
      <option value="">Select a section</option>
      {ticketData.map(section => (
        <option key={section.sectionId} value={section.sectionId}>
          {section.sectionName} ({section.availableTickets} available)
        </option>
      ))}
    </select>
  </div>
);

export default SectionSelect;