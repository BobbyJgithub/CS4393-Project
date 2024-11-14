
import React from 'react';
import styles from '../../pages/AttractionDetails/AttractionDetails.module.css';

const Modal = ({ attraction, fanRequest, setFanRequest, handleSubmitFanRequest, setIsModalOpen }) => (
  <div className={styles.modalOverlay}>
    <div className={styles.modal}>
      <h2>Become a Verified Fan</h2>
      <p>Tell us why you want to become a verified fan of {attraction.name}</p>
      <form onSubmit={handleSubmitFanRequest}>
        <textarea
          value={fanRequest}
          onChange={(e) => setFanRequest(e.target.value)}
          placeholder="Write your request here..."
          rows={5}
          required
        />
        <div className={styles.modalButtons}>
          <button type="button" onClick={() => setIsModalOpen(false)}>Cancel</button>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  </div>
);

export default Modal;