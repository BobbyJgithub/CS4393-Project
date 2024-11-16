import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../../redux/slices/cartSlice';
import { generateMockTickets } from '../../assets/mockData/mockTicketData';
import styles from './TicketSelector.module.css';
import { isVerifiedFan } from '../../utils/auth';
import QuantitySelect from './QuantitySelect';
import Total from './Total';
import AuthModal from '../AuthModal/AuthModal';

function TicketSelector({ event }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const [ticketData, setTicketData] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [filters, setFilters] = useState({
    section: 'all',
    type: 'all',
    priceRange: {
      min: 0,
      max: Infinity
    }
  });
  const [sortOrder, setSortOrder] = useState('none'); // Add this state
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const userIsVerifiedFan = user && event._embedded?.attractions?.[0]?.id
      ? isVerifiedFan(user.id, event._embedded.attractions[0].id)
      : false;
    
    setTicketData(generateMockTickets(event.id, userIsVerifiedFan));
  }, [event.id, user]);

  const uniqueSections = useMemo(() => {
    return ['all', ...new Set(ticketData.map(section => section.sectionName))];
  }, [ticketData]);

  const uniqueTypes = useMemo(() => {
    const types = new Set();
    ticketData.forEach(section => {
      section.types.forEach(type => types.add(type.name));
    });
    return ['all', ...Array.from(types)];
  }, [ticketData]);

  const priceRange = useMemo(() => {
    let min = Infinity;
    let max = 0;
    ticketData.forEach(section => {
      section.types.forEach(type => {
        min = Math.min(min, type.price);
        max = Math.max(max, type.price);
      });
    });
    return { min, max };
  }, [ticketData]);

  const sortedAndFilteredTicketData = useMemo(() => {
    // First, filter the tickets
    const filtered = ticketData.map(section => ({
      ...section,
      types: section.types.filter(type => {
        const matchesSection = filters.section === 'all' || section.sectionName === filters.section;
        const matchesType = filters.type === 'all' || type.name === filters.type;
        const matchesPrice = type.price >= filters.priceRange.min && type.price <= filters.priceRange.max;
        return matchesSection && matchesType && matchesPrice;
      })
    })).filter(section => section.types.length > 0);

    // Sort the tickets within sections and calculate min price for each section
    const sectionsWithMinPrice = filtered.map(section => ({
      ...section,
      types: [...section.types].sort((a, b) => 
        sortOrder === 'price-desc' ? b.price - a.price : a.price - b.price
      ),
      minPrice: Math.min(...section.types.map(type => type.price))
    }));

    // Sort the sections themselves if price sorting is active
    if (sortOrder === 'price-asc' || sortOrder === 'price-desc') {
      return sectionsWithMinPrice.sort((a, b) => 
        sortOrder === 'price-desc' ? b.minPrice - a.minPrice : a.minPrice - b.minPrice
      );
    }
    
    return sectionsWithMinPrice;
  }, [ticketData, filters, sortOrder]);

  const handleTicketSelect = (section, type) => {
    setSelectedTicket({ section, type });
  };

  const handleAddToCart = () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    if (!selectedTicket) return;

    const ticket = {
      id: `${event.id}-${selectedTicket.type.typeId}-${Date.now()}`,
      eventId: event.id,
      eventName: event.name,
      section: selectedTicket.section.sectionName,
      type: selectedTicket.type.name,
      quantity: quantity,
      price: selectedTicket.type.price,
      date: event.dates?.start?.dateTime,
      perks: selectedTicket.type.perks
    };
    dispatch(addToCart(ticket));
  };

  return (
    <div className={styles.ticketSelector}>
      <div className={styles.filterToggle}>
        <button 
          className={styles.filterButton} 
          onClick={() => setShowFilters(!showFilters)}
        >
          <span>Filters & Sort</span>
          <span className={`${styles.arrow} ${showFilters ? styles.expanded : ''}`}>▼</span>
        </button>
        <div className={`${styles.filtersDropdown} ${showFilters ? styles.show : ''}`}>
          <div className={styles.filters}>
            <div className={styles.filterGroup}>
              <label>Section:</label>
              <select 
                value={filters.section}
                onChange={(e) => setFilters(prev => ({ ...prev, section: e.target.value }))}
              >
                {uniqueSections.map(section => (
                  <option key={section} value={section}>
                    {section === 'all' ? 'All Sections' : section}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label>Type:</label>
              <select 
                value={filters.type}
                onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
              >
                {uniqueTypes.map(type => (
                  <option key={type} value={type}>
                    {type === 'all' ? 'All Types' : type}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label>Price Range:</label>
              <div className={styles.priceInputs}>
                <input
                  type="number"
                  value={filters.priceRange.min === 0 ? '' : filters.priceRange.min}
                  placeholder={`Min: $${priceRange.min}`}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    priceRange: { ...prev.priceRange, min: Number(e.target.value) || 0 }
                  }))}
                />
                <input
                  type="number"
                  value={filters.priceRange.max === Infinity ? '' : filters.priceRange.max}
                  placeholder={`Max: $${priceRange.max}`}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    priceRange: { ...prev.priceRange, max: Number(e.target.value) || Infinity }
                  }))}
                />
              </div>
            </div>

            <div className={styles.filterGroup}>
              <label>Sort by:</label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="none">No sorting</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.ticketGrid}>
        {sortedAndFilteredTicketData.length > 0 ? (
          sortedAndFilteredTicketData.map(section => (
            <div key={section.sectionId} className={styles.sectionGroup}>
              <h4>{section.sectionName}</h4>
              <div className={styles.typeGrid}>
                {section.types.map(type => (
                  <div
                    key={type.typeId}
                    className={`${styles.ticketOption} ${
                      selectedTicket?.type.typeId === type.typeId ? styles.selected : ''
                    }`}
                    onClick={() => handleTicketSelect(section, type)}
                  >
                    <div className={styles.ticketInfo}>
                      <span className={styles.typeName}>{type.name}</span>
                      <span className={styles.price}>${type.price}</span>
                    </div>
                    {type.perks.length > 0 && (
                      <div className={styles.perks}>
                        {type.perks.map(perk => (
                          <span key={perk} className={styles.perk}>{perk}</span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className={styles.noResults}>No tickets match your filters</p>
        )}
      </div>

      {selectedTicket && (
        <div className={styles.selectedTicketActions}>
          <QuantitySelect 
            selectedTypeData={selectedTicket.type}
            quantity={quantity}
            setQuantity={setQuantity}
          />

          <Total 
            price={selectedTicket.type.price}
            quantity={quantity}
            handleAddToCart={handleAddToCart}
            isLoggedIn={!!user}
          />
        </div>
      )}

      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}
    </div>
  );
}

export default TicketSelector;