/* eslint-disable camelcase */
const mongoose = require('mongoose');
const { produce } = require('immer');
const Product = require('./Model/Product/product_model');

let common_products = [
  // iphone 14
  {
    title: 'Apple iPhone 14 Plus',
    name: 'Apple iPhone 14',
    description: [
      '16.95 cm (6.7-inch) Super Retina XDR display',
      'Advanced camera system for better photos in any light',
      'Cinematic mode now in 4K Dolby Vision up to 30 fps',
      'Action mode for smooth, steady, handheld videos',
      'Vital safety technology — Crash Detection calls for help when you can’t',
    ],
    price: {
      unit: '$',
      value: 1257,
    },
    category: 'SmartPhones & Basic Mobiles',
    color: 'blue',
    size: '128 GB',
    variants: {
      colors: [
        {
          color_img:
            'https://m.media-amazon.com/images/I/11hYeQYRq9L._SS36_.jpg',
          color: 'blue',
          product_img:
            'https://m.media-amazon.com/images/I/61bK6PMOC3L._SX679_.jpg',
        },
        {
          color_img:
            'https://m.media-amazon.com/images/I/11GBhVqn2AL._SS36_.jpg',
          color: 'midnight',
          product_img:
            'https://m.media-amazon.com/images/I/619f09kK7tL._SX679_.jpg',
        },
        {
          color_img:
            'https://m.media-amazon.com/images/I/01iHQ9KH-2L._SS36_.jpg',
          color: 'purple',
          product_img:
            'https://m.media-amazon.com/images/I/61cwywLZR-L._SX679_.jpg',
        },
        {
          color_img:
            'https://m.media-amazon.com/images/I/116GEYTP2ZL._SS36_.jpg',
          color: 'red',
          product_img:
            'https://m.media-amazon.com/images/I/611mRs-imxL._SX679_.jpg',
        },
        {
          color_img:
            'https://m.media-amazon.com/images/I/01BqyXaiaVL._SS36_.jpg',
          color: 'starlight',
          product_img:
            'https://m.media-amazon.com/images/I/618Bb+QzCmL._SX679_.jpg',
        },
      ],
      sizes: [
        {
          value: '128 GB',
          price: 1257,
        },
        {
          value: '256 GB',
          price: 1424,
        },
        {
          value: '512 GB',
          price: 1764,
        },
      ],
    },
    assets: {
      thumbnail:
        'https://m.media-amazon.com/images/I/31laW9Ex46L._SY445_SX342_QL70_FMwebp_.jpg',
      product_imgs: [
        'https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/61iTWldZ9qL._SX679_.jpg',
        'https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/61im796yRUL._SX679_.jpg',
        'https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/711yt5-rPLL._SX679_.jpg',
        'https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/71G44HUh7yL._SX679_.jpg',
        'https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/71dKjvLPkAL._SX679_.jpg',
        'https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/91wGCiIAniL._SX679_.jpg',
      ],
      product_spec_imgs: [
        'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/2022/i14/Aplus_14/r1594_Product_Page_Flex_Module_Avail_Amazon_Desktop__en-IN_01._CB609634686_.jpg',
        'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/2022/i14/Aplus_14/r1594_Product_Page_Flex_Module_Avail_Amazon_Desktop__en-IN_02._CB609634686_.jpg',
        'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/2022/i14/Aplus_14/r1594_Product_Page_Flex_Module_Avail_Amazon_Desktop__en-IN_03._CB609634686_.jpg',
        'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/2022/i14/Aplus_14/r1594_Product_Page_Flex_Module_Avail_Amazon_Desktop__en-IN_04._CB609634686_.jpg',
        'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/2022/i14/Aplus_14/r1594_Product_Page_Flex_Module_Avail_Amazon_Desktop__en-IN_05._CB609634686_.jpg',
        'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/2022/i14/Aplus_14/r1594_Product_Page_Flex_Module_Avail_Amazon_Desktop__en-IN_06._CB609634686_.jpg',
        'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/2022/i14/Aplus_14/r1594_Product_Page_Flex_Module_Avail_Amazon_Desktop__en-IN_07._CB609634686_.jpg',
        'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/2022/i14/Aplus_14/r1594_Product_Page_Flex_Module_Avail_Amazon_Desktop__en-IN_08._CB609634686_.jpg',
        'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/2022/i14/Aplus_14/r1594_Product_Page_Flex_Module_Avail_Amazon_Desktop__en-IN_09._CB609634686_.jpg',
      ],
    },
    stock: 1000,
    attributes: [
      {
        name: 'brand',
        value: 'Apple',
      },
      {
        name: 'model_name',
        value: 'IPhone',
      },
      {
        name: 'network_service_provider',
        value: 'Unlocked for All Carriers',
      },
      {
        name: 'operating_system',
        value: 'IOS',
      },
      {
        name: 'cellular_technology',
        value: '5G',
      },
    ],
    specs: [
      {
        name: 'display',
        value: '6.7-inch Super Retina XDR display',
      },
      {
        name: 'capacity',
        value: '128GB, 256GB, 512GB, 1TB',
      },
      {
        name: 'splash,_water,_and_dust_resistant',
        value:
          'Ceramic Shield front, glass back and aluminum design, water and dust resistant (rated IP68 - maximum depth of 6 meters up to 30 minutes)',
      },
      {
        name: 'camera_and_video',
        value:
          'Dual-camera system: 12MP Main, 12MP Ultrawide with Portrait mode, Depth Control, Portrait Lighting, Smart HDR 4, and 4K Dolby Vision HDR video up to 60 fps',
      },
      {
        name: 'front_camera',
        value:
          '12MP TrueDepth front camera with Portrait mode, Depth Control, Portrait Lighting, and Smart HDR 4',
      },
      {
        name: 'power_and_battery',
        value:
          'Video playback: Up to 26 hours Video playback (streamed): Up to 20 hours Audio playback: Up to 100 hours 20W adapter or higher (sold separately) Fast-charge capable: Up to 50% charge in around 30 minutes with 20W adapter or higher (available separately)',
      },
      {
        name: 'in_the_box',
        value: 'iPhone with iOS 16, USB-C to Lightning Cable,  Documentation',
      },
      {
        name: 'warranty',
        value:
          'Apple-branded hardware product and accessories contained in the original packaging (“Apple Product”) come with a One-Year Limited Warranty. See apple.com/in/legal/warranty for more information.',
      },
      {
        name: 'height',
        value: '6.33 inches (160.8 mm)',
      },
      {
        name: 'width',
        value: '3.07 inches',
      },
      {
        name: 'depth',
        value: '0.31 inch',
      },
      {
        name: 'weight',
        value: '7.16 ounces',
      },
      {
        name: 'screen_height',
        value: '6.7-inch',
      },
    ],
    compare_similar_products: [],
  },
  {
    title: 'Apple iPhone 14',
    name: 'Apple iPhone 14',
    description: [
      '15.40 cm (6.1-inch) Super Retina XDR display',
      'Advanced camera system for better photos in any light',
      'Cinematic mode now in 4K Dolby Vision up to 30 fps',
      'Action mode for smooth, steady, handheld videos',
      'Vital safety technology — Crash Detection calls for help when you can’t',
    ],
    price: {
      unit: '$',
      value: 1125,
    },
    category: 'SmartPhones & Basic Mobiles',
    color: 'blue',
    size: '128 GB',
    variants: {
      colors: [
        {
          color_img:
            'https://m.media-amazon.com/images/I/11hYeQYRq9L._SS36_.jpg',
          color: 'blue',
          product_img:
            'https://m.media-amazon.com/images/I/31VjlrbE3bL._SY445_SX342_QL70_FMwebp_.jpg',
        },
        {
          color_img:
            'https://m.media-amazon.com/images/I/11GBhVqn2AL._SS36_.jpg',
          color: 'midnight',
          product_img:
            'https://m.media-amazon.com/images/I/31VjlrbE3bL._SY445_SX342_QL70_FMwebp_.jpg',
        },
        {
          color_img:
            'https://m.media-amazon.com/images/I/01iHQ9KH-2L._SS36_.jpg',
          color: 'purple',
          product_img:
            'https://m.media-amazon.com/images/I/31VjlrbE3bL._SY445_SX342_QL70_FMwebp_.jpg',
        },
        {
          color_img:
            'https://m.media-amazon.com/images/I/116GEYTP2ZL._SS36_.jpg',
          color: 'red',
          product_img:
            'https://m.media-amazon.com/images/I/31VjlrbE3bL._SY445_SX342_QL70_FMwebp_.jpg',
        },
        {
          color_img:
            'https://m.media-amazon.com/images/I/01BqyXaiaVL._SS36_.jpg',
          color: 'starlight',
          product_img:
            'https://m.media-amazon.com/images/I/31VjlrbE3bL._SY445_SX342_QL70_FMwebp_.jpg',
        },
      ],
      sizes: [
        {
          value: '128 GB',
          price: 1125,
        },
        {
          value: '256 GB',
          price: 1300,
        },
        {
          value: '512 GB',
          price: 1650,
        },
      ],
    },
    assets: {
      thumbnail:
        'https://m.media-amazon.com/images/I/31VjlrbE3bL._SY445_SX342_QL70_FMwebp_.jpg',
      product_imgs: [
        'https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/61iTWldZ9qL._SX679_.jpg',
        'https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/61im796yRUL._SX679_.jpg',
        'https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/711yt5-rPLL._SX679_.jpg',
        'https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/71G44HUh7yL._SX679_.jpg',
        'https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/71dKjvLPkAL._SX679_.jpg',
        'https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/91wGCiIAniL._SX679_.jpg',
      ],
      product_spec_imgs: [
        'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/2022/i14/Aplus_14/r1594_Product_Page_Flex_Module_Avail_Amazon_Desktop__en-IN_01._CB609634686_.jpg',
        'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/2022/i14/Aplus_14/r1594_Product_Page_Flex_Module_Avail_Amazon_Desktop__en-IN_02._CB609634686_.jpg',
        'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/2022/i14/Aplus_14/r1594_Product_Page_Flex_Module_Avail_Amazon_Desktop__en-IN_03._CB609634686_.jpg',
        'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/2022/i14/Aplus_14/r1594_Product_Page_Flex_Module_Avail_Amazon_Desktop__en-IN_04._CB609634686_.jpg',
        'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/2022/i14/Aplus_14/r1594_Product_Page_Flex_Module_Avail_Amazon_Desktop__en-IN_05._CB609634686_.jpg',
        'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/2022/i14/Aplus_14/r1594_Product_Page_Flex_Module_Avail_Amazon_Desktop__en-IN_06._CB609634686_.jpg',
        'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/2022/i14/Aplus_14/r1594_Product_Page_Flex_Module_Avail_Amazon_Desktop__en-IN_07._CB609634686_.jpg',
        'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/2022/i14/Aplus_14/r1594_Product_Page_Flex_Module_Avail_Amazon_Desktop__en-IN_08._CB609634686_.jpg',
        'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/2022/i14/Aplus_14/r1594_Product_Page_Flex_Module_Avail_Amazon_Desktop__en-IN_09._CB609634686_.jpg',
      ],
    },
    stock: 1000,
    attributes: [
      {
        name: 'brand',
        value: 'Apple',
      },
      {
        name: 'model_name',
        value: 'IPhone',
      },
      {
        name: 'network_service_provider',
        value: 'Unlocked for All Carriers',
      },
      {
        name: 'operating_system',
        value: 'IOS',
      },
      {
        name: 'cellular_technology',
        value: '5G',
      },
    ],
    specs: [
      {
        name: 'display',
        value: '6.1-inch Super Retina XDR display',
      },
      {
        name: 'capacity',
        value: '128GB, 256GB, 512GB',
      },
      {
        name: 'splash,_water,_and_dust_resistant',
        value:
          'Ceramic Shield front, glass back and aluminum design, water and dust resistant (rated IP68 - maximum depth of 6 meters up to 30 minutes)',
      },
      {
        name: 'camera_and_video',
        value:
          'Dual-camera system: 12MP Main, 12MP Ultrawide with Portrait mode, Depth Control, Portrait Lighting, Smart HDR 4, and 4K Dolby Vision HDR video up to 60 fps',
      },
      {
        name: 'front_camera',
        value:
          '12MP TrueDepth front camera with Portrait mode, Depth Control, Portrait Lighting, and Smart HDR 4',
      },
      {
        name: 'power_and_battery',
        value:
          'Video playback: Up to 20 hours Video playback (streamed): Up to 16 hours Audio playback: Up to 80 hours 20W adapter or higher (sold separately) Fast-charge capable:Up to 50% charge in around 30 minutes with 20W adapter or higher (available separately)',
      },
      {
        name: 'in_the_box',
        value: 'iPhone with iOS 16, USB-C to Lightning Cable,  Documentation',
      },
      {
        name: 'warranty',
        value:
          'Apple-branded hardware product and accessories contained in the original packaging (“Apple Product”) come with a One-Year Limited Warranty. See apple.com/in/legal/warranty for more information.',
      },
      {
        name: 'height',
        value: '5.78 inches (146.7 mm)',
      },
      {
        name: 'width',
        value: '2.82 inches',
      },
      {
        name: 'depth',
        value: '0.31 inch',
      },
      {
        name: 'weight',
        value: '6.07 ounces',
      },
      {
        name: 'screen_height',
        value: '6.1-inch',
      },
    ],
    compare_similar_products: [],
  },
  {
    title: 'Apple iPhone 14 Pro',
    name: 'Apple iPhone 14',
    description: [
      '15.54 cm (6.1-inch) Super Retina XDR display featuring Always-On and ProMotion',
      'Dynamic Island, a magical new way to interact with iPhone',
      '48MP Main camera for up to 4x greater resolution',
      'Cinematic mode now in 4K Dolby Vision up to 30 fps',
      'Action mode for smooth, steady, handheld videos',
    ],
    price: {
      unit: '$',
      value: 1856,
    },
    category: 'SmartPhones & Basic Mobiles',
    color: 'deep purple',
    size: '128 GB',
    variants: {
      colors: [
        {
          color_img:
            'https://m.media-amazon.com/images/I/110waksaerL._SS36_.jpg',
          color: 'deep purple',
          product_img:
            'https://m.media-amazon.com/images/I/31MX9scnEzL._SY445_SX342_QL70_FMwebp_.jpg',
        },
        {
          color_img:
            'https://m.media-amazon.com/images/I/01byr1bQy5L._SS36_.jpg',
          color: 'gold',
          product_img:
            'https://m.media-amazon.com/images/I/31MX9scnEzL._SY445_SX342_QL70_FMwebp_.jpg',
        },
        {
          color_img:
            'https://m.media-amazon.com/images/I/01O-vnAecgL._SS36_.jpg',
          color: 'silver',
          product_img:
            'https://m.media-amazon.com/images/I/31MX9scnEzL._SY445_SX342_QL70_FMwebp_.jpg',
        },
        {
          color_img:
            'https://m.media-amazon.com/images/I/11Z5UjmqOvL._SS36_.jpg',
          color: 'space black',
          product_img:
            'https://m.media-amazon.com/images/I/31MX9scnEzL._SY445_SX342_QL70_FMwebp_.jpg',
        },
      ],
      sizes: [
        {
          value: '1 TB',
          price: 2570,
        },
        {
          value: '128 GB',
          price: 1856,
        },
        {
          value: '256 GB',
          price: 1998,
        },
        {
          value: '512 GB',
          price: 2284,
        },
      ],
    },
    assets: {
      thumbnail:
        'https://m.media-amazon.com/images/I/31MX9scnEzL._SY445_SX342_QL70_FMwebp_.jpg',
      product_imgs: [
        'https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/61iTWldZ9qL._SX679_.jpg',
        'https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/61im796yRUL._SX679_.jpg',
        'https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/711yt5-rPLL._SX679_.jpg',
        'https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/71G44HUh7yL._SX679_.jpg',
        'https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/71dKjvLPkAL._SX679_.jpg',
        'https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/91wGCiIAniL._SX679_.jpg',
      ],
      product_spec_imgs: [
        'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/2022/i14/Aplus_14pro/iPhone_14_Pro_Product_Page_Flex_Module_Avail_Amazon_Desktop__en-IN_01._CB609619398_.jpg',
        'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/2022/i14/Aplus_14pro/iPhone_14_Pro_Product_Page_Flex_Module_Avail_Amazon_Desktop__en-IN_02._CB609619398_.jpg',
        'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/2022/i14/Aplus_14pro/iPhone_14_Pro_Product_Page_Flex_Module_Avail_Amazon_Desktop__en-IN_03._CB609619398_.jpg',
        'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/2022/i14/Aplus_14pro/iPhone_14_Pro_Product_Page_Flex_Module_Avail_Amazon_Desktop__en-IN_04._CB609619398_.jpg',
        'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/2022/i14/Aplus_14pro/iPhone_14_Pro_Product_Page_Flex_Module_Avail_Amazon_Desktop__en-IN_05._CB609619398_.jpg',
        'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/2022/i14/Aplus_14pro/iPhone_14_Pro_Product_Page_Flex_Module_Avail_Amazon_Desktop__en-IN_06._CB609619398_.jpg',
        'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/2022/i14/Aplus_14pro/iPhone_14_Pro_Product_Page_Flex_Module_Avail_Amazon_Desktop__en-IN_07._CB609619398_.jpg',
        'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/2022/i14/Aplus_14pro/iPhone_14_Pro_Product_Page_Flex_Module_Avail_Amazon_Desktop__en-IN_08._CB609619398_.jpg',
        'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/2022/i14/Aplus_14pro/iPhone_14_Pro_Product_Page_Flex_Module_Avail_Amazon_Desktop__en-IN_09._CB609619398_.jpg',
      ],
    },
    stock: 1000,
    attributes: [
      {
        name: 'brand',
        value: 'Apple',
      },
      {
        name: 'model_name',
        value: 'IPhone',
      },
      {
        name: 'network_service_provider',
        value: 'Unlocked for All Carriers',
      },
      {
        name: 'operating_system',
        value: 'IOS',
      },
      {
        name: 'cellular_technology',
        value: '5G',
      },
    ],
    specs: [
      {
        name: 'display',
        value: '6.1-inchSuper Retina XDR display with ProMotion',
      },
      {
        name: 'capacity',
        value: '128GB, 256GB, 512GB, 1TB',
      },
      {
        name: 'splash,_water,_and_dust_resistant',
        value:
          'Ceramic Shield front, textured matte glass back and stainless steel design, water and dust resistant (rated IP68 - maximum depth of 6 meters up to 30 minutes)',
      },
      {
        name: 'camera_and_video',
        value:
          'Pro camera system: 48MP Main, 12MP Ultrawide, and 12MP 2x Telephoto with Portrait mode, Depth Control, Portrait Lighting, Smart HDR 4, and 4K Dolby Vision HDR video up to 60 fps',
      },
      {
        name: 'front_camera',
        value:
          '12MP TrueDepth front camera with Portrait mode, Depth Control, Portrait Lighting, and Smart HDR 4',
      },
      {
        name: 'power_and_battery',
        value:
          'Video playback: Up to 23 hours Video playback (streamed): Up to 20 hours Audio playback: Up to 75 hours 20W adapter or higher (sold separately) Fast-charge capable:Up to 50% charge in around 30 minutes with 20W adapter or higher (available separately)',
      },
      {
        name: 'in_the_box',
        value: 'iPhone with iOS 16, USB-C to Lightning Cable,  Documentation',
      },
      {
        name: 'warranty',
        value:
          'Apple-branded hardware product and accessories contained in the original packaging (“Apple Product”) come with a One-Year Limited Warranty. See apple.com/in/legal/warranty for more information.',
      },
      {
        name: 'height',
        value: '5.81 inches (147.5 mm)',
      },
      {
        name: 'width',
        value: '2.81 inches',
      },
      {
        name: 'depth',
        value: '0.31 inch',
      },
      {
        name: 'weight',
        value: '7.27 ounces',
      },
      {
        name: 'screen_height',
        value: '6.1-inchSuper',
      },
    ],
    compare_similar_products: [],
  },
  {
    title: 'Apple iPhone 14 Pro Max',
    name: 'Apple iPhone 14',
    description: [
      '17.00 cm (6.7-inch) Super Retina XDR display featuring Always-On and ProMotion',
      'Dynamic Island, a magical new way to interact with iPhone',
      '48MP Main camera for up to 4x greater resolution',
      'Cinematic mode now in 4K Dolby Vision up to 30 fps',
      'Action mode for smooth, steady, handheld videos',
    ],
    price: {
      unit: '$',
      value: 2141,
    },
    category: 'SmartPhones & Basic Mobiles',
    color: 'gold',
    size: '256 GB',
    variants: {
      colors: [
        {
          color_img:
            'https://m.media-amazon.com/images/I/110waksaerL._SS36_.jpg',
          color: 'deep purple',
          product_img:
            'https://m.media-amazon.com/images/I/71T5NVOgbpL._SX679_.jpg',
        },
        {
          color_img:
            'https://m.media-amazon.com/images/I/01byr1bQy5L._SS36_.jpg',
          color: 'gold',
          product_img:
            'https://m.media-amazon.com/images/I/71T5NVOgbpL._SX679_.jpg',
        },
        {
          color_img:
            'https://m.media-amazon.com/images/I/01O-vnAecgL._SS36_.jpg',
          color: 'silver',
          product_img:
            'https://m.media-amazon.com/images/I/71T5NVOgbpL._SX679_.jpg',
        },
        {
          color_img:
            'https://m.media-amazon.com/images/I/11Z5UjmqOvL._SS36_.jpg',
          color: 'space black',
          product_img:
            'https://m.media-amazon.com/images/I/71T5NVOgbpL._SX679_.jpg',
        },
      ],
      sizes: [
        {
          value: '1 TB',
          price: 2712,
        },
        {
          value: '128 GB',
          price: 1998,
        },
        {
          value: '256 GB',
          price: 2141,
        },
        {
          value: '512 GB',
          price: 2427,
        },
      ],
    },
    assets: {
      thumbnail: 'https://m.media-amazon.com/images/I/71T5NVOgbpL._SX679_.jpg',
      product_imgs: [
        'https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/61iTWldZ9qL._SX679_.jpg',
        'https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/61im796yRUL._SX679_.jpg',
        'https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/711yt5-rPLL._SX679_.jpg',
        'https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/71G44HUh7yL._SX679_.jpg',
        'https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/71dKjvLPkAL._SX679_.jpg',
        'https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/91wGCiIAniL._SX679_.jpg',
      ],
      product_spec_imgs: [
        'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/2022/i14/Aplus_14pro/iPhone_14_Pro_Product_Page_Flex_Module_Avail_Amazon_Desktop__en-IN_01._CB609619398_.jpg',
        'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/2022/i14/Aplus_14pro/iPhone_14_Pro_Product_Page_Flex_Module_Avail_Amazon_Desktop__en-IN_02._CB609619398_.jpg',
        'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/2022/i14/Aplus_14pro/iPhone_14_Pro_Product_Page_Flex_Module_Avail_Amazon_Desktop__en-IN_03._CB609619398_.jpg',
        'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/2022/i14/Aplus_14pro/iPhone_14_Pro_Product_Page_Flex_Module_Avail_Amazon_Desktop__en-IN_04._CB609619398_.jpg',
        'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/2022/i14/Aplus_14pro/iPhone_14_Pro_Product_Page_Flex_Module_Avail_Amazon_Desktop__en-IN_05._CB609619398_.jpg',
        'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/2022/i14/Aplus_14pro/iPhone_14_Pro_Product_Page_Flex_Module_Avail_Amazon_Desktop__en-IN_06._CB609619398_.jpg',
        'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/2022/i14/Aplus_14pro/iPhone_14_Pro_Product_Page_Flex_Module_Avail_Amazon_Desktop__en-IN_07._CB609619398_.jpg',
        'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/2022/i14/Aplus_14pro/iPhone_14_Pro_Product_Page_Flex_Module_Avail_Amazon_Desktop__en-IN_08._CB609619398_.jpg',
        'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/2022/i14/Aplus_14pro/iPhone_14_Pro_Product_Page_Flex_Module_Avail_Amazon_Desktop__en-IN_09._CB609619398_.jpg',
      ],
    },
    stock: 1000,
    attributes: [
      {
        name: 'brand',
        value: 'Apple',
      },
      {
        name: 'model_name',
        value: 'IPhone',
      },
      {
        name: 'network_service_provider',
        value: 'Unlocked for All Carriers',
      },
      {
        name: 'operating_system',
        value: 'IOS',
      },
      {
        name: 'cellular_technology',
        value: '5G',
      },
    ],
    specs: [
      {
        name: 'display',
        value: '6.7-inch Super Retina XDR display with ProMotion',
      },
      {
        name: 'capacity',
        value: '128GB, 256GB, 512GB, 1TB',
      },
      {
        name: 'splash,_water,_and_dust_resistant',
        value:
          'Ceramic Shield front, textured matte glass back and stainless steel design, water and dust resistant (rated IP68 - maximum depth of 6 meters up to 30 minutes)',
      },
      {
        name: 'camera_and_video',
        value:
          'Pro camera system: 48MP Main, 12MP Ultrawide, and 12MP 2x Telephoto with Portrait mode, Depth Control, Portrait Lighting, Smart HDR 4, and 4K Dolby Vision HDR video up to 60 fps',
      },
      {
        name: 'front_camera',
        value:
          '12MP TrueDepth front camera with Portrait mode, Depth Control, Portrait Lighting, and Smart HDR 4',
      },
      {
        name: 'power_and_battery',
        value:
          'Video playback: Up to 29 hours Video playback (streamed): Up to 25 hours Audio playback: Up to 95 hours 20W adapter or higher (sold separately) Fast-charge capable: Up to 50% charge in around 30 minutes with 20W adapter or higher (available separately)',
      },
      {
        name: 'in_the_box',
        value: 'iPhone with iOS 16, USB-C to Lightning Cable,  Documentation',
      },
      {
        name: 'warranty',
        value:
          'Apple-branded hardware product and accessories contained in the original packaging (“Apple Product”) come with a One-Year Limited Warranty. See apple.com/in/legal/warranty for more information.',
      },
      {
        name: 'height',
        value: '6.33 inches (160.7 mm)',
      },
      {
        name: 'width',
        value: '3.05 inches',
      },
      {
        name: 'depth',
        value: '0.31 inch',
      },
      {
        name: 'weight',
        value: '8.47 ounces',
      },
      {
        name: 'screen_height',
        value: '6.7-inch',
      },
    ],

    compare_similar_products: [],
  },
];

