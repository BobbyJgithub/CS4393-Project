import React, { useState } from 'react';
import styles from './TicketHistory.module.css';
import ProfileSection from '../Profile/ProfileSection';

const TicketHistory = ({ tickets }) => {
  const [showAll, setShowAll] = useState(false);
  // Filter out any non-ticket items that might have gotten in
  const ticketItems = tickets.filter(item => item.type !== 'merchandise');
  const visibleTickets = showAll ? ticketItems : ticketItems.slice(0, 2);

  return (
    <ProfileSection title="Purchased Tickets">
      <div className={styles.ticketList}>
        {visibleTickets.map(ticket => (
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
        {tickets.length > 2 && (
          <button 
            className={styles.seeMoreButton}
            onClick={() => setShowAll(!showAll)}
          >
            {showAll 
              ? 'See Less'
              : `See More Tickets (${tickets.length - 2} more)`
            }
          </button>
        )}
      </div>
    </ProfileSection>
  );
};

export default TicketHistory;