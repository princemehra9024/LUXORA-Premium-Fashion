import type { Product, Category, Review } from '@/types';

// All Products
export const allProducts: Product[] = [
  // ========================
  // MEN'S PRODUCTS
  // ========================
  // T-shirts
  {
    id: 'ts-1',
    name: 'Essential Black Tee',
    price: 39.99,
    image: '/collection/4eamx3ek0wldsim959wry.png',
    category: 'T-shirts',
    gender: 'men',
    rating: 4.9,
    reviews: 512,
    isBestseller: true,
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'White', hex: '#ffffff' },
      { name: 'Grey', hex: '#808080' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Ultra-soft organic cotton t-shirt with a classic fit. Perfect for everyday wear.',
  },
  {
    id: 'ts-2',
    name: 'Charcoal Essential Tee',
    price: 39.99,
    image: '/collection/6rqgusfgornln6swudlfg.png',
    category: 'T-shirts',
    gender: 'men',
    rating: 4.8,
    reviews: 324,
    colors: [
      { name: 'Grey', hex: '#808080' },
      { name: 'Black', hex: '#000000' },
      { name: 'White', hex: '#ffffff' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Premium cotton blend t-shirt with a modern fit.',
  },
  {
    id: 'ts-3',
    name: 'Oversized White Tee',
    price: 44.99,
    image: '/collection/74koee9lbyom63v482ry_.png',
    category: 'T-shirts',
    gender: 'men',
    rating: 4.6,
    reviews: 189,
    isNew: true,
    colors: [
      { name: 'White', hex: '#ffffff' },
      { name: 'Black', hex: '#000000' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Relaxed oversized fit t-shirt for a contemporary street style look.',
  },
  // Hoodies
  {
    id: 'hd-1',
    name: 'Urban Edge Hoodie',
    price: 89.99,
    originalPrice: 119.99,
    image: '/collection/9axzrie8wlr8ehsortkno.png',
    category: 'Hoodies',
    gender: 'men',
    rating: 4.8,
    reviews: 124,
    isNew: true,
    colors: [
      { name: 'Grey', hex: '#808080' },
      { name: 'Black', hex: '#000000' },
      { name: 'White', hex: '#ffffff' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Premium cotton blend hoodie with a modern fit. Features kangaroo pocket, adjustable drawstring hood, and ribbed cuffs.',
  },
  {
    id: 'hd-2',
    name: 'Zip-Up Performance Hoodie',
    price: 99.99,
    image: '/collection/9pb-pcyrkxncliuuge-w0.png',
    category: 'Hoodies',
    gender: 'men',
    rating: 4.7,
    reviews: 67,
    isNew: true,
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Grey', hex: '#808080' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Athletic zip-up hoodie with moisture-wicking fabric.',
  },
  // Jackets
  {
    id: 'jk-1',
    name: 'Classic Denim Jacket',
    price: 149.99,
    originalPrice: 189.99,
    image: '/collection/ctay1lqnrw21o-ewq3vif.png',
    category: 'Jackets',
    gender: 'men',
    rating: 4.7,
    reviews: 89,
    colors: [
      { name: 'Navy', hex: '#1a3a5c' },
      { name: 'Black', hex: '#000000' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Timeless denim jacket with vintage wash. Features button closure and chest pockets.',
  },
  {
    id: 'jk-2',
    name: 'Leather Biker Jacket',
    price: 299.99,
    image: '/collection/dhkdoqvf8dwq0cfbvabyh.png',
    category: 'Jackets',
    gender: 'men',
    rating: 4.9,
    reviews: 34,
    isNew: true,
    colors: [
      { name: 'Black', hex: '#000000' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Premium genuine leather jacket with silver hardware.',
  },
  {
    id: 'jk-3',
    name: 'Camel Wool Coat',
    price: 349.99,
    image: '/collection/ffc8nbba36o8dk56wtaf3.png',
    category: 'Jackets',
    gender: 'men',
    rating: 4.8,
    reviews: 56,
    colors: [
      { name: 'Camel', hex: '#c4a77d' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Elegant long wool coat for sophisticated winter style.',
  },
  // Jeans & Pants
  {
    id: 'jn-1',
    name: 'Slim Fit Jeans',
    price: 79.99,
    image: '/collection/lg_dzkndmu4dp7uuve4tq.png',
    category: 'Jeans',
    gender: 'men',
    rating: 4.6,
    reviews: 378,
    isBestseller: true,
    colors: [
      { name: 'Navy', hex: '#1a3a5c' },
      { name: 'Black', hex: '#000000' }
    ],
    sizes: ['28', '30', '32', '34', '36'],
    description: 'Modern slim fit jeans with stretch comfort. Premium denim with subtle fading.',
  },
  {
    id: 'pt-1',
    name: 'Black Chino Pants',
    price: 69.99,
    image: '/collection/n8z3hbnvenqry_38prvlq.png',
    category: 'Pants',
    gender: 'men',
    rating: 4.5,
    reviews: 145,
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Grey', hex: '#808080' },
      { name: 'Navy', hex: '#1a3a5c' }
    ],
    sizes: ['30', '32', '34', '36'],
    description: 'Classic chino pants with a tailored fit. Perfect for smart casual occasions.',
  },
  {
    id: 'pt-2',
    name: 'Olive Cargo Pants',
    price: 89.99,
    image: '/collection/qg6xq6rs53cp9bf_wjt5g.png',
    category: 'Pants',
    gender: 'men',
    rating: 4.7,
    reviews: 98,
    isNew: true,
    colors: [
      { name: 'Olive', hex: '#556b2f' },
      { name: 'Black', hex: '#000000' }
    ],
    sizes: ['30', '32', '34', '36', '38'],
    description: 'Utility cargo pants with multiple pockets and durable fabric.',
  },
  // Shirts
  {
    id: 'sh-1',
    name: 'Navy Formal Shirt',
    price: 79.99,
    image: '/collection/umzqhmr9gnvgai5b8lu4h.png',
    category: 'Shirts',
    gender: 'men',
    rating: 4.8,
    reviews: 234,
    colors: [
      { name: 'Navy', hex: '#1a3a5c' },
      { name: 'White', hex: '#ffffff' },
      { name: 'Black', hex: '#000000' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Premium cotton formal shirt with crisp collar and perfect drape.',
  },
  {
    id: 'sh-2',
    name: 'White Linen Shirt',
    price: 89.99,
    image: '/collection/upioup18d63gy5aqpgmej.png',
    category: 'Shirts',
    gender: 'men',
    rating: 4.7,
    reviews: 178,
    isNew: true,
    colors: [
      { name: 'White', hex: '#ffffff' },
      { name: 'Beige', hex: '#c4a77d' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Breathable linen shirt for summer elegance. Relaxed fit with rolled sleeves.',
  },
  // Sweaters
  {
    id: 'sw-1',
    name: 'Burgundy Knit Sweater',
    price: 119.99,
    image: '/collection/uvqoy4jwzohtdkjryup4g.png',
    category: 'Sweaters',
    gender: 'men',
    rating: 4.7,
    reviews: 156,
    isBestseller: true,
    colors: [
      { name: 'Burgundy', hex: '#800020' },
      { name: 'Black', hex: '#000000' },
      { name: 'Grey', hex: '#808080' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Soft merino wool blend sweater with ribbed cuffs and hem.',
  },
  // Footwear
  {
    id: 'fw-1',
    name: 'White Minimalist Sneakers',
    price: 129.99,
    image: '/collection/ux2pn_ocp_lkx29w1ie9r.png',
    category: 'Shoes',
    gender: 'men',
    rating: 4.9,
    reviews: 312,
    isBestseller: true,
    colors: [
      { name: 'White', hex: '#ffffff' },
      { name: 'Black', hex: '#000000' }
    ],
    sizes: ['8', '9', '10', '11', '12'],
    description: 'Clean, minimalist leather sneakers for everyday style.',
  },
  {
    id: 'fw-2',
    name: 'Black Oxford Shoes',
    price: 199.99,
    image: '/collection/vlwjisqabyunlsfk-gefw.png',
    category: 'Shoes',
    gender: 'men',
    rating: 4.8,
    reviews: 89,
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Brown', hex: '#8b4513' }
    ],
    sizes: ['8', '9', '10', '11', '12'],
    description: 'Polished leather oxford shoes for formal occasions.',
  },
  {
    id: 'fw-3',
    name: 'Brown Leather Boots',
    price: 179.99,
    image: '/collection/wfnzqob9v9whj4lffdyr8.png',
    category: 'Shoes',
    gender: 'men',
    rating: 4.7,
    reviews: 134,
    isNew: true,
    colors: [
      { name: 'Brown', hex: '#8b4513' },
      { name: 'Black', hex: '#000000' }
    ],
    sizes: ['8', '9', '10', '11', '12'],
    description: 'Durable leather boots with comfortable sole and ankle support.',
  },
  // Accessories
  {
    id: 'ac-1',
    name: 'Brown Leather Belt',
    price: 49.99,
    image: '/collection/yy-wfmf8cuod6uhz9ubyp.png',
    category: 'Accessories',
    gender: 'men',
    rating: 4.6,
    reviews: 267,
    colors: [
      { name: 'Brown', hex: '#8b4513' },
      { name: 'Black', hex: '#000000' }
    ],
    sizes: ['32', '34', '36', '38'],
    description: 'Genuine leather belt with polished silver buckle.',
  },
  {
    id: 'ac-2',
    name: 'Black Canvas Backpack',
    price: 129.99,
    image: '/collection/za-pn8gjxtqg3q5ydnisw.png',
    category: 'Accessories',
    gender: 'unisex',
    rating: 4.8,
    reviews: 189,
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Grey', hex: '#808080' }
    ],
    sizes: ['One Size'],
    description: 'Water-resistant canvas backpack with leather accents and laptop compartment.',
  },
  {
    id: 'ac-3',
    name: 'Black Leather Wallet',
    price: 59.99,
    image: '/collection/zwqk0_4_zmix82sno5zj1.png',
    category: 'Accessories',
    gender: 'men',
    rating: 4.7,
    reviews: 423,
    isBestseller: true,
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Brown', hex: '#8b4513' }
    ],
    sizes: ['One Size'],
    description: 'Premium leather bifold wallet with multiple card slots.',
  },
  {
    id: 'ac-4',
    name: 'Aviator Sunglasses',
    price: 149.99,
    image: '/collection/4eamx3ek0wldsim959wry.png',
    category: 'Accessories',
    gender: 'unisex',
    rating: 4.9,
    reviews: 156,
    isNew: true,
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Silver', hex: '#c0c0c0' }
    ],
    sizes: ['One Size'],
    description: 'Classic aviator sunglasses with UV protection and metal frames.',
  },

  // ========================
  // WOMEN'S PRODUCTS
  // ========================
  // Dresses
  {
    id: 'wd-1',
    name: 'Silk Midi Dress',
    price: 189.99,
    image: '/collection/6rqgusfgornln6swudlfg.png',
    category: 'Dresses',
    gender: 'women',
    rating: 4.9,
    reviews: 287,
    isBestseller: true,
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Burgundy', hex: '#800020' },
      { name: 'Navy', hex: '#1a3a5c' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Luxurious silk midi dress with a flattering A-line silhouette. Perfect for evening occasions.',
  },
  {
    id: 'wd-2',
    name: 'Floral Wrap Dress',
    price: 129.99,
    image: '/collection/74koee9lbyom63v482ry_.png',
    category: 'Dresses',
    gender: 'women',
    rating: 4.7,
    reviews: 198,
    isNew: true,
    colors: [
      { name: 'Pink', hex: '#ffb6c1' },
      { name: 'White', hex: '#ffffff' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Romantic floral wrap dress with flutter sleeves and adjustable tie waist.',
  },
  {
    id: 'wd-3',
    name: 'Little Black Dress',
    price: 159.99,
    originalPrice: 199.99,
    image: '/collection/models/model-front.png',
    images: ['/collection/models/model-front.png', '/collection/models/model-back.png'],
    category: 'Dresses',
    gender: 'women',
    rating: 4.8,
    reviews: 342,
    isBestseller: true,
    colors: [
      { name: 'Black', hex: '#000000' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Timeless LBD with a modern twist. Fitted bodice and flared skirt.',
  },
  // Tops & Blouses
  {
    id: 'wb-1',
    name: 'Satin Blouse',
    price: 79.99,
    image: '/collection/9pb-pcyrkxncliuuge-w0.png',
    category: 'Blouses',
    gender: 'women',
    rating: 4.6,
    reviews: 167,
    colors: [
      { name: 'White', hex: '#ffffff' },
      { name: 'Pink', hex: '#ffb6c1' },
      { name: 'Black', hex: '#000000' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Elegant satin blouse with a feminine bow detail at the neckline.',
  },
  {
    id: 'wt-1',
    name: 'Cropped Knit Top',
    price: 49.99,
    image: '/collection/ctay1lqnrw21o-ewq3vif.png',
    category: 'Tops',
    gender: 'women',
    rating: 4.5,
    reviews: 234,
    isNew: true,
    colors: [
      { name: 'White', hex: '#ffffff' },
      { name: 'Pink', hex: '#ffb6c1' },
      { name: 'Beige', hex: '#c4a77d' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Soft cropped knit top with relaxed fit. Perfect for layering.',
  },
  {
    id: 'wt-2',
    name: 'Silk Camisole',
    price: 69.99,
    image: '/collection/dhkdoqvf8dwq0cfbvabyh.png',
    category: 'Tops',
    gender: 'women',
    rating: 4.8,
    reviews: 189,
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Beige', hex: '#c4a77d' },
      { name: 'Burgundy', hex: '#800020' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Delicate silk camisole with lace trim. A versatile wardrobe essential.',
  },
  // Skirts
  {
    id: 'ws-1',
    name: 'Pleated Midi Skirt',
    price: 89.99,
    image: '/collection/ffc8nbba36o8dk56wtaf3.png',
    category: 'Skirts',
    gender: 'women',
    rating: 4.7,
    reviews: 145,
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Beige', hex: '#c4a77d' },
      { name: 'Navy', hex: '#1a3a5c' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Elegant pleated midi skirt with a high waist. Flows beautifully when walking.',
  },
  {
    id: 'ws-2',
    name: 'Leather Mini Skirt',
    price: 109.99,
    image: '/collection/lg_dzkndmu4dp7uuve4tq.png',
    category: 'Skirts',
    gender: 'women',
    rating: 4.6,
    reviews: 98,
    isNew: true,
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Burgundy', hex: '#800020' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Edgy faux leather mini skirt with a sleek silhouette.',
  },
  // Women's Jackets
  {
    id: 'wj-1',
    name: 'Tailored Blazer',
    price: 199.99,
    image: '/collection/n8z3hbnvenqry_38prvlq.png',
    category: 'Jackets',
    gender: 'women',
    rating: 4.9,
    reviews: 178,
    isBestseller: true,
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Beige', hex: '#c4a77d' },
      { name: 'White', hex: '#ffffff' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Perfectly tailored blazer with structured shoulders and a cinched waist.',
  },
  {
    id: 'wj-2',
    name: 'Puffer Jacket',
    price: 179.99,
    originalPrice: 229.99,
    image: '/collection/qg6xq6rs53cp9bf_wjt5g.png',
    category: 'Jackets',
    gender: 'women',
    rating: 4.7,
    reviews: 112,
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'White', hex: '#ffffff' },
      { name: 'Pink', hex: '#ffb6c1' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Lightweight yet warm puffer jacket with a chic cropped design.',
  },
  // Women's Jeans
  {
    id: 'wjn-1',
    name: 'High-Waist Skinny Jeans',
    price: 89.99,
    image: '/collection/umzqhmr9gnvgai5b8lu4h.png',
    category: 'Jeans',
    gender: 'women',
    rating: 4.8,
    reviews: 456,
    isBestseller: true,
    colors: [
      { name: 'Navy', hex: '#1a3a5c' },
      { name: 'Black', hex: '#000000' }
    ],
    sizes: ['24', '26', '28', '30', '32'],
    description: 'Flattering high-waist skinny jeans with super stretch comfort.',
  },
  {
    id: 'wjn-2',
    name: 'Wide Leg Palazzo Jeans',
    price: 99.99,
    image: '/collection/upioup18d63gy5aqpgmej.png',
    category: 'Jeans',
    gender: 'women',
    rating: 4.6,
    reviews: 134,
    isNew: true,
    colors: [
      { name: 'Navy', hex: '#1a3a5c' },
      { name: 'White', hex: '#ffffff' }
    ],
    sizes: ['24', '26', '28', '30', '32'],
    description: 'Trendy wide-leg palazzo jeans with a relaxed vintage vibe.',
  },
  // Women's Shoes
  {
    id: 'wfw-1',
    name: 'Strappy Heeled Sandals',
    price: 159.99,
    image: '/collection/uvqoy4jwzohtdkjryup4g.png',
    category: 'Heels',
    gender: 'women',
    rating: 4.7,
    reviews: 201,
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Beige', hex: '#c4a77d' },
      { name: 'Burgundy', hex: '#800020' }
    ],
    sizes: ['5', '6', '7', '8', '9'],
    description: 'Elegant strappy heeled sandals perfect for special occasions.',
  },
  {
    id: 'wfw-2',
    name: 'Classic Pointed Pumps',
    price: 139.99,
    image: '/collection/ux2pn_ocp_lkx29w1ie9r.png',
    category: 'Heels',
    gender: 'women',
    rating: 4.8,
    reviews: 267,
    isBestseller: true,
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Burgundy', hex: '#800020' },
      { name: 'Beige', hex: '#c4a77d' }
    ],
    sizes: ['5', '6', '7', '8', '9'],
    description: 'Timeless pointed-toe pumps with a comfortable mid-height heel.',
  },
  {
    id: 'wfw-3',
    name: 'Platform Sneakers',
    price: 119.99,
    image: '/collection/vlwjisqabyunlsfk-gefw.png',
    category: 'Sneakers',
    gender: 'women',
    rating: 4.6,
    reviews: 189,
    isNew: true,
    colors: [
      { name: 'White', hex: '#ffffff' },
      { name: 'Pink', hex: '#ffb6c1' }
    ],
    sizes: ['5', '6', '7', '8', '9'],
    description: 'Trendy platform sneakers with chunky sole and premium comfort.',
  },
  // Women's Accessories
  {
    id: 'wac-1',
    name: 'Quilted Chain Handbag',
    price: 249.99,
    image: '/collection/wfnzqob9v9whj4lffdyr8.png',
    category: 'Handbags',
    gender: 'women',
    rating: 4.9,
    reviews: 312,
    isBestseller: true,
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Beige', hex: '#c4a77d' },
      { name: 'Burgundy', hex: '#800020' }
    ],
    sizes: ['One Size'],
    description: 'Luxurious quilted handbag with gold chain strap. Icon of elegance.',
  },
  {
    id: 'wac-2',
    name: 'Leather Tote Bag',
    price: 189.99,
    image: '/collection/yy-wfmf8cuod6uhz9ubyp.png',
    category: 'Handbags',
    gender: 'women',
    rating: 4.7,
    reviews: 178,
    colors: [
      { name: 'Beige', hex: '#c4a77d' },
      { name: 'Black', hex: '#000000' },
      { name: 'Burgundy', hex: '#800020' }
    ],
    sizes: ['One Size'],
    description: 'Spacious leather tote bag for work and weekend. Premium craftsmanship.',
  },
  {
    id: 'wac-3',
    name: 'Gold Layered Necklace',
    price: 79.99,
    image: '/collection/za-pn8gjxtqg3q5ydnisw.png',
    category: 'Jewelry',
    gender: 'women',
    rating: 4.8,
    reviews: 234,
    isNew: true,
    colors: [
      { name: 'Silver', hex: '#c0c0c0' },
      { name: 'Gold', hex: '#c4a77d' }
    ],
    sizes: ['One Size'],
    description: 'Delicate layered necklace set in 18k gold plated finish.',
  },
  // Extra Men Products
  {
    id: 'ts-4',
    name: 'Vintage Graphic Tee',
    price: 34.99,
    image: '/collection/4eamx3ek0wldsim959wry.png',
    category: 'T-shirts',
    gender: 'men',
    rating: 4.5,
    reviews: 112,
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'White', hex: '#ffffff' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Soft cotton tee with vintage-inspired graphic print.',
  },
  {
    id: 'pt-3',
    name: 'Khaki Cargo Shorts',
    price: 45.99,
    image: '/collection/qg6xq6rs53cp9bf_wjt5g.png',
    category: 'Pants',
    gender: 'men',
    rating: 4.6,
    reviews: 89,
    colors: [
      { name: 'Khaki', hex: '#c3b091' }
    ],
    sizes: ['30', '32', '34', '36'],
    description: 'Comfortable cargo shorts with multiple pockets for summer.',
  },
  // Extra Women Products
  {
    id: 'wt-3',
    name: 'Summer Linen Romper',
    price: 85.99,
    image: '/collection/74koee9lbyom63v482ry_.png',
    category: 'Tops',
    gender: 'women',
    rating: 4.8,
    reviews: 215,
    isNew: true,
    colors: [
      { name: 'Pink', hex: '#ffb6c1' },
      { name: 'White', hex: '#ffffff' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Lightweight linen romper perfect for warm weather.',
  },
  {
    id: 'wj-3',
    name: 'Knit Checkered Cardigan',
    price: 75.99,
    image: '/collection/9axzrie8wlr8ehsortkno.png',
    category: 'Jackets',
    gender: 'women',
    rating: 4.7,
    reviews: 142,
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'White', hex: '#ffffff' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Cozy oversized knit cardigan in a classic checkered pattern.',
  },
];

// Gender filters
export const menProducts = allProducts.filter(p => p.gender === 'men' || p.gender === 'unisex');
export const womenProducts = allProducts.filter(p => p.gender === 'women' || p.gender === 'unisex');

// Featured Products
export const featuredProducts = allProducts.filter(p => 
  ['ts-1', 'hd-1', 'jk-1', 'jn-1'].includes(p.id)
);

// Trending Products
export const trendingProducts = allProducts.filter(p => 
  ['hd-1', 'fw-1', 'jk-1', 'ts-2'].includes(p.id)
);

// New Arrivals
export const newArrivals = allProducts.filter(p => p.isNew);

// Best Sellers
export const bestSellers = allProducts.filter(p => p.isBestseller);

// Men's Categories
export const menCategories: Category[] = [
  { id: 'mcat-1', name: 'T-shirts', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=400&fit=crop', productCount: menProducts.filter(p => p.category === 'T-shirts').length, gender: 'men' },
  { id: 'mcat-2', name: 'Hoodies', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=400&fit=crop', productCount: menProducts.filter(p => p.category === 'Hoodies').length, gender: 'men' },
  { id: 'mcat-3', name: 'Jackets', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=400&fit=crop', productCount: menProducts.filter(p => p.category === 'Jackets').length, gender: 'men' },
  { id: 'mcat-4', name: 'Jeans', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=400&fit=crop', productCount: menProducts.filter(p => p.category === 'Jeans').length, gender: 'men' },
  { id: 'mcat-5', name: 'Shirts', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=400&fit=crop', productCount: menProducts.filter(p => p.category === 'Shirts').length, gender: 'men' },
  { id: 'mcat-6', name: 'Shoes', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=400&fit=crop', productCount: menProducts.filter(p => p.category === 'Shoes').length, gender: 'men' },
  { id: 'mcat-7', name: 'Accessories', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=400&fit=crop', productCount: menProducts.filter(p => p.category === 'Accessories' && (p.gender === 'men' || p.gender === 'unisex')).length, gender: 'men' },
];

// Women's Categories
export const womenCategories: Category[] = [
  { id: 'wcat-1', name: 'Dresses', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=400&fit=crop', productCount: womenProducts.filter(p => p.category === 'Dresses').length, gender: 'women' },
  { id: 'wcat-2', name: 'Blouses', image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&h=400&fit=crop', productCount: womenProducts.filter(p => p.category === 'Blouses').length, gender: 'women' },
  { id: 'wcat-3', name: 'Tops', image: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=600&h=400&fit=crop', productCount: womenProducts.filter(p => p.category === 'Tops').length, gender: 'women' },
  { id: 'wcat-4', name: 'Skirts', image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0afe0?w=600&h=400&fit=crop', productCount: womenProducts.filter(p => p.category === 'Skirts').length, gender: 'women' },
  { id: 'wcat-5', name: 'Jackets', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=400&fit=crop', productCount: womenProducts.filter(p => p.category === 'Jackets' && p.gender === 'women').length, gender: 'women' },
  { id: 'wcat-6', name: 'Jeans', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&h=400&fit=crop', productCount: womenProducts.filter(p => p.category === 'Jeans' && p.gender === 'women').length, gender: 'women' },
  { id: 'wcat-7', name: 'Heels', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&h=400&fit=crop', productCount: womenProducts.filter(p => p.category === 'Heels').length, gender: 'women' },
  { id: 'wcat-8', name: 'Handbags', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=400&fit=crop', productCount: womenProducts.filter(p => p.category === 'Handbags').length, gender: 'women' },
  { id: 'wcat-9', name: 'Jewelry', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=400&fit=crop', productCount: womenProducts.filter(p => p.category === 'Jewelry').length, gender: 'women' },
];

// All categories (original)
export const categories: Category[] = [
  { id: 'cat-1', name: 'T-shirts', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=400&fit=crop', productCount: allProducts.filter(p => p.category === 'T-shirts').length },
  { id: 'cat-2', name: 'Hoodies', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=400&fit=crop', productCount: allProducts.filter(p => p.category === 'Hoodies').length },
  { id: 'cat-3', name: 'Jackets', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=400&fit=crop', productCount: allProducts.filter(p => p.category === 'Jackets').length },
  { id: 'cat-4', name: 'Jeans', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=400&fit=crop', productCount: allProducts.filter(p => p.category === 'Jeans').length },
  { id: 'cat-5', name: 'Shirts', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=400&fit=crop', productCount: allProducts.filter(p => p.category === 'Shirts').length },
  { id: 'cat-6', name: 'Shoes', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=400&fit=crop', productCount: allProducts.filter(p => p.category === 'Shoes').length },
  { id: 'cat-7', name: 'Accessories', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=400&fit=crop', productCount: allProducts.filter(p => p.category === 'Accessories').length },
];

// Reviews
export const reviews: Review[] = [
  {
    id: 'r-1',
    name: 'Marcus Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    rating: 5,
    comment: 'Amazing quality! The fabric feels premium and the fit is perfect. Will definitely be ordering more.',
    date: '2024-03-01',
    verified: true,
  },
  {
    id: 'r-2',
    name: 'James Wilson',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    rating: 5,
    comment: 'Fast shipping and excellent customer service. The hoodie exceeded my expectations!',
    date: '2024-02-28',
    verified: true,
  },
  {
    id: 'r-3',
    name: 'David Park',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    rating: 4,
    comment: 'Great style and comfortable fit. The attention to detail is impressive. Highly recommend!',
    date: '2024-02-25',
    verified: true,
  },
];

// Navigation items
export const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Men', href: '/men' },
  { label: 'Women', href: '/women' },
  { label: 'Shop', href: '/shop' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];
