// Mock data for Royal Burguer App

export const menuItems = [
  // Burgers
  {
    id: 1,
    name: "Royal Classic Burger",
    category: "burgers",
    price: 8.99,
    description: "Our signature burger with 100% beef patty, lettuce, tomato, onions, pickles, and our special sauce",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwxfHxidXJnZXJ8ZW58MHx8fHwxNzYyNDM4MjQ5fDA&ixlib=rb-4.1.0&q=85",
    popular: true,
    customizable: true
  },
  {
    id: 2,
    name: "Double Royal Burger",
    category: "burgers",
    price: 11.99,
    description: "Double the beef, double the flavor! Two flame-grilled patties with cheese, lettuce, and our signature sauce",
    image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwzfHxidXJnZXJ8ZW58MHx8fHwxNzYyNDM4MjQ5fDA&ixlib=rb-4.1.0&q=85",
    popular: true,
    customizable: true
  },
  {
    id: 3,
    name: "Cheese Royal Deluxe",
    category: "burgers",
    price: 9.99,
    description: "Premium burger with melted cheese, fresh lettuce, tomatoes, and our creamy mayo sauce",
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwyfHxidXJnZXJ8ZW58MHx8fHwxNzYyNDM4MjQ5fDA&ixlib=rb-4.1.0&q=85",
    popular: false,
    customizable: true
  },
  {
    id: 4,
    name: "Gourmet Royal",
    category: "burgers",
    price: 12.99,
    description: "Gourmet burger with premium toppings, caramelized onions, bacon, and special BBQ sauce",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHw0fHxidXJnZXJ8ZW58MHx8fHwxNzYyNDM4MjQ5fDA&ixlib=rb-4.1.0&q=85",
    popular: false,
    customizable: true
  },
  {
    id: 5,
    name: "Bacon Cheese Burger",
    category: "burgers",
    price: 10.99,
    description: "Juicy beef patty topped with crispy bacon, melted cheese, and our signature sauce",
    image: "https://images.pexels.com/photos/6671778/pexels-photo-6671778.jpeg",
    popular: true,
    customizable: true
  },
  {
    id: 6,
    name: "Triple Royal Tower",
    category: "burgers",
    price: 14.99,
    description: "Three flame-grilled patties stacked high with cheese, bacon, and all the fixings",
    image: "https://images.unsplash.com/photo-1667329829058-ac191ba4a905?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwzfHxjaGVlc2VidXJnZXJ8ZW58MHx8fHwxNzYyNDM4MjU0fDA&ixlib=rb-4.1.0&q=85",
    popular: false,
    customizable: true
  },
  
  // Chicken
  {
    id: 7,
    name: "Crispy Chicken Burger",
    category: "chicken",
    price: 8.49,
    description: "Crispy breaded chicken fillet with lettuce, mayo, and pickles on a toasted bun",
    image: "https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg",
    popular: true,
    customizable: true
  },
  {
    id: 8,
    name: "Spicy Chicken Royal",
    category: "chicken",
    price: 9.49,
    description: "Spicy chicken patty with jalapeños, pepper jack cheese, and chipotle mayo",
    image: "https://images.unsplash.com/photo-1599474151439-9f3c4e972009?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHw0fHxjaGVlc2VidXJnZXJ8ZW58MHx8fHwxNzYyNDM4MjU0fDA&ixlib=rb-4.1.0&q=85",
    popular: false,
    customizable: true
  },
  {
    id: 9,
    name: "Chicken Nuggets (10 pcs)",
    category: "chicken",
    price: 6.99,
    description: "Golden crispy chicken nuggets made from tender white meat chicken",
    image: "https://images.unsplash.com/photo-1619881590738-a111d176d906",
    popular: true,
    customizable: false
  },
  {
    id: 10,
    name: "Chicken Wings (8 pcs)",
    category: "chicken",
    price: 9.99,
    description: "Crispy chicken wings tossed in your choice of sauce: BBQ, Buffalo, or Honey Mustard",
    image: "https://images.unsplash.com/photo-1569691899455-88464f6d3ab1",
    popular: false,
    customizable: true
  },
  
  // Sides
  {
    id: 11,
    name: "Royal Fries (Medium)",
    category: "sides",
    price: 3.49,
    description: "Golden crispy fries seasoned to perfection",
    image: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d",
    popular: true,
    customizable: false
  },
  {
    id: 12,
    name: "Royal Fries (Large)",
    category: "sides",
    price: 4.49,
    description: "Large serving of our famous golden fries",
    image: "https://images.unsplash.com/photo-1518013431117-eb1465fa5752",
    popular: true,
    customizable: false
  },
  {
    id: 13,
    name: "Onion Rings",
    category: "sides",
    price: 4.99,
    description: "Crispy golden onion rings with a side of ranch dipping sauce",
    image: "https://images.unsplash.com/photo-1598679253544-2c97992403ea",
    popular: false,
    customizable: false
  },
  {
    id: 14,
    name: "Loaded Fries",
    category: "sides",
    price: 5.99,
    description: "Fries loaded with cheese, bacon bits, and sour cream",
    image: "https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg",
    popular: true,
    customizable: false
  },
  
  // Drinks
  {
    id: 15,
    name: "Soft Drink (Medium)",
    category: "drinks",
    price: 2.49,
    description: "Choose from Coke, Sprite, Fanta, or Diet Coke",
    image: "https://images.pexels.com/photos/2638026/pexels-photo-2638026.jpeg",
    popular: true,
    customizable: false
  },
  {
    id: 16,
    name: "Chocolate Milkshake",
    category: "drinks",
    price: 4.99,
    description: "Rich and creamy chocolate milkshake topped with whipped cream",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699",
    popular: true,
    customizable: false
  },
  {
    id: 17,
    name: "Strawberry Milkshake",
    category: "drinks",
    price: 4.99,
    description: "Fresh strawberry milkshake with whipped cream and a cherry on top",
    image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc",
    popular: false,
    customizable: false
  },
  {
    id: 18,
    name: "Iced Coffee",
    category: "drinks",
    price: 3.99,
    description: "Refreshing iced coffee with your choice of milk and sweetener",
    image: "https://images.pexels.com/photos/2638026/pexels-photo-2638026.jpeg",
    popular: false,
    customizable: false
  },
  
  // Desserts
  {
    id: 19,
    name: "Apple Pie",
    category: "desserts",
    price: 2.99,
    description: "Warm apple pie with a flaky crust and cinnamon-spiced filling",
    image: "https://images.pexels.com/photos/1059943/pexels-photo-1059943.jpeg",
    popular: true,
    customizable: false
  },
  {
    id: 20,
    name: "Chocolate Sundae",
    category: "desserts",
    price: 3.99,
    description: "Vanilla ice cream topped with rich chocolate sauce and whipped cream",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699",
    popular: true,
    customizable: false
  }
];

