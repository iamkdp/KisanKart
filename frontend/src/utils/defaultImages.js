const defaults = {
  rice:    'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&q=80',
  wheat:   'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&q=80',
  tomato:  'https://images.unsplash.com/photo-1518977822534-7049a61ee0c2?w=800&q=80',
  onion:   'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=800&q=80',
  potato:  'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800&q=80',
  corn:    'https://images.unsplash.com/photo-1601593768799-76e1de61f5b1?w=800&q=80',
  mango:   'https://images.unsplash.com/photo-1553279768-865429fa0078?w=800&q=80',
  banana:  'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=800&q=80',
  chilli:  'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=800&q=80',
    mirchi:  'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=800&q=80',
  default: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80',
}

export function getDefaultImage(cropName = '') {
  const key = cropName.toLowerCase()
  const match = Object.keys(defaults).find(k => key.includes(k))
  return match ? defaults[match] : defaults.default
}