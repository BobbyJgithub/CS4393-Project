import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import { generateMockTickets } from '../../data/mockTicketData';
import styles from './TicketSelector.module.css';
import { isVerifiedFan } from '../../utils/auth';

function TicketSelector({ event }) {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const [ticketData, setTicketData] = useState([]);
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const userIsVerifiedFan = user && event._embedded?.attractions?.[0]?.id
      ? isVerifiedFan(user.id, event._embedded.attractions[0].id)
      : false;
    
    setTicketData(generateMockTickets(event.id, userIsVerifiedFan));
  }, [event.id, user]);

  const selectedSectionData = ticketData.find(section => section.sectionId === selectedSection);
  const selectedTypeData = selectedSectionData?.types.find(type => type.typeId === selectedType);

  const handleAddToCart = () => {
    if (!selectedTypeData) return;

    const ticket = {
      id: `${event.id}-${selectedType}-${Date.now()}`,
      eventId: event.id,
      eventName: event.name,
      section: selectedSectionData.sectionName,
      type: selectedTypeData.name,
      quantity: quantity,
      price: selectedTypeData.price,
      date: event.dates?.start?.dateTime,
      perks: selectedTypeData.perks
    };
    dispatch(addToCart(ticket));
  };

  return (
    <div className={styles.ticketSelector}>
      <h3>Select Tickets</h3>
      
      <div className={styles.selectorGrid}>
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

        {selectedSection && (
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
        )}

        {selectedType && (
          <>
            <div className={styles.quantitySelect}>
              <label>Quantity:</label>
              <select
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              >
                {[...Array(Math.min(8, selectedTypeData.available))].map((_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
            </div>

            <div className={styles.perks}>
              <h4>Included Perks:</h4>
              <ul>
                {selectedTypeData.perks.map((perk, index) => (
                  <li key={index}>{perk}</li>
                ))}
              </ul>
            </div>

            <div className={styles.total}>
              <p>Total: ${selectedTypeData.price * quantity}</p>
              <button onClick={handleAddToCart}>Add to Cart</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default TicketSelector;