export const deals = [
  {
    id: 1,
    title: "Royal Meal Deal",
    description: "Any burger + Medium Fries + Soft Drink",
    price: 12.99,
    originalPrice: 15.97,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwxfHxidXJnZXJ8ZW58MHx8fHwxNzYyNDM4MjQ5fDA&ixlib=rb-4.1.0&q=85",
    featured: true
  },
  {
    id: 2,
    title: "Family Feast",
    description: "4 Burgers + 2 Large Fries + 4 Drinks",
    price: 39.99,
    originalPrice: 47.96,
    image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwzfHxidXJnZXJ8ZW58MHx8fHwxNzYyNDM4MjQ5fDA&ixlib=rb-4.1.0&q=85",
    featured: true
  },
  {
    id: 3,
    title: "Chicken Combo",
    description: "Crispy Chicken Burger + Chicken Nuggets + Fries + Drink",
    price: 16.99,
    originalPrice: 19.96,
    image: "https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg",
    featured: false
  }
];

export const stores = [
  {
    id: 1,
    name: "Royal Burguer Downtown",
    address: "123 Main Street, Downtown",
    city: "New York",
    phone: "(555) 123-4567",
    hours: "Mon-Sun: 10:00 AM - 11:00 PM",
    lat: 40.7589,
    lng: -73.9851
  },
  {
    id: 2,
    name: "Royal Burguer Midtown",
    address: "456 Park Avenue, Midtown",
    city: "New York",
    phone: "(555) 234-5678",
    hours: "Mon-Sun: 9:00 AM - 12:00 AM",
    lat: 40.7549,
    lng: -73.9840
  },
  {
    id: 3,
    name: "Royal Burguer Brooklyn",
    address: "789 Bedford Ave, Brooklyn",
    city: "Brooklyn",
    phone: "(555) 345-6789",
    hours: "Mon-Sun: 10:00 AM - 11:00 PM",
    lat: 40.7178,
    lng: -73.9632
  }
];
