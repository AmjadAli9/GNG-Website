
/* =========================================================
   GNG EXOTIC COLLECTIONS — PRODUCT CATALOGUE
   26 Products | Updated with actual uploaded product photos

   Image folder:
   public/images/products/

   Prices and stock are SAMPLE values.
   Replace with actual prices and inventory before launch.

   Add future products using unique product IDs.
   ========================================================= */

const PRODUCTS = [

  // ===================== HIJABS =====================

  {
    id: 'h01',
    category: 'Hijabs',
    type: 'Georgette',
    name: 'Premium Georgette Hijab',
    price: 399,
    description: 'Lightweight georgette with a graceful drape. A versatile choice for everyday and occasion styling.',
    image:"/public/images/Premium Georgette Hijab.jpeg",
    colours: [
      ['Plum', '#6d35a8', 12],
      ['Black', '#202027', 18],
      ['Ivory', '#eee8dd', 10],
      ['Mauve', '#ad8bc4', 8]
    ]
  },

  {
    id: 'h02',
    category: 'Hijabs',
    type: 'Georgette shimmer party wear',
    name: 'Georgette Shimmer Hijab with Tassels',
    price: 599,
    description: 'Crinkled shimmer texture with a subtle sparkle and decorative tassel finish. The photographed shade range includes turquoise blue, black, blush pink and charcoal grey.',
    image:"/public/images/George shimmer.jpg",
    colours: [
      ['Turquoise Blue', '#269dbb', 8],
      ['Black', '#17171b', 8],
      ['Blush Pink', '#d99caf', 7],
      ['Charcoal Grey', '#777b80', 6],
      ['Deep Black', '#101014', 5]
    ]
  },

  {
    id: 'h03',
    category: 'Hijabs',
    type: 'Satin Floral printed',
    name: 'Satin Floral Print Hijab',
    price: 499,
    description: 'Smooth satin feel with a delicate floral print.', 
     image:"/public/images/Satin Floral Print.jpeg",
    colours: [
      ['Rose', '#c9879c', 8],
      ['Ivory', '#eee8dd', 7],
      ['Navy', '#253b65', 6]
    ]
  },

  {
    id: 'h04',
    category: 'Hijabs',
    type: 'Organza',
    name: 'Elegant Organza Hijab',
    price: 549,
    description: 'Airy organza texture for a polished layered look.', 
     image:"/public/images/Organza ombre party wear 1.jpeg",
    colours: [
      ['Champagne', '#d8c59d', 6],
      ['Black', '#202027', 7],
      ['Mauve', '#ad8bc4', 5]
    ]
  },

  {
    id: 'h05',
    category: 'Hijabs',
    type: 'Crinkle cotton',
    name: 'Crinkle Cotton Hijab with Tassels',
    price: 299,
    description: 'Soft crinkle cotton with a naturally textured finish and matching tassel edges. The photos show mocha taupe, warm beige, ivory, soft white and blush-cream shades.',
     image:"/public/images/Crinkle cotton with tassels 1.jpeg",
    colours: [

                             
      ['Mocha Taupe', '#927b6b', 12],
      ['Warm Beige', '#b39a7e', 12],
      ['Ivory', '#eee9dd', 14],
      ['Soft White', '#f5f1e8', 14],
      ['Blush Cream', '#e8d5ce', 10]
    ]
  },

  {
    id: 'h06',
    category: 'Hijabs',
    type: 'Chiffon',
    name: 'Classic Chiffon Hijab — Soft Shades',
    price: 329,
    description: 'Light, flowing chiffon for versatile styling. Actual photographed shades include peach blush, taupe, mint green, stone grey, ivory, caramel mustard, sky blue, olive green and aqua.',
  image:"/public/images/chiffon shades.jpeg",
    colours: [
      ['Peach Blush', '#e9c2b2', 12],
      ['Taupe', '#a28d82', 12],
      ['Mint Green', '#a9dfcb', 12],
      ['Stone Grey', '#b7b4b0', 10],
      ['Ivory', '#eee9df', 12],
      ['Caramel Mustard', '#c99a4e', 8],
      ['Sky Blue', '#80c7e5', 12],
      ['Olive Green', '#557b42', 10],
      ['Aqua', '#8acbc9', 8]
    ]
  },

  {
    id: 'h07',
    category: 'Hijabs',
    type: 'Stone-Work Party Hijab',
    name: 'Stone-Work Party Hijab',
    price: 799,
    description: 'Decorative stone details for festive and party wear.',
     image:"/public/images/Georgette with diamond stone work 1.jpeg",
    colours: [
      ['Black', '#202027', 5],
      ['Silver', '#b9bbc4', 4],
      ['Plum', '#6d35a8', 3]
    ]
  },

  {
    id: 'h08',
    category: 'Hijabs',
    type: 'Malaysian chiffon',
    name: 'Malaysian Chiffon Hijab',
    price: 449,
    description: 'Soft chiffon with a refined, smooth finish.',
     image:"/public/images/Malaysian Chiffon Hijab.jpeg",
    colours: [
      ['Dusty Rose', '#c9879c', 7],
      ['Grey', '#85858c', 8],
      ['Teal', '#438c8a', 6]
    ]
  },

  {
    id: 'h09',
    category: 'Hijabs',
    type: 'Modal cotton',
    name: 'Modal Cotton Hijab',
    price: 449,
    description: 'Soft-touch modal cotton for effortless daily comfort.',
     image:"/public/images/Premium Modal cottonb 1.jpeg",
    colours: [
      ['Mauve', '#ad8bc4', 8],
      ['Nude', '#c9a58c', 9],
      ['Navy', '#253b65', 7]
    ]
  },

  {
    id: 'h10',
    category: 'Hijabs',
    type: 'Premium Bamboo Jersey',
    name: 'Premium Bamboo Jersey Hijab',
    price: 599,
    description: 'Stretchy, soft jersey with a comfortable secure feel.',
     image:"/public/images/Premium Bamboo Jersey Hijab.jpg",
    colours: [
      ['Black', '#202027', 10],
      ['Mocha', '#725440', 8],
      ['Stone', '#aaa49c', 7]
    ]
  },

  {
    id: 'h11',
    category: 'Hijabs',
    type: 'Pure Cotton',
    name: 'Pure Cotton Hijab',
    price: 279,
    description: 'Breathable cotton for simple everyday styling.',
     image:"/public/images/Soft Computer cotton 1.jpeg",
    colours: [
      ['White', '#f4f1eb', 15],
      ['Black', '#202027', 18],
      ['Olive', '#73744c', 12]
    ]
  },

  {
    id: 'h12',
    category: 'Hijabs',
    type: 'Velvet satin',
    name: 'Velvet Satin Hijab',
    price: 649,
    description: 'A rich finish for elevated evening and occasion looks.',
     image:"/public/images/Satin embossed marble print 1.jpeg",
    colours: [
      ['Maroon', '#722d43', 5],
      ['Emerald', '#28644e', 4],
      ['Black', '#202027', 6]
    ]
  },

  {
    id: 'h13',
    category: 'Hijabs',
    type: 'Tissue ombre',
    name: 'Tissue Ombre Hijab',
    price: 699,
    description: 'A subtle ombre effect with a festive tissue finish.',
     image:"/public/images/Organza ombre party wear 1.jpeg",
    colours: [
      ['Rose Gold', '#c58e80', 4],
      ['Champagne', '#d8c59d', 5],
      ['Plum', '#6d35a8', 3]
    ]
  },

  {
    id: 'h14',
    category: 'Hijabs',
    type: 'Chiffon satin print',
    name: 'Chiffon Satin Print Hijab',
    price: 499,
    description: 'A beautiful printed blend for a softly polished look.',
     image:"/public/images/Satin embossed marble print 1.jpeg",
    colours: [
      ['Blush', '#d7a2ad', 7],
      ['Blue', '#557da4', 6],
      ['Olive', '#73744c', 5]
    ]
  },
{
    id: 'h15',
    category: 'Hijabs',
    type: 'Tissue with glitter shine party wear',
    name: 'Tissue with glitter shine',
    price: 799,
    description: 'A beautiful printed blend for a softly polished look.',
     image:"/public/images/Tissue with glitter shine party wear 1.jpeg",
    colours: [
      ['Blush', '#d7a2ad', 7],
      ['Blue', '#557da4', 6],
      ['Olive', '#73744c', 5]
    ]
  },
  {
    id: 'h16',
    category: 'Hijabs',
    type: 'Ribbed chiffon',
    name: 'Ribbed chiffon',
    price: 699,
    description: 'A Textured chiffon with a unique ribbed finish.',
     image:"/public/images/Ribbed chiffon 1.jpeg",
    colours: [
      ['Blush', '#d7a2ad', 7],
      ['Blue', '#557da4', 6],
      ['Olive', '#73744c', 5]
    ]
  },
  {
    id: 'h17',
    category: 'Hijabs',
    type: 'Premium chiffon nude shadesn',
    name: 'chiffon nude shadesn',
    price: 1299,
    description: 'A Textured chiffon with a unique ribbed finish.',
     image:"/public/images/Premium chiffon nude shades 1.jpeg",
    colours: [
      ['Blush', '#d7a2ad', 7],
      ['Blue', '#557da4', 6],
      ['green', '#73744c', 5]
    ]
  },
  {
    id: 'h18',
    category: 'Hijabs',
    type: 'Premium Bubble chiffon',
    name: 'Bubble chiffon',
    price: 1199,
    description: 'A Textured chiffon with a unique ribbed finish.',
     image:"/public/images/Premium Bubble chiffon 1.jpeg",
    colours: [
      ['Blush', '#d7a2ad', 7],
      ['Blue', '#557da4', 6],
      ['green', '#73744c', 5]
    ]
  },
  {
    id: 'h19',
    category: 'Hijabs',
    type: 'Party wear chiffon shimmer',
    name: 'chiffon shimmer',
    price: 999,
    description: 'A Textured chiffon with a unique ribbed finish.',
     image:"/public/images/Party wear chiffon shimmer 3.jpeg",
    colours: [
      ['Blush', '#d7a2ad', 7],
      ['Blue', '#557da4', 6],
      ['green', '#73744c', 5]
    ]
  },
    {
    id: 'h20',
    category: 'Hijabs',
    type: 'Shimmer party wear',
    name: 'Shimmer party wear',
    price: 999,
    description: 'A Textured chiffon with a unique ribbed finish.',
     image:"/public/images/Shimmer party wear 1.jpeg",
    colours: [
      ['Blush', '#d7a2ad', 7],
      ['Blue', '#557da4', 6],
      ['green', '#73744c', 5]
    ]
  },
   {
    id: 'h21',
    category: 'Hijabs',
    type: 'Premium party wear branded',
    name: 'Premium party wear ',
    price: 1399,
    description: 'A Textured chiffon with a unique ribbed finish.',
     image:"/public/images/Premium party wear branded 3.jpeg",
    colours: [
      ['Blush', '#d7a2ad', 7],
      ['Blue', '#557da4', 6],
      ['green', '#73744c', 5]
    ]
  },
    {
    id: 'h22',
    category: 'Hijabs',
    type: 'Muna chiffon party wear',
    name: 'Muna chiffon',
    price: 699,
    description: 'A Textured chiffon with a unique ribbed finish.',
     image:"/public/images/Muna chiffon party wear 1.jpeg",
    colours: [
      ['Blush', '#d7a2ad', 7],
      ['Blue', '#557da4', 6],
      ['green', '#73744c', 5]
    ]
  },

  // ===================== NIQAB =====================

  {
    id: 'n01',
    category: 'Niqab',
    type: 'Niqab',
    name: 'Everyday Soft Niqab',
    price: 199,
    description: 'Lightweight face covering with a comfortable tie-back.',
     image:"/public/images/Everyday Soft Niqab.jpg",
    colours: [
      ['Black', '#202027', 20],
      ['Navy', '#253b65', 8],
      ['Brown', '#725440', 6]
    ]
  },

  // ===================== ACCESSORIES =====================

  {
    id: 'a01',
    category: 'Accessories',
    type: 'Bridal Clutches',
    name: 'Bridal Embellished Clutch',
    price: 1499,
    description: 'Statement occasion clutch with embellished detailing.',
     image:"/public/images/Bridal Embellished Clutch.jpeg",

    colours: [
      ['Champagne', '#d8c59d', 3],
      ['Rose Gold', '#c58e80', 2],
      ['Silver', '#b9bbc4', 2]
    ]
  },

  {
    id: 'a02',
    category: 'Accessories',
    type: 'Batwa',
    name: 'Traditional Batwa',
    price: 699,
    description: 'A classic accessory for festive and traditional outfits.',
     image:"/public/images/Traditional Batwa.jpg",
    colours: [
      ['Gold', '#c9a65a', 4],
      ['Maroon', '#722d43', 3]
    ]
  },

  {
    id: 'a03',
    category: 'Accessories',
    type: 'Potli',
    name: 'Embroidered Potli Bag',
    price: 899,
    description: 'A charming potli bag for celebrations and gifting.',
     image:"/public/images/Embroidered Potli Bag.jpeg",
    colours: [
      ['Gold', '#c9a65a', 4],
      ['Plum', '#6d35a8', 3],
      ['Rose', '#c9879c', 3]
    ]
  },

  {
    id: 'a04',
    category: 'Accessories',
    type: 'Premium party wear clutches',
    name: 'Premium Party Clutch',
    price: 1299,
    description: 'Elegant party clutch to complete your occasion look.',
     image:"/public/images/Premium Party Clutch.jpeg",
    colours: [
      ['Black', '#202027', 4],
      ['Silver', '#b9bbc4', 3],
      ['Champagne', '#d8c59d', 3]
    ]
  },

  {
    id: 'a05',
    category: 'Accessories',
    type: 'Premium sling bags',
    name: 'Premium Sling Bag',
    price: 1199,
    description: 'A versatile compact bag for day-to-evening styling.',
     image:"/public/images/Premium Sling Bag.jpeg",
    colours: [
      ['Black', '#202027', 5],
      ['Tan', '#aa805c', 4],
      ['Plum', '#6d35a8', 3]
    ]
  },

  {
    id: 'a06',
    category: 'Accessories',
    type: 'Premium handbags',
    name: 'Premium Handbag',
    price: 1599,
    description: 'A refined everyday handbag with a timeless silhouette.',
     image:"/public/images/Premium Handbag.jpeg",
    colours: [
      ['Black', '#202027', 4],
      ['Tan', '#aa805c', 3],
      ['Ivory', '#eee8dd', 2]
    ]
  },

  {
    id: 'a07',
    category: 'Accessories',
    type: 'Hijab caps - one size fits all',
    name: 'Comfort Hijab Cap',
    price: 99,
    description: 'Stretch-fit inner cap designed for comfortable layering.',
     image:"/public/images/Comfort Hijab Cap.jpg",
    colours: [
      ['Black', '#202027', 30],
      ['White', '#f4f1eb', 25],
      ['Nude', '#c9a58c', 20]
    ]
  },

  {
    id: 'a08',
    category: 'Accessories',
    type: 'Tube cap',
    name: 'Stretch Tube Cap',
    price: 129,
    description: 'Simple stretch tube cap for everyday hijab styling.',
     image:"/public/images/Stretch Tube Cap.jpg",
    colours: [
      ['Black', '#202027', 25],
      ['Nude', '#c9a58c', 18],
      ['White', '#f4f1eb', 16]
    ]
  },

  {
    id: 'a09',
    category: 'Accessories',
    type: 'Tie cap',
    name: 'Tie-Back Hijab Cap',
    price: 149,
    description: 'Comfortable tie-back fit for an adjustable feel.',
     image:"/public/images/Tie-Back Hijab Cap.jpg",
    colours: [
      ['Black', '#202027', 16],
      ['White', '#f4f1eb', 12],
      ['Mocha', '#725440', 10]
    ]
  },

  {
    id: 'a10',
    category: 'Accessories',
    type: 'Full cap',
    name: 'Full Coverage Cap',
    price: 179,
    description: 'Full coverage inner cap with a soft stretch finish.',
     image:"/public/images/Full Coverage Cap.jpeg",
    colours: [
      ['Black', '#202027', 16],
      ['Nude', '#c9a58c', 12]
    ]
  },

  {
    id: 'a11',
    category: 'Accessories',
    type: 'Imported Nose piece',
    name: 'Imported Nose Piece',
    price: 199,
    description: 'Available in Big and Medium sizes. Select your preferred size.',
     image:"/public/images/Imported Nose Piece.jpeg",
    colours: [
      ['Big', '#d9c7b6', 8],
      ['Medium', '#c5aa96', 8]
    ]
  }

];
