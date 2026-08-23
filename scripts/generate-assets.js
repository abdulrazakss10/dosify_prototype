const fs = require('fs');
const path = require('path');

function createPouchSvg(config) {
  const {
    title = "INSTANT DOSA",
    subtitle = "BATTER MIX",
    variant = "Classic",
    variantColor = "#F59E0B",
    pouchBaseColor = "#1B4D2E", // Deep forest green
    pouchDark = "#123720",
    pouchLight = "#276E43",
    packSize = "500g",
    dosaType = "classic", // classic, masala, millet, ragi, uttapam, idli
    accentBadge = "No Fermentation Needed"
  } = config;

  let dosaFill = "#E59838";
  let dosaFold = "#C67D22";
  let fillingExtra = "";

  if (dosaType === "masala") {
    dosaFill = "#D97706";
    dosaFold = "#B45309";
    fillingExtra = `<ellipse cx="250" cy="460" rx="35" ry="12" fill="#CA8A04" opacity="0.9"/>
                    <circle cx="245" cy="458" r="4" fill="#15803D"/>
                    <circle cx="260" cy="460" r="3" fill="#B91C1C"/>`;
  } else if (dosaType === "millet") {
    dosaFill = "#C28E44";
    dosaFold = "#966A2B";
  } else if (dosaType === "ragi") {
    dosaFill = "#78350F";
    dosaFold = "#582307";
  } else if (dosaType === "uttapam") {
    dosaFill = "#E2A03F";
    dosaFold = "#C27823";
    fillingExtra = `
      <circle cx="220" cy="450" r="6" fill="#DC2626"/>
      <circle cx="250" cy="445" r="5" fill="#16A34A"/>
      <circle cx="270" cy="455" r="6" fill="#EA580C"/>
      <circle cx="240" cy="465" r="5" fill="#4B5563"/>
    `;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 650" width="100%" height="100%">
  <defs>
    <linearGradient id="pouchGrad_${variant.replace(/\s+/g, '')}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${pouchLight}" />
      <stop offset="45%" stop-color="${pouchBaseColor}" />
      <stop offset="100%" stop-color="${pouchDark}" />
    </linearGradient>
    <linearGradient id="shineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.0" />
      <stop offset="25%" stop-color="#ffffff" stop-opacity="0.22" />
      <stop offset="45%" stop-color="#ffffff" stop-opacity="0.0" />
      <stop offset="85%" stop-color="#ffffff" stop-opacity="0.1" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0.2" />
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FDE68A" />
      <stop offset="50%" stop-color="#F59E0B" />
      <stop offset="100%" stop-color="#D97706" />
    </linearGradient>
    <linearGradient id="dosaRoll" x1="0%" y1="0%" x2="100%" y2="40%">
      <stop offset="0%" stop-color="#FCD34D" />
      <stop offset="30%" stop-color="${dosaFill}" />
      <stop offset="70%" stop-color="${dosaFold}" />
      <stop offset="100%" stop-color="#92400E" />
    </linearGradient>
    <filter id="pouchShadow" x="-10%" y="-5%" width="120%" height="115%">
      <feDropShadow dx="0" dy="18" stdDeviation="16" flood-color="#0F172A" flood-opacity="0.25" />
    </filter>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="4" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Pouch Body Outer Contour -->
  <g filter="url(#pouchShadow)">
    <!-- Top Seal / Notch Area -->
    <path d="M 120 40 
             C 180 35, 320 35, 380 40
             L 395 75
             C 330 70, 170 70, 105 75
             Z" fill="#143D22" />
    
    <!-- Top Grip Line & Tear Notches -->
    <path d="M 100 60 L 115 60 M 385 60 L 400 60" stroke="#0B2614" stroke-width="3" stroke-linecap="round"/>
    <line x1="120" y1="58" x2="380" y2="58" stroke="#34D399" stroke-width="1.5" stroke-dasharray="4 3" opacity="0.7"/>

    <!-- Main Standup Pouch -->
    <path d="M 105 75
             C 100 160, 80 480, 110 560
             C 140 590, 360 590, 390 560
             C 420 480, 400 160, 395 75
             Z" 
          fill="url(#pouchGrad_${variant.replace(/\s+/g, '')})" />

    <!-- Bottom Gusset Fold Shadow -->
    <path d="M 110 560
             C 170 585, 330 585, 390 560
             C 350 540, 150 540, 110 560
             Z" fill="#0A2012" opacity="0.6"/>

    <!-- Overlay Metallic Gloss / Reflection -->
    <path d="M 105 75
             C 100 160, 80 480, 110 560
             C 140 590, 360 590, 390 560
             C 420 480, 400 160, 395 75
             Z" 
          fill="url(#shineGrad)" />
  </g>

  <!-- POUCH GRAPHICS & LABELS -->
  <!-- Top Brand Banner -->
  <g transform="translate(250, 120)">
    <!-- Leaf / Modern Accent -->
    <path d="M -15 -35 C -5 -50, 20 -40, 15 -25 C 10 -15, -10 -20, -15 -35 Z" fill="#4ADE80" opacity="0.9"/>
    <path d="M 15 -35 C 5 -50, -20 -40, -15 -25" stroke="#14532D" stroke-width="1.5" fill="none"/>
    
    <!-- Brand Name DOSIFY -->
    <text x="0" y="0" text-anchor="middle" font-family="'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif" font-weight="900" font-size="44" fill="#FFFFFF" letter-spacing="3">
      DOSIFY
    </text>
    <text x="0" y="20" text-anchor="middle" font-family="'Inter', sans-serif" font-weight="600" font-size="11" fill="#BBF7D0" letter-spacing="4">
      INSTANT BATTER MIX
    </text>
  </g>

  <!-- Product Title & Variant Badge -->
  <g transform="translate(250, 185)">
    <rect x="-140" y="0" width="280" height="55" rx="8" fill="#0E331A" stroke="#22C55E" stroke-width="1.5" stroke-opacity="0.5"/>
    <text x="0" y="24" text-anchor="middle" font-family="'Inter', sans-serif" font-weight="800" font-size="16" fill="#FDE047" letter-spacing="2">
      ${title}
    </text>
    <text x="0" y="44" text-anchor="middle" font-family="'Inter', sans-serif" font-weight="700" font-size="14" fill="#FFFFFF" letter-spacing="3">
      ${subtitle}
    </text>
  </g>

  <!-- Variant Pill (Classic, Masala, Millet, etc.) -->
  <g transform="translate(250, 265)">
    <rect x="-85" y="-14" width="170" height="28" rx="14" fill="${variantColor}" filter="url(#glow)"/>
    <text x="0" y="5" text-anchor="middle" font-family="'Inter', sans-serif" font-weight="800" font-size="14" fill="#1E293B" letter-spacing="1">
      ${variant.toUpperCase()}
    </text>
  </g>

  <!-- Quality Assurance Badges -->
  <g transform="translate(250, 310)">
    <text x="0" y="0" text-anchor="middle" font-family="'Inter', sans-serif" font-weight="600" font-size="11" fill="#86EFAC">
      ★ ${accentBadge} ★
    </text>
  </g>

  <!-- Appetizing Visual Plate Window -->
  <g transform="translate(250, 435)">
    <!-- Circular / Oval Platter Background -->
    <ellipse cx="0" cy="20" rx="125" ry="68" fill="#FDFBF7" stroke="#D1D5DB" stroke-width="2" />
    <ellipse cx="0" cy="20" rx="118" ry="62" fill="#FEF3C7" opacity="0.35"/>

    <!-- Steaming/Golden Crisp Rolled Dosa -->
    <g transform="rotate(-6, 0, 15)">
      <!-- Shadow -->
      <ellipse cx="-5" cy="22" rx="98" ry="18" fill="#78350F" opacity="0.3"/>
      
      <!-- Rolled Dosa Cylinder -->
      <path d="M -95 10 
               C -95 -6, -85 -18, -60 -18
               L 65 -18
               C 92 -18, 98 -6, 98 10
               C 98 24, 85 30, 60 30
               L -65 30
               C -90 30, -95 22, -95 10
               Z" fill="url(#dosaRoll)" stroke="#78350F" stroke-width="1.5"/>
      
      <!-- Crisp Roasted Texture Marks -->
      <ellipse cx="-40" cy="2" rx="30" ry="10" fill="#92400E" opacity="0.4" />
      <ellipse cx="20" cy="-2" rx="45" ry="12" fill="#78350F" opacity="0.35" />
      <ellipse cx="60" cy="8" rx="20" ry="8" fill="#B45309" opacity="0.5" />
      <circle cx="-10" cy="6" r="3" fill="#451A03" opacity="0.4"/>
      <circle cx="35" cy="-5" r="4" fill="#451A03" opacity="0.4"/>
      
      <!-- Dosa Spiral End / Edge -->
      <ellipse cx="75" cy="6" rx="14" ry="20" fill="#D97706" stroke="#92400E" stroke-width="1.5"/>
      <ellipse cx="75" cy="6" rx="7" ry="12" fill="#78350F"/>
    </g>

    ${fillingExtra}

    <!-- Chutney Bowl 1 (Coconut Chutney) -->
    <g transform="translate(-75, 42)">
      <circle cx="0" cy="0" r="18" fill="#E2E8F0" stroke="#CBD5E1" stroke-width="1.5"/>
      <circle cx="0" cy="0" r="15" fill="#FFFFFF"/>
      <circle cx="-2" cy="-2" r="2" fill="#15803D"/>
      <circle cx="3" cy="2" r="1.5" fill="#15803D"/>
      <circle cx="1" cy="-3" r="1" fill="#B91C1C"/>
      <!-- Mustard seed & curry leaf -->
      <path d="M 0 0 C 4 -4, 8 -1, 6 3 Z" fill="#15803D" opacity="0.8"/>
    </g>

    <!-- Chutney Bowl 2 (Tomato / Sambar) -->
    <g transform="translate(75, 42)">
      <circle cx="0" cy="0" r="18" fill="#E2E8F0" stroke="#CBD5E1" stroke-width="1.5"/>
      <circle cx="0" cy="0" r="15" fill="#DC2626"/>
      <circle cx="0" cy="0" r="11" fill="#EA580C" opacity="0.8"/>
      <circle cx="2" cy="-2" r="1.5" fill="#78350F"/>
    </g>
  </g>

  <!-- Pack Info & Weight -->
  <g transform="translate(140, 545)">
    <rect x="-35" y="-12" width="70" height="24" rx="6" fill="#0B2614" stroke="#22C55E" stroke-width="1"/>
    <text x="0" y="4" text-anchor="middle" font-family="'Inter', sans-serif" font-weight="700" font-size="11" fill="#4ADE80">
      100% VEG
    </text>
  </g>

  <g transform="translate(360, 545)">
    <rect x="-35" y="-12" width="70" height="24" rx="6" fill="#FDE047"/>
    <text x="0" y="4" text-anchor="middle" font-family="'Inter', sans-serif" font-weight="800" font-size="12" fill="#1E293B">
      ${packSize}
    </text>
  </g>

  <!-- Footer Tagline on Pouch -->
  <text x="250" y="575" text-anchor="middle" font-family="'Inter', sans-serif" font-weight="600" font-size="10" fill="#BBF7D0" letter-spacing="1">
    READY IN 5 MINS • MAKES CRISPY DOSAS
  </text>
</svg>`;
}

// Generate Pouch SVGs
const pouches = [
  { file: 'classic-500g.svg', title: 'INSTANT DOSA', subtitle: 'BATTER MIX', variant: 'Classic', variantColor: '#F59E0B', packSize: '500g', dosaType: 'classic', accentBadge: 'Crispy & Golden' },
  { file: 'classic-1kg.svg', title: 'INSTANT DOSA', subtitle: 'BATTER MIX', variant: 'Classic Family', variantColor: '#10B981', packSize: '1kg', dosaType: 'classic', accentBadge: 'Family Value Pack' },
  { file: 'masala-700g.svg', title: 'MASALA DOSA', subtitle: 'SPECIAL MIX', variant: 'Masala Spiced', variantColor: '#F97316', packSize: '700g', dosaType: 'masala', accentBadge: 'Aromatic & Spiced' },
  { file: 'millet-500g.svg', title: 'HEALTHY MILLET', subtitle: 'DOSA MIX', variant: 'Millet Superfood', variantColor: '#EAB308', packSize: '500g', dosaType: 'millet', accentBadge: 'High Fiber & Protein' },
  { file: 'ragi-500g.svg', title: 'ORGANIC RAGI', subtitle: 'DOSA MIX', variant: 'Finger Millet', variantColor: '#A855F7', packSize: '500g', dosaType: 'ragi', accentBadge: 'Calcium & Iron Rich' },
  { file: 'uttapam-500g.svg', title: 'INSTANT UTTAPAM', subtitle: 'VEGGIE MIX', variant: 'Fluffy Uttapam', variantColor: '#06B6D4', packSize: '500g', dosaType: 'uttapam', accentBadge: 'Soft & Thick Delight' },
  { file: 'idli-dosa-1kg.svg', title: 'IDLI & DOSA', subtitle: 'DUAL PURPOSE MIX', variant: '2-in-1 Batter', variantColor: '#3B82F6', packSize: '1kg', dosaType: 'classic', accentBadge: 'Soft Idlis & Crisp Dosas' },
  { file: 'combo-pack.svg', title: 'VARIETY COMBO', subtitle: '4-IN-1 MEGA PACK', variant: 'Family Assortment', variantColor: '#EC4899', packSize: '2kg', dosaType: 'masala', accentBadge: 'Best Value Bundle' }
];

pouches.forEach(p => {
  const svg = createPouchSvg(p);
  fs.writeFileSync(path.join(__dirname, '../public/images/products', p.file), svg, 'utf8');
});

// Generate Hero Dosa Platter SVG
const heroSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 650" width="100%" height="100%">
  <defs>
    <radialGradient id="tableGlow" cx="50%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#FFFDF9"/>
      <stop offset="60%" stop-color="#F7EFE2"/>
      <stop offset="100%" stop-color="#EADDC7"/>
    </radialGradient>
    <radialGradient id="thaliMetal" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#FEF08A"/>
      <stop offset="40%" stop-color="#CA8A04"/>
      <stop offset="85%" stop-color="#854D0E"/>
      <stop offset="100%" stop-color="#451A03"/>
    </radialGradient>
    <linearGradient id="bananaLeaf" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4ADE80"/>
      <stop offset="50%" stop-color="#16A34A"/>
      <stop offset="100%" stop-color="#14532D"/>
    </linearGradient>
    <linearGradient id="heroDosa" x1="0%" y1="20%" x2="100%" y2="80%">
      <stop offset="0%" stop-color="#FEF08A"/>
      <stop offset="25%" stop-color="#F59E0B"/>
      <stop offset="60%" stop-color="#D97706"/>
      <stop offset="85%" stop-color="#B45309"/>
      <stop offset="100%" stop-color="#78350F"/>
    </linearGradient>
    <filter id="platterShadow" x="-10%" y="-10%" width="125%" height="125%">
      <feDropShadow dx="0" dy="25" stdDeviation="22" flood-color="#451A03" flood-opacity="0.28"/>
    </filter>
  </defs>

  <!-- Background Warm Table Top Atmosphere -->
  <rect width="900" height="650" rx="20" fill="url(#tableGlow)"/>

  <!-- Subtle Curry Leaves & Spices scattered on Table -->
  <g opacity="0.65">
    <path d="M 80 120 C 110 90, 130 130, 95 140 Z" fill="#15803D" transform="rotate(20 95 130)"/>
    <path d="M 120 150 C 140 130, 160 160, 135 170 Z" fill="#166534" transform="rotate(-15 135 160)"/>
    <circle cx="850" cy="180" r="4" fill="#B91C1C"/>
    <circle cx="865" cy="195" r="3" fill="#B91C1C"/>
    <circle cx="840" cy="210" r="4" fill="#451A03"/>
    <path d="M 780 120 C 810 100, 830 135, 800 145 Z" fill="#15803D" transform="rotate(-35 800 130)"/>
  </g>

  <!-- MAIN BRASS / BANANA LEAF THALI -->
  <g filter="url(#platterShadow)" transform="translate(380, 360)">
    <!-- Traditional Brass Thali Rim -->
    <ellipse cx="0" cy="0" rx="280" ry="175" fill="url(#thaliMetal)"/>
    <ellipse cx="0" cy="0" rx="265" ry="162" fill="#713F12"/>
    
    <!-- Fresh Cut Green Banana Leaf Liner -->
    <ellipse cx="0" cy="0" rx="255" ry="155" fill="url(#bananaLeaf)"/>
    <!-- Banana leaf veins -->
    <path d="M -240 0 L 240 0" stroke="#86EFAC" stroke-width="2" opacity="0.5"/>
    <path d="M -180 -120 L -60 0 M -60 0 L 60 -120 M 60 0 L 180 -120" stroke="#86EFAC" stroke-width="1.2" opacity="0.35"/>
    <path d="M -180 120 L -60 0 M -60 0 L 60 120 M 60 0 L 180 120" stroke="#86EFAC" stroke-width="1.2" opacity="0.35"/>

    <!-- GRAND CRISPY ROLLED DOSA -->
    <g transform="rotate(-8, 0, -25)">
      <!-- Shadow under dosa -->
      <ellipse cx="-10" cy="40" rx="220" ry="32" fill="#1E293B" opacity="0.4"/>
      
      <!-- Long Golden Crisp Roll Cylinder -->
      <path d="M -210 -10 
               C -210 -45, -180 -55, -120 -55
               L 150 -55
               C 210 -55, 230 -35, 230 -10
               C 230 25, 200 45, 140 45
               L -130 45
               C -190 45, -210 25, -210 -10
               Z" fill="url(#heroDosa)" stroke="#78350F" stroke-width="2.5"/>

      <!-- Golden Brown Roast Marks -->
      <ellipse cx="-80" cy="-15" rx="80" ry="22" fill="#78350F" opacity="0.45"/>
      <ellipse cx="40" cy="-5" rx="95" ry="24" fill="#92400E" opacity="0.4"/>
      <ellipse cx="120" cy="-18" rx="55" ry="18" fill="#78350F" opacity="0.5"/>
      <ellipse cx="-140" cy="8" rx="40" ry="14" fill="#B45309" opacity="0.6"/>
      
      <!-- Crispy Porous Texture Dots -->
      <circle cx="-50" cy="-2" r="5" fill="#451A03" opacity="0.5"/>
      <circle cx="10" cy="-18" r="6" fill="#451A03" opacity="0.5"/>
      <circle cx="80" cy="6" r="4.5" fill="#451A03" opacity="0.5"/>
      <circle cx="-110" cy="-10" r="4" fill="#451A03" opacity="0.5"/>
      <circle cx="140" cy="-10" r="5" fill="#451A03" opacity="0.4"/>

      <!-- Open Rolled Edge (Crunchy swirl) -->
      <ellipse cx="185" cy="-5" rx="26" ry="38" fill="#F59E0B" stroke="#92400E" stroke-width="3"/>
      <ellipse cx="185" cy="-5" rx="14" ry="22" fill="#78350F"/>
      <ellipse cx="185" cy="-5" rx="6" ry="10" fill="#451A03"/>
    </g>

    <!-- TRADITIONAL BOWLS OF CHUTNEYS & SAMBAR -->
    <!-- 1. Coconut Chutney Bowl -->
    <g transform="translate(-130, 75)">
      <circle cx="0" cy="0" r="36" fill="#E2E8F0" stroke="#94A3B8" stroke-width="3"/>
      <circle cx="0" cy="0" r="31" fill="#FFFFFF"/>
      <!-- Tadka / tempering -->
      <circle cx="-4" cy="-5" r="3" fill="#15803D"/>
      <circle cx="6" cy="4" r="2.5" fill="#15803D"/>
      <circle cx="2" cy="-7" r="2" fill="#B91C1C"/>
      <circle cx="-8" cy="6" r="1.5" fill="#1E293B"/>
      <path d="M 0 0 C 8 -10, 16 -3, 10 7 Z" fill="#16A34A" opacity="0.9"/>
    </g>

    <!-- 2. Rich Piping Hot Sambar Bowl -->
    <g transform="translate(0, 88)">
      <circle cx="0" cy="0" r="42" fill="#E2E8F0" stroke="#94A3B8" stroke-width="3"/>
      <circle cx="0" cy="0" r="37" fill="#C2410C"/>
      <circle cx="0" cy="0" r="30" fill="#EA580C" opacity="0.9"/>
      <!-- Drumstick / Coriander leaf -->
      <rect x="-10" y="-4" width="20" height="8" rx="3" fill="#15803D" opacity="0.85"/>
      <circle cx="8" cy="-12" r="3" fill="#FBBF24"/>
      <circle cx="-12" cy="8" r="3" fill="#78350F"/>
    </g>

    <!-- 3. Spicy Red Tomato & Garlic Chutney -->
    <g transform="translate(130, 75)">
      <circle cx="0" cy="0" r="36" fill="#E2E8F0" stroke="#94A3B8" stroke-width="3"/>
      <circle cx="0" cy="0" r="31" fill="#DC2626"/>
      <circle cx="0" cy="0" r="24" fill="#EF4444" opacity="0.9"/>
      <!-- Tadka -->
      <circle cx="4" cy="-4" r="2.5" fill="#1E293B"/>
      <circle cx="-5" cy="5" r="2.5" fill="#15803D"/>
      <circle cx="2" cy="7" r="1.8" fill="#1E293B"/>
    </g>
  </g>

  <!-- DOSIFY POUCH STANDING NEXT TO DOSA -->
  <g transform="translate(680, 80) scale(0.68)">
    <use href="#pouchGrad_Classic"/>
    ${createPouchSvg({ title: 'INSTANT DOSA', subtitle: 'BATTER MIX', variant: 'Classic', variantColor: '#F59E0B', packSize: '500g', dosaType: 'classic', accentBadge: 'Crispy & Golden' })}
  </g>
</svg>`;

fs.writeFileSync(path.join(__dirname, '../public/images/hero/hero-dosa-platter.svg'), heroSvg, 'utf8');

// Generate Recipe SVGs
const recipes = [
  { file: 'recipe-classic.svg', name: 'Classic Golden Dosa', tag: 'Breakfast Classic', time: '5 Mins', color: '#F59E0B' },
  { file: 'recipe-masala.svg', name: 'Mysore Masala Dosa', tag: 'Spicy Potato Roast', time: '10 Mins', color: '#EA580C' },
  { file: 'recipe-beetroot.svg', name: 'Ruby Beetroot Dosa', tag: 'Super Healthy', time: '7 Mins', color: '#E11D48' },
  { file: 'recipe-cheese.svg', name: 'Cheese Burst Dosa', tag: 'Kids Favorite', time: '6 Mins', color: '#FBBF24' }
];

recipes.forEach(r => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
    <defs>
      <linearGradient id="recGrad_${r.file.replace('.svg','')}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#1E293B"/>
        <stop offset="100%" stop-color="#0F172A"/>
      </linearGradient>
      <linearGradient id="foodGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FEF3C7"/>
        <stop offset="50%" stop-color="${r.color}"/>
        <stop offset="100%" stop-color="#78350F"/>
      </linearGradient>
    </defs>
    <rect width="600" height="400" rx="16" fill="url(#recGrad_${r.file.replace('.svg','')})"/>
    
    <!-- Food Presentation -->
    <g transform="translate(300, 180)">
      <ellipse cx="0" cy="40" rx="200" ry="80" fill="#334155" opacity="0.6"/>
      <ellipse cx="0" cy="30" rx="180" ry="70" fill="#14532D" opacity="0.8"/>
      <!-- Dosa -->
      <path d="M -140 10 C -140 -20, 140 -20, 140 10 C 140 40, -140 40, -140 10 Z" fill="url(#foodGrad)" stroke="#B45309" stroke-width="2"/>
      <circle cx="-60" cy="45" r="22" fill="#FFFFFF"/>
      <circle cx="60" cy="45" r="22" fill="#DC2626"/>
    </g>

    <!-- Recipe Title & Info -->
    <rect x="0" y="270" width="600" height="130" fill="#090D16" opacity="0.9"/>
    <text x="30" y="315" font-family="'Inter', sans-serif" font-weight="800" font-size="22" fill="#FFFFFF">${r.name}</text>
    <rect x="30" y="335" width="130" height="26" rx="13" fill="${r.color}"/>
    <text x="95" y="352" text-anchor="middle" font-family="'Inter', sans-serif" font-weight="700" font-size="12" fill="#0F172A">${r.tag}</text>
    <text x="540" y="352" text-anchor="end" font-family="'Inter', sans-serif" font-weight="600" font-size="14" fill="#94A3B8">⏱ ${r.time}</text>
  </svg>`;
  fs.writeFileSync(path.join(__dirname, '../public/images/recipes', r.file), svg, 'utf8');
});

console.log('All assets generated successfully!');
