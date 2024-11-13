// src/data/mockTicketData.js

export const generateMockTickets = (eventId, isVerifiedFan = false) => {
  const sections = [
    { id: 'A1', name: 'Floor Section A', capacity: 100 },
    { id: 'A2', name: 'Floor Section B', capacity: 100 },
    { id: 'B1', name: 'Lower Bowl 100', capacity: 200 },
    { id: 'B2', name: 'Lower Bowl 200', capacity: 200 },
    { id: 'C1', name: 'Upper Level 300', capacity: 300 },
    { id: 'C2', name: 'Upper Level 400', capacity: 300 },
  ];

  const standardTicketTypes = [
    { id: 'standard', name: 'Standard', multiplier: 1 },
    { id: 'vip', name: 'VIP Package', multiplier: 2.5 },
    { id: 'platinum', name: 'Platinum', multiplier: 3 },
    { id: 'meet-greet', name: 'Meet & Greet Package', multiplier: 4 },
  ];

  const verifiedFanTicket = {
    id: 'verified-fan',
    name: 'Verified Fan Ticket',
    multiplier: 1.5,
    perks: [
      'Priority Entry',
      'Exclusive Merch Options',
      'Special Access Area',
      'Fan Recognition'
    ]
  };

  const ticketTypes = isVerifiedFan 
    ? [...standardTicketTypes, verifiedFanTicket]
    : standardTicketTypes;

  // Generate different base prices for each section
  return sections.map(section => {
    const basePrice = 50 + Math.floor(Math.random() * 150);
    const availableTickets = Math.floor(Math.random() * section.capacity);

    return {
      sectionId: section.id,
      sectionName: section.name,
      availableTickets,
      types: ticketTypes.map(type => ({
        typeId: `${section.id}-${type.id}`,
        name: type.name,
        price: Math.floor(basePrice * type.multiplier),
        available: Math.floor(availableTickets / ticketTypes.length),
        perks: type.perks || (
          type.id === 'vip' ? ['Early Entry', 'Exclusive Merch'] :
          type.id === 'platinum' ? ['Premium Seats', 'Parking Pass', 'Lounge Access'] :
          type.id === 'meet-greet' ? ['Meet & Greet', 'Photo Op', 'Signed Merch', 'VIP Entrance'] : 
          ['Standard Entry']
        )
      }))
    };
  });
};