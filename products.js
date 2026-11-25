// Product catalog for VisionX Smart Glasses
// Each product has: id, name, price, category, rating, image, variant options

const products = [
  {
    id: 'visionx-pro',
    name: 'VisionX Pro',
    price: 299,
    category: 'smart',
    rating: 4.9,
    reviews: 248,
    image: 'https://via.placeholder.com/600x600/1F2937/FFFFFF?text=VisionX+Pro',
    colors: ['#1a1a1a', '#C0C0C0', '#191970'],
    variants: ['Black', 'Silver', 'Blue'],
    features: ['AI Assistant', 'Real-Time Translation', 'Voice Control', 'AR Display', 'All-Day Battery'],
    description: 'The flagship smart glasses with all premium features.\n    AI-powered assistant, real-time translation in 50 languages,\n    voice control, augmented reality display, and 48-hour battery life.'
  },
  {
    id: 'visionx-lite',
    name: 'VisionX Lite',
    price: 199,
    category: 'smart',
    rating: 4.7,
    reviews: 182,
    image: 'https://via.placeholder.com/600x600/3B82F6/FFFFFF?text=VisionX+Lite',
    colors: ['#EF4444', '#FBBF24'],
    variants: ['Red', 'Yellow'],
    features: ['AI Assistant', 'Voice Control', 'All-Day Battery'],
    description: 'Essential smart glasses with core AI features.\n    Voice control, AI assistant, and 36-hour battery life at an affordable price.'
  },
  {
    id: 'visionx-ar',
    name: 'VisionX AR',
    price: 499,
    category: 'ar',
    rating: 5.0,
    reviews: 87,
    image: 'https://via.placeholder.com/600x600/059669/FFFFFF?text=VisionX+AR',
    colors: ['#0891B2', '#67E8F9'],
    variants: ['Cyan', 'Sky'],
    features: ['AR Display', 'Spatial Audio', 'Gesture Control'],
    description: 'Augmented reality glasses with immersive display.\n    Full-color AR overlay, spatial audio, gesture controls,\n    and 6-hour continuous use.'
  },
  {
    id: 'visionx-case',
    name: 'Premium Case',
    price: 49,
    category: 'accessories',
    rating: 4.8,
    reviews: 63,
    image: 'https://via.placeholder.com/400x400/EF4444/FFFFFF?text=Case',
    colors: ['#1F2937'],
    variants: ['Black'],
    features: ['MagSafe Compatible', 'Rugged Protection', 'Card Slot'],
    description: 'Premium carrying case for VisionX glasses.\n    MagSafe charging, military-grade drop protection,\n    and slim card slot design.'
  }
];

export default products;
