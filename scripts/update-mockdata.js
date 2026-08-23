const fs = require('fs');

const mockDataContent = `export const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: "Classic Dosa Mix – 500g",
    slug: "classic-dosa-mix-500g",
    category: "Dosa Mix",
    packSize: "500g",
    price: 149,
    originalPrice: 179,
    discount: 17,
    stock: 20,
    rating: 4.8,
    reviews: 124,
    // image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80",
    image: "/images/Dosa/classic-dosa-mix.jpg",
    badge: "Bestseller",
    isFeatured: true,
    status: "Active",
    description: "DOSIFY Classic Dosa Mix is crafted with carefully selected rice and urad dal to give you the perfect golden, crispy dosa every time. Skip the traditional 12-hour soaking and grinding process — simply mix with water, rest for 5 minutes, and enjoy restaurant-style crispy dosas.",
    highlights: ["Crisp & Golden Finish", "No Fermentation Needed", "Consistent Restaurant Taste", "100% Preservative Free"],
    packSizesAvailable: [
      { size: "500g", price: 149, originalPrice: 179, servings: "10-12 Dosas" },
      { size: "700g", price: 199, originalPrice: 249, servings: "15-18 Dosas" },
      { size: "1kg", price: 249, originalPrice: 299, servings: "22-25 Dosas" }
    ],
    ingredients: [
      "Premium Parboiled Rice",
      "High-grade Urad Dal (Black Gram)",
      "Fenugreek Seeds (Methi)",
      "Poha (Flattened Rice for crispness)",
      "Iodized Salt",
      "Natural Leavening Agent (<0.5%)"
    ],
    nutrition: [
      { label: "Energy / Calories", value: "354 kcal" },
      { label: "Protein", value: "11.8 g" },
      { label: "Carbohydrates", value: "72.4 g" },
      { label: "Dietary Fiber", value: "4.2 g" },
      { label: "Total Fat", value: "1.2 g" },
      { label: "Sodium", value: "480 mg" }
    ],
    preparation: [
      { step: 1, title: "MIX", desc: "Whisk 1 cup DOSIFY mix with 1.25 cups room-temperature water in a bowl." },
      { step: 2, title: "PREPARE", desc: "Allow batter to rest for 5 minutes for optimal hydration." },
      { step: 3, title: "POUR", desc: "Heat a tawa on medium-high and pour a ladleful in the center." },
      { step: 4, title: "COOK", desc: "Spread outwards in circles, drizzle ghee/oil, and cook till golden brown." },
      { step: 5, title: "ENJOY", desc: "Fold and serve hot with fresh coconut chutney and spicy sambar!" }
    ],
    storage: "Store in a cool, dry place. Transfer to an airtight container after opening. Consume within 45 days.",
    reviewList: [
      { author: "Abdul razak", rating: 5, date: "2 days ago", comment: "The dosa turned out super crisp and golden brown just like Saravana Bhavan! My kids loved it for breakfast." },
      { author: "Karthik Ramanathan", rating: 5, date: "1 week ago", comment: "Game changer for working professionals. No more waiting 12 hours for fermentation." },
      { author: "Ananya Deshmukh", rating: 4.5, date: "2 weeks ago", comment: "Texture is spot on. Very easy to spread thin and make crispy paper roasts." }
    ]
  },
  {
    id: 2,
    name: "Classic Dosa Mix – 1kg",
    slug: "classic-dosa-mix-1kg",
    category: "Dosa Mix",
    packSize: "1kg",
    price: 249,
    originalPrice: 299,
    discount: 17,
    stock: 15,
    rating: 4.8,
    reviews: 98,
    image: "https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&w=800&q=80",
    badge: "Family Pack",
    isFeatured: true,
    status: "Active",
    description: "Our signature Classic Dosa Mix in a family-sized 1kg pouch. Makes up to 25 authentic, light, and golden crispy dosas with effortless ease. Perfect for larger households and weekend brunches.",
    highlights: ["Serves 5-6 People", "Value Saver Pack", "Zero Fermentation Wait", "Traditional Taste"],
    packSizesAvailable: [
      { size: "500g", price: 149, originalPrice: 179, servings: "10-12 Dosas" },
      { size: "1kg", price: 249, originalPrice: 299, servings: "22-25 Dosas" }
    ],
    ingredients: [
      "Premium Parboiled Rice",
      "High-grade Urad Dal",
      "Fenugreek Seeds",
      "Poha",
      "Iodized Salt"
    ],
    nutrition: [
      { label: "Energy / Calories", value: "354 kcal" },
      { label: "Protein", value: "11.8 g" },
      { label: "Carbohydrates", value: "72.4 g" },
      { label: "Dietary Fiber", value: "4.2 g" },
      { label: "Total Fat", value: "1.2 g" },
      { label: "Sodium", value: "480 mg" }
    ],
    preparation: [
      { step: 1, title: "MIX", desc: "Whisk DOSIFY mix with water in a 1:1.25 ratio." },
      { step: 2, title: "PREPARE", desc: "Rest batter for 5 minutes." },
      { step: 3, title: "POUR", desc: "Pour onto a hot non-stick or cast-iron tawa." },
      { step: 4, title: "COOK", desc: "Spread smoothly and roast with a splash of butter or ghee." },
      { step: 5, title: "ENJOY", desc: "Serve hot with podi, chutney and sambar." }
    ],
    storage: "Store in a cool dry place. Keep pouch zipped after every use.",
    reviewList: [
      { author: "Venkatesh Rao", rating: 5, date: "3 days ago", comment: "Great value for money. Batter consistency is always dependable and never turns sour." },
      { author: "Meera Krishnan", rating: 4.8, date: "2 weeks ago", comment: "Makes enough dosas for the whole joint family without any hassle." }
    ]
  },
  {
    id: 3,
    name: "Masala Dosa Mix – 700g",
    slug: "masala-dosa-mix-700g",
    category: "Masala Mix",
    packSize: "700g",
    price: 199,
    originalPrice: 249,
    discount: 20,
    stock: 18,
    rating: 4.9,
    reviews: 85,
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
    badge: "Chef Special",
    isFeatured: true,
    status: "Active",
    description: "Specially formulated for authentic Mysore-style Masala Dosas with an extra hint of roasted red chili, garlic, and gram dal infusion for that signature red roast hue and rich spicy aroma.",
    highlights: ["Mysore-Style Crisp", "Aromatic Spiced Batter", "Rich Golden Red Hue", "Restaurant Quality"],
    packSizesAvailable: [
      { size: "500g", price: 159, originalPrice: 199, servings: "10-12 Dosas" },
      { size: "700g", price: 199, originalPrice: 249, servings: "15-18 Dosas" }
    ],
    ingredients: [
      "Rice Flour",
      "Urad Dal",
      "Chana Dal",
      "Byadagi Chilli Powder",
      "Roasted Cumin & Coriander",
      "Hing (Asafoetida)",
      "Rock Salt"
    ],
    nutrition: [
      { label: "Energy / Calories", value: "360 kcal" },
      { label: "Protein", value: "12.4 g" },
      { label: "Carbohydrates", value: "70.2 g" },
      { label: "Dietary Fiber", value: "5.1 g" },
      { label: "Total Fat", value: "1.8 g" },
      { label: "Sodium", value: "510 mg" }
    ],
    preparation: [
      { step: 1, title: "MIX", desc: "Whisk 1 cup Masala mix with 1.3 cups water until smooth." },
      { step: 2, title: "PREPARE", desc: "Let rest 5 mins so spices fully blossom." },
      { step: 3, title: "POUR", desc: "Pour on high heat skillet and spiral out thinly." },
      { step: 4, title: "COOK", desc: "Add generous butter and potato masala filling in center." },
      { step: 5, title: "ENJOY", desc: "Fold into triangle and serve with coconut chutney." }
    ],
    storage: "Airtight seal prevents aroma loss. Store in a dry kitchen pantry.",
    reviewList: [
      { author: "Deepak Somayaji", rating: 5, date: "Yesterday", comment: "The authentic spicy aroma and crispy crust will blow your mind. Better than hotel dosas." },
      { author: "Sneha Nair", rating: 4.8, date: "5 days ago", comment: "Red chutney blend is heavenly. Makes fantastic crispy ghee roast!" }
    ]
  },
  {
    id: 4,
    name: "Millet Dosa Mix – 500g",
    slug: "millet-dosa-mix-500g",
    category: "Millet Mix",
    packSize: "500g",
    price: 179,
    originalPrice: 219,
    discount: 18,
    stock: 10,
    rating: 4.8,
    reviews: 72,
    image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=800&q=80",
    badge: "High Fiber",
    isFeatured: true,
    status: "Low Stock",
    description: "A powerhouse of nutrition combining Foxtail Millet, Kodo Millet, Little Millet, and Barnyard Millet with Urad Dal. Low glycemic index, high fiber, gluten-friendly, and packed with plant protein.",
    highlights: ["Multi-Millet Superfood", "Diabetic-Friendly Low GI", "Rich in Dietary Fiber", "Nutty & Crisp Taste"],
    packSizesAvailable: [
      { size: "500g", price: 179, originalPrice: 219, servings: "10-12 Dosas" },
      { size: "1kg", price: 319, originalPrice: 389, servings: "22-25 Dosas" }
    ],
    ingredients: [
      "Foxtail Millet (Kangni)",
      "Little Millet (Samai)",
      "Kodo Millet (Kodra)",
      "Barnyard Millet (Sanwa)",
      "Urad Dal",
      "Methi Seeds",
      "Himalayan Pink Salt"
    ],
    nutrition: [
      { label: "Energy / Calories", value: "328 kcal" },
      { label: "Protein", value: "14.2 g" },
      { label: "Carbohydrates", value: "62.0 g" },
      { label: "Dietary Fiber", value: "8.5 g" },
      { label: "Total Fat", value: "1.6 g" },
      { label: "Sodium", value: "390 mg" }
    ],
    preparation: [
      { step: 1, title: "MIX", desc: "Whisk 1 cup Millet mix with 1.35 cups water." },
      { step: 2, title: "PREPARE", desc: "Rest 7 minutes to soften millet grains." },
      { step: 3, title: "POUR", desc: "Pour on medium heat tawa." },
      { step: 4, title: "COOK", desc: "Cover with lid for 1 min, then flip for 30 seconds." },
      { step: 5, title: "ENJOY", desc: "Enjoy guilt-free with coriander tomato chutney." }
    ],
    storage: "Keep in a cool dry place away from moisture.",
    reviewList: [
      { author: "Dr. Rajeshwar Sharma", rating: 5, date: "4 days ago", comment: "As a physician, I highly recommend this. High fiber, great satiety, and surprisingly crispy!" },
      { author: "Lavanya Mohan", rating: 4.7, date: "1 week ago", comment: "So delicious. Even my picky toddler eats it without complaining." }
    ]
  },
  {
    id: 5,
    name: "Ragi Dosa Mix – 500g",
    slug: "ragi-dosa-mix-500g",
    category: "Millet Mix",
    packSize: "500g",
    price: 169,
    originalPrice: 199,
    discount: 15,
    stock: 0,
    rating: 4.6,
    reviews: 63,
    image: "https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?auto=format&fit=crop&w=800&q=80",
    badge: "Iron & Calcium",
    isFeatured: false,
    status: "Out of Stock",
    description: "Pure Finger Millet (Ragi) enriched with wholesome lentils. Packed with natural calcium, iron, and slow-burning complex carbohydrates for lasting vitality and strength throughout the day.",
    highlights: ["Natural Calcium Booster", "Zero Refined Flour", "Wholesome Earthy Taste", "Easy Digestion"],
    packSizesAvailable: [
      { size: "500g", price: 169, originalPrice: 199, servings: "10-12 Dosas" }
    ],
    ingredients: [
      "Sprouted Finger Millet (Ragi) Flour",
      "Urad Dal",
      "Red Rice Flour",
      "Cumin Seeds",
      "Ginger Powder",
      "Rock Salt"
    ],
    nutrition: [
      { label: "Energy / Calories", value: "320 kcal" },
      { label: "Protein", value: "10.5 g" },
      { label: "Calcium", value: "344 mg" },
      { label: "Iron", value: "3.9 mg" },
      { label: "Dietary Fiber", value: "7.2 g" }
    ],
    preparation: [
      { step: 1, title: "MIX", desc: "Mix with water & a spoon of curd (optional) for extra tang." },
      { step: 2, title: "PREPARE", desc: "Rest 5 minutes." },
      { step: 3, title: "POUR", desc: "Pour from height like rava dosa onto sizzling tawa." },
      { step: 4, title: "COOK", desc: "Cook until deep chocolate-golden brown." },
      { step: 5, title: "ENJOY", desc: "Serve with onion chutney and hot filter coffee." }
    ],
    storage: "Keep dry and airtight.",
    reviewList: [
      { author: "Sunita G", rating: 4.6, date: "3 weeks ago", comment: "Very nutritious and earthy. Great for morning breakfast before workout." }
    ]
  },
  {
    id: 6,
    name: "Instant Uttapam Mix – 500g",
    slug: "instant-uttapam-mix-500g",
    category: "Dosa Mix",
    packSize: "500g",
    price: 159,
    originalPrice: 189,
    discount: 16,
    stock: 25,
    rating: 4.5,
    reviews: 53,
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    badge: "Fluffy & Soft",
    isFeatured: false,
    status: "Active",
    description: "Specially ground coarse batter mix designed for fluffy, sponge-soft thick South Indian Uttapams. Top with diced onions, tomatoes, green chillies, and fresh coriander for a hearty meal.",
    highlights: ["Sponge-Soft & Fluffy", "Coarse Homestyle Texture", "Topping Friendly", "Kid Approved"],
    packSizesAvailable: [
      { size: "500g", price: 159, originalPrice: 189, servings: "8-10 Thick Uttapams" }
    ],
    ingredients: [
      "Coarse Rice Flour",
      "Urad Dal",
      "Semolina (Rava)",
      "Fenugreek",
      "Salt"
    ],
    nutrition: [
      { label: "Energy / Calories", value: "348 kcal" },
      { label: "Protein", value: "11.0 g" },
      { label: "Carbohydrates", value: "71.0 g" },
      { label: "Dietary Fiber", value: "3.8 g" }
    ],
    preparation: [
      { step: 1, title: "MIX", desc: "Mix with water into a thicker pancake consistency." },
      { step: 2, title: "PREPARE", desc: "Rest 5 minutes." },
      { step: 3, title: "POUR", desc: "Pour a thick round on tawa without spreading too thin." },
      { step: 4, title: "COOK", desc: "Top with veggies, press down gently, and flip once." },
      { step: 5, title: "ENJOY", desc: "Serve with spicy tomato relish." }
    ],
    storage: "Airtight pantry storage.",
    reviewList: [
      { author: "Harish V", rating: 5, date: "2 weeks ago", comment: "Makes restaurant-style onion tomato uttapam effortlessly!" }
    ]
  },
  {
    id: 7,
    name: "Idli & Dosa Mix – 1kg",
    slug: "idli-dosa-mix-1kg",
    category: "Dosa Mix",
    packSize: "1kg",
    price: 259,
    originalPrice: 299,
    discount: 13,
    stock: 16,
    rating: 4.7,
    reviews: 110,
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80",
    badge: "2-in-1 Dual Mix",
    isFeatured: false,
    status: "Active",
    description: "Versatile master mix that makes pillowy soft steamed idlis and crisp paper dosas from the exact same pouch. Simply adjust water ratio for idli (thicker) or dosa (thinner).",
    highlights: ["Dual Purpose Versatility", "Cloud-Soft Idlis", "Crispy Golden Dosas", "Family Value"],
    packSizesAvailable: [
      { size: "1kg", price: 259, originalPrice: 299, servings: "25-30 Idlis / 22 Dosas" }
    ],
    ingredients: ["Parboiled Rice", "Urad Dal Gota", "Fenugreek", "Salt"],
    nutrition: [
      { label: "Energy / Calories", value: "350 kcal" },
      { label: "Protein", value: "12.0 g" },
      { label: "Carbohydrates", value: "72.0 g" }
    ],
    preparation: [
      { step: 1, title: "MIX", desc: "For Idli: Mix 1:1 water. For Dosa: Mix 1:1.3 water." },
      { step: 2, title: "PREPARE", desc: "Rest 5-10 minutes." },
      { step: 3, title: "POUR", desc: "Steam in idli plates for 10 mins or pour on tawa for dosa." },
      { step: 4, title: "COOK", desc: "Cook until done." },
      { step: 5, title: "ENJOY", desc: "Serve hot." }
    ],
    storage: "Store in cool dry place.",
    reviewList: [
      { author: "Gayathri R", rating: 5, date: "1 month ago", comment: "Idlis were so soft like jasmine flowers, and dosas were so crisp!" }
    ]
  },
  {
    id: 8,
    name: "Family Combo Pack",
    slug: "family-combo-pack",
    category: "Combo Packs",
    packSize: "Combo",
    price: 499,
    originalPrice: 599,
    discount: 17,
    stock: 22,
    rating: 4.9,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=800&q=80",
    badge: "Mega Saver",
    isFeatured: false,
    status: "Active",
    description: "The ultimate DOSIFY discovery box! Includes 1x Classic Dosa Mix (500g), 1x Masala Dosa Mix (700g), 1x Millet Mix (500g), and a free artisanal Gunpowder Podi pouch.",
    highlights: ["3 Bestseller Mixes", "Free Gunpowder Podi", "Save ₹100 Instantly", "All Flavors in One"],
    packSizesAvailable: [
      { size: "Combo (1.7kg)", price: 499, originalPrice: 599, servings: "40+ Dosas" }
    ],
    ingredients: ["Assorted Premium Grains, Millets, and Spices across 3 blends"],
    nutrition: [
      { label: "Average Calories", value: "348 kcal / 100g" },
      { label: "Protein", value: "12.5 g" }
    ],
    preparation: [
      { step: 1, title: "CHOOSE", desc: "Pick your preferred pouch for the day." },
      { step: 2, title: "MIX", desc: "Whisk with water per pouch guidelines." },
      { step: 3, title: "POUR", desc: "Pour on hot tawa." },
      { step: 4, title: "COOK", desc: "Cook to golden perfection." },
      { step: 5, title: "ENJOY", desc: "Sprinkle complimentary gunpowder podi and enjoy." }
    ],
    storage: "Keep pouches sealed in a cool pantry.",
    reviewList: [
      { author: "Siddharth Menon", rating: 5, date: "5 days ago", comment: "Best purchase ever! The variety keeps breakfast exciting and the podi is awesome." }
    ]
  }
];

export const HERO_DATA = {
  badge: "✨ 100% Natural • Zero Fermentation Wait",
  headlinePrefix: "Instant Dosa Batter Mix.",
  headlineHighlight: "Fresh.",
  headlineSuffix: "Fast. Favorite.",
  subtext: "Make crispy, delicious dosa anytime — without the traditional batter preparation.",
  shopButtonText: "SHOP NOW",
  recipesButtonText: "EXPLORE RECIPES",
  heroImage: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=1200&q=85"
};

export const WHY_DOSIFY = [
  {
    icon: "bowl",
    title: "Quick & Easy",
    desc: "Dosa whenever you want, without lengthy preparation."
  },
  {
    icon: "sparkles",
    title: "Fresh Taste",
    desc: "Designed to deliver crispy and delicious dosa every single time."
  },
  {
    icon: "clock",
    title: "No Long Fermentation",
    desc: "Skip the traditional 12-hour batter preparation process."
  },
  {
    icon: "heart",
    title: "Perfect for Everyday",
    desc: "Convenient for busy weekday mornings and weekend family meals."
  }
];

export const HOW_IT_WORKS = [
  {
    step: "01",
    title: "MIX",
    desc: "Add 1 cup DOSIFY mix to 1.25 cups water and whisk smooth.",
    icon: "whisk"
  },
  {
    step: "02",
    title: "PREPARE",
    desc: "Let the batter rest for just 5 minutes to hydrate.",
    icon: "timer"
  },
  {
    step: "03",
    title: "POUR",
    desc: "Pour a ladle of batter on your heated cast-iron or non-stick tawa.",
    icon: "flame"
  },
  {
    step: "04",
    title: "COOK",
    desc: "Spread outward gently, drizzle ghee, and roast until golden crisp.",
    icon: "chef-hat"
  },
  {
    step: "05",
    title: "ENJOY",
    desc: "Serve hot with coconut chutney, tomato dip, and spicy sambar!",
    icon: "utensils"
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Dr. Sandhya Varma",
    role: "Bangalore",
    rating: 5,
    title: "Crispy perfection in 5 minutes!",
    comment: "Super convenient for busy mornings. The dosa turns out crispy and delicious without any artificial sourness. Truly feels like homemade batter!"
  },
  {
    id: 2,
    name: "Arjun Natarajan",
    role: "Chennai",
    rating: 5,
    title: "Game changer for South Indians abroad & busy pros",
    comment: "I was skeptical about instant batter mixes, but DOSIFY exceeded expectations. The Mysore Masala flavor is phenomenal."
  },
  {
    id: 3,
    name: "Divya Balasubramanian",
    role: "Hyderabad",
    rating: 5,
    title: "Kids love the golden crunch",
    comment: "Breakfast prep used to take hours of planning. With DOSIFY, my family enjoys piping hot, golden roasts whenever they want."
  }
];

export const RECIPES_PREVIEW = [
  {
    id: 1,
    title: "Classic Golden Roast Dosa",
    time: "5 mins",
    difficulty: "Easy",
    servings: "2-3",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80",
    description: "The timeless South Indian crispy paper roast with golden browned lattice edges, served with coconut chutney and hot sambar.",
    steps: [
      "Mix 1 cup DOSIFY Classic Mix with 1.25 cups water.",
      "Heat tawa on high, wipe with a damp cloth to moderate heat.",
      "Pour batter, spread thinly in circular motion.",
      "Drizzle ghee around the edges and cook on medium until crisp.",
      "Fold into a cone or roll and serve piping hot."
    ]
  },
  {
    id: 2,
    title: "Mysore Masala Dosa",
    time: "10 mins",
    difficulty: "Intermediate",
    servings: "2-4",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80",
    description: "Spiced dosa lined with fiery red garlic chili chutney, layered with flavorful spiced potato-onion mash and a dollop of fresh butter.",
    steps: [
      "Prepare potato mash with mustard, ginger, curry leaves, and turmeric.",
      "Spread DOSIFY Masala Dosa batter thinly on tawa.",
      "Spread 1 tsp red chutney inside the roasting dosa.",
      "Place potato masala in center, fold both sides and serve."
    ]
  },
  {
    id: 3,
    title: "Healthy Millet Dosa",
    time: "7 mins",
    difficulty: "Easy",
    servings: "2",
    image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=600&q=80",
    description: "Multi-millet powerhouse roast packed with plant fiber and slow carbohydrates for lasting energy throughout the day.",
    steps: [
      "Whisk DOSIFY Millet mix with 1.3 cups water.",
      "Rest 7 mins for grains to hydrate smoothly.",
      "Pour on tawa, cook with light sesame oil.",
      "Serve with mint coconut chutney."
    ]
  },
  {
    id: 4,
    title: "Onion Tomato Uttapam Delight",
    time: "6 mins",
    difficulty: "Easy",
    servings: "1-2",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80",
    description: "Fluffy, sponge-soft thick uttapam loaded with diced onions, juicy tomatoes, fresh coriander and a hint of green chili.",
    steps: [
      "Spread DOSIFY batter thickly on heated tawa.",
      "Sprinkle diced onion, tomato, and cilantro on top.",
      "Cover with lid for 1.5 mins, flip and cook 30 secs.",
      "Serve with tangy tomato chutney."
    ]
  }
];

export const ADMIN_STATS = {
  totalProducts: 12,
  activeProducts: 10,
  lowStock: 2,
  totalOrders: 248,
  revenue: "₹1,48,250",
  weeklyGrowth: "+18.4%",
  avgOrderValue: "₹345",
  fulfillmentRate: "99.2%"
};

export const REVENUE_CHART_DATA = [
  { day: "Mon", revenue: 14200, orders: 38 },
  { day: "Tue", revenue: 18450, orders: 46 },
  { day: "Wed", revenue: 16100, orders: 41 },
  { day: "Thu", revenue: 21800, orders: 54 },
  { day: "Fri", revenue: 27900, orders: 68 },
  { day: "Sat", revenue: 34500, orders: 85 },
  { day: "Sun", revenue: 38900, orders: 96 }
];

export const RECENT_ORDERS = [
  { id: "DOS-84920", customer: "Abdul razak", email: "priya.sundaram@example.com", items: "Classic Dosa Mix 500g x 2", amount: "₹298", payment: "UPI (GPay)", status: "Delivered", date: "Today, 10:15 AM", address: "Indiranagar, Bangalore" },
  { id: "DOS-84919", customer: "Karthik Ramanathan", email: "karthik.r@example.com", items: "Family Combo Pack x 1", amount: "₹499", payment: "Credit Card", status: "Processing", date: "Today, 09:30 AM", address: "T. Nagar, Chennai" },
  { id: "DOS-84918", customer: "Ananya Deshmukh", email: "ananya.d@example.com", items: "Masala 700g x 1, Millet 500g x 1", amount: "₹378", payment: "UPI (PhonePe)", status: "Shipped", date: "Yesterday, 04:45 PM", address: "Jubilee Hills, Hyderabad" },
  { id: "DOS-84917", customer: "Venkatesh Rao", email: "venkat.rao@example.com", items: "Classic Dosa Mix 1kg x 2", amount: "₹498", payment: "Cash on Delivery", status: "Delivered", date: "Yesterday, 02:10 PM", address: "Malleshwaram, Bangalore" },
  { id: "DOS-84916", customer: "Meera Krishnan", email: "meera.k@example.com", items: "Instant Uttapam Mix x 2", amount: "₹318", payment: "UPI (Paytm)", status: "Delivered", date: "2 days ago", address: "Adyar, Chennai" }
];
`;

fs.writeFileSync('data/mockData.js', mockDataContent, 'utf8');
console.log('mockData.js updated with real dosa photography and rich admin analytics data!');
