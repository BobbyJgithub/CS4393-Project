import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import styles from './TicketSelector.module.css';

function TicketSelector({ event }) {
  const dispatch = useDispatch();
  const [selectedTickets, setSelectedTickets] = useState({
    quantity: 1,
    type: 'standard'
  });

  const ticketTypes = {
    standard: { name: 'Standard', price: event.priceRanges?.[0]?.min || 50 },
    vip: { name: 'VIP', price: event.priceRanges?.[0]?.max || 150 }
  };

  const handleAddToCart = () => {
    const ticket = {
      id: `${event.id}-${selectedTickets.type}-${Date.now()}`,
      eventId: event.id,
      eventName: event.name,
      type: selectedTickets.type,
      quantity: selectedTickets.quantity,
      price: ticketTypes[selectedTickets.type].price,
      date: event.dates?.start?.dateTime,
    };
    dispatch(addToCart(ticket));
  };

  return (
    <div className={styles.ticketSelector}>
      <h3>Select Tickets</h3>
      <div className={styles.selection}>
        <select
          value={selectedTickets.type}
          onChange={(e) => setSelectedTickets({...selectedTickets, type: e.target.value})}
        >
          {Object.entries(ticketTypes).map(([key, value]) => (
            <option key={key} value={key}>
              {value.name} - ${value.price}
            </option>
          ))}
        </select>
        <select
          value={selectedTickets.quantity}
          onChange={(e) => setSelectedTickets({...selectedTickets, quantity: Number(e.target.value)})}
        >
          {[1,2,3,4,5,6,7,8].map(num => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
}

export default TicketSelector;