import React from 'react';
import styles from './TicketHistory.module.css';
import ProfileSection from '../Profile/ProfileSection';

const TicketHistory = ({ tickets }) => (
  <ProfileSection title="Purchased Tickets">
    <div className={styles.ticketList}>
      {tickets.map(ticket => (
        <div key={ticket.id} className={styles.ticketCard}>
          <h3>{ticket.eventName}</h3>
          <div className={styles.ticketDetails}>
            <p><strong>Date:</strong> {new Date(ticket.date).toLocaleDateString()}</p>
            <p><strong>Section:</strong> {ticket.section}</p>
            <p><strong>Type:</strong> {ticket.type}</p>
            <p><strong>Quantity:</strong> {ticket.quantity}</p>
            <p><strong>Price:</strong> ${ticket.price * ticket.quantity}</p>
            <p className={styles.purchaseDate}>
              Purchased on: {new Date(ticket.purchasedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      ))}
      {tickets.length === 0 && (
        <p>No tickets purchased yet</p>
      )}
    </div>
  </ProfileSection>
);

export default TicketHistory;