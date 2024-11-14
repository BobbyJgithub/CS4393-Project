import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';
import { generateMockTickets } from '../../assets/mockData/mockTicketData';
import styles from './TicketSelector.module.css';
import { isVerifiedFan } from '../../utils/auth';
import SectionSelect from './SectionSelect';
import TypeSelect from './TypeSelect';
import QuantitySelect from './QuantitySelect';
import Perks from './Perks';
import Total from './Total';

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
        <SectionSelect 
          ticketData={ticketData} 
          selectedSection={selectedSection} 
          setSelectedSection={setSelectedSection} 
        />

        {selectedSection && (
          <TypeSelect 
            selectedSectionData={selectedSectionData} 
            selectedType={selectedType} 
            setSelectedType={setSelectedType} 
          />
        )}

        {selectedType && (
          <>
            <QuantitySelect 
              selectedTypeData={selectedTypeData} 
              quantity={quantity} 
              setQuantity={setQuantity} 
            />

            <Perks perks={selectedTypeData.perks} />

            <Total 
              price={selectedTypeData.price} 
              quantity={quantity} 
              handleAddToCart={handleAddToCart} 
            />
          </>
        )}
      </div>
    </div>
  );
}

export default TicketSelector;