common_products.forEach((product) => {
  product._id = mongoose.Types.ObjectId();
  product.model = {
    isModel: true,
    _id: null,
    variantId: null,
  };


  product.variants.colors = [
    {
      color_img: 'https://m.media-amazon.com/images/I/11hYeQYRq9L._SS36_.jpg',
      color: 'blue',
      product_img:
        'https://m.media-amazon.com/images/I/61bK6PMOC3L._SX679_.jpg',
    },
    {
      color_img: 'https://m.media-amazon.com/images/I/11GBhVqn2AL._SS36_.jpg',
      color: 'midnight',
      product_img:
        'https://m.media-amazon.com/images/I/619f09kK7tL._SX679_.jpg',
    },
    {
      color_img: 'https://m.media-amazon.com/images/I/01iHQ9KH-2L._SS36_.jpg',
      color: 'purple',
      product_img:
        'https://m.media-amazon.com/images/I/61cwywLZR-L._SX679_.jpg',
    },
    {
      color_img: 'https://m.media-amazon.com/images/I/116GEYTP2ZL._SS36_.jpg',
      color: 'red',
      product_img:
        'https://m.media-amazon.com/images/I/611mRs-imxL._SX679_.jpg',
    },
    {
      color_img: 'https://m.media-amazon.com/images/I/01BqyXaiaVL._SS36_.jpg',
      color: 'starlight',
      product_img:
        'https://m.media-amazon.com/images/I/618Bb+QzCmL._SX679_.jpg',
    },
  ];
});

const create_all_variants_of_products = async () => {
  let variants_of_common_products = [];
  common_products.map(async (common_product) => {
    let cur_variants_of_product = [];
    const variant_of_different_sizes = common_product.variants.sizes;
    const variant_of_different_colors = common_product.variants.colors;

    // create all variation of prod = no_of_sizes_variation * no_of_color_variration
    variant_of_different_sizes.forEach((size) => {
      variant_of_different_colors.forEach((different_color_variant_product) => {
        const product = produce(common_product, (draft) => {
          draft.title = `${draft.title} ${size.value} ${different_color_variant_product.color}`;
          draft.details = {
            color: different_color_variant_product.color,
            size: size.value,
            color_img: different_color_variant_product.color_img,
          };
          draft.curVariant = {
            color: {
              name: different_color_variant_product.color,
              color_img: different_color_variant_product.color_img,
            },
            size: size.value,
          };

          draft.model = {
            isModel: false,
            _id: common_product._id,
            variantId: null,
          };

          draft._id = new mongoose.Types.ObjectId();
          draft.assets.thumbnail = different_color_variant_product.product_img;
     

          draft.assets.product_imgs = draft.assets.product_imgs.slice(1);
          draft.assets.product_imgs.unshift(draft.assets.thumbnail);

          draft.price = { unit: '$', value: size.price };
        });
        cur_variants_of_product.push(product);
      });
    });

    // setting variant_id to variant_colors and sizes
    cur_variants_of_product = cur_variants_of_product.map((product) =>
      produce(product, (draft) => {
        // const same size color 128GB 5 color variation
        const same_size_different_color_variant_products =
          cur_variants_of_product.filter(
            (el) => el.details.size === draft.details.size
          );

        const same_color_differnt_variant = cur_variants_of_product.filter(
          (el) => el.details.color === draft.details.color
        );

        draft.variants.colors = same_size_different_color_variant_products.map(
          (el) => ({
            variant_id: el._id,
            color: el.details.color,
            color_img: el.details.color_img,
          })
        );
        draft.variants.sizes = same_color_differnt_variant.map((el) => ({
          variant_id: el._id,
          value: el.details.size,
        }));
      })
    );

    common_product.model.variantId =
      cur_variants_of_product[0]._id;

    cur_variants_of_product.push(common_product);
    variants_of_common_products.push(...cur_variants_of_product);
  });

  console.log(variants_of_common_products.length);

  await Product.deleteMany({});
  await Product.create(variants_of_common_products);
};

create_all_variants_of_products();
