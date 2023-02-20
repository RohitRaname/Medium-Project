
// const mongoose= require('mongoose')
// const {produce}= require('immer')

// let products = [
//   {
//     title: 'Apple iPhone 14 128GB Blue',
//     description: [
//       '15.40 cm (6.1-inch) Super Retina XDR display',
//       'Advanced camera system for better photos in any light',
//       'Cinematic mode now in 4K Dolby Vision up to 30 fps',
//       'Action mode for smooth, steady, handheld videos',
//       'Vital safety technology — Crash Detection calls for help when you can’t',
//     ],
//     price: '79900',
//     category: 'SmartPhones & Basic Mobiles',
//     variants: {
//       colors: [
//         {
//           color_img: 'https://m.media-amazon.com/images/I/11hYeQYRq9L._SS36_.jpg',

//           color: 'Blue',
//         },
//         {
//           color_img: 'https://m.media-amazon.com/images/I/11GBhVqn2AL._SS36_.jpg',
//           color: 'Midnight',
//         },
//         {
//           color_img: 'https://m.media-amazon.com/images/I/01iHQ9KH-2L._SS36_.jpg',
//           color: 'Purple',
//         },
//         {
//           color_img: 'https://m.media-amazon.com/images/I/116GEYTP2ZL._SS36_.jpg',
//           color: 'Red',
//         },
//         {
//           color_img: 'https://m.media-amazon.com/images/I/01BqyXaiaVL._SS36_.jpg',
//           color: 'Starlight',
//         },

//       ],
//       sizes: ['128 GB', '256 GB', '512 GB'],
//     },
//     assets: {
//       thumbnail:
//         'https://m.media-amazon.com/images/I/31VjlrbE3bL._SY445_SX342_QL70_FMwebp_.jpg',
//       product_imgs: [
//         'https://m.media-amazon.com/images/G/31/HomeCustomProduct/360_icon_73x73v2._CB485971317_SX38_SY50_CR,0,0,38,50_FMpng_RI_.png',
//         'https://m.media-amazon.com/images/I/31VjlrbE3bL._SX38_SY50_CR,0,0,38,50_.jpg',
//         'https://m.media-amazon.com/images/I/31HYKc6vHiL._SX35_SY46._CR0,0,35,46_BG85,85,85_BR-120_PKdp-play-icon-overlay__.jpg',
//         'https://m.media-amazon.com/images/I/21edR26hwVL._SX38_SY50_CR,0,0,38,50_.jpg',
//         'https://m.media-amazon.com/images/I/31g2XUsBxwL._SX38_SY50_CR,0,0,38,50_.jpg',
//         'https://m.media-amazon.com/images/I/3121hxxq2WL._SX38_SY50_CR,0,0,38,50_.jpg',
//         'https://m.media-amazon.com/images/I/41HXYQ9V9cL._SX38_SY50_CR,0,0,38,50_.jpg',
//         'https://m.media-amazon.com/images/I/51pi1Od1wlL._SX38_SY50_CR,0,0,38,50_.jpg',
//         'https://m.media-amazon.com/images/I/31VjlrbE3bL._SY445_SX342_QL70_FMwebp_.jpg',
//       ],
//       product_spec_imgs: [
//         'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/2022/i14/Aplus_14/r1594_Product_Page_Flex_Module_Avail_Amazon_Desktop__en-IN_01._CB609634686_.jpg',
//         'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/2022/i14/Aplus_14/r1594_Product_Page_Flex_Module_Avail_Amazon_Desktop__en-IN_02._CB609634686_.jpg',
//         'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/2022/i14/Aplus_14/r1594_Product_Page_Flex_Module_Avail_Amazon_Desktop__en-IN_03._CB609634686_.jpg',
//         'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/2022/i14/Aplus_14/r1594_Product_Page_Flex_Module_Avail_Amazon_Desktop__en-IN_04._CB609634686_.jpg',
//         'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/2022/i14/Aplus_14/r1594_Product_Page_Flex_Module_Avail_Amazon_Desktop__en-IN_05._CB609634686_.jpg',
//         'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/2022/i14/Aplus_14/r1594_Product_Page_Flex_Module_Avail_Amazon_Desktop__en-IN_06._CB609634686_.jpg',
//         'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/2022/i14/Aplus_14/r1594_Product_Page_Flex_Module_Avail_Amazon_Desktop__en-IN_07._CB609634686_.jpg',
//         'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/2022/i14/Aplus_14/r1594_Product_Page_Flex_Module_Avail_Amazon_Desktop__en-IN_08._CB609634686_.jpg',
//         'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/2022/i14/Aplus_14/r1594_Product_Page_Flex_Module_Avail_Amazon_Desktop__en-IN_09._CB609634686_.jpg',
//       ],
//     },
//     attrs: [
//       {
//         brand: 'Apple',
//       },
//       {
//         model_name: 'IPhone',
//       },
//       {
//         network_service_provider: 'Unlocked for All Carriers',
//       },
//       {
//         operating_system: 'IOS',
//       },
//       {
//         cellular_technology: '5G',
//       },
//     ],
//   },
//   {
//     title: 'Apple iPhone 13 (256 GB) - Green',
//     description: [
//       '15 cm (6.1-inch) Super Retina XDR display',
//       'Cinematic mode adds shallow depth of field and shifts focus automatically in your videos',
//       'Advanced dual-camera system with 12MP Wide and Ultra Wide cameras; Photographic Styles, Smart HDR 4, Night mode, 4K Dolby Vision HDR recording',
//       '12MP TrueDepth front camera with Night mode, 4K Dolby Vision HDR recording',
//       'A15 Bionic chip for lightning-fast performance',
//     ],
//     price: '79900',
//     category: 'SmartPhones & Basic Mobiles',
//     variants: {
//       colors: [],
//       sizes: [],
//     },
//     imgs: {
//       thumbnail:
//         'https://m.media-amazon.com/images/I/315vs3rLEZL._SY445_SX342_QL70_FMwebp_.jpg',
//       product_imgs: [
//         'https://m.media-amazon.com/images/G/31/HomeCustomProduct/360_icon_73x73v2._CB485971317_SX38_SY50_CR,0,0,38,50_FMpng_RI_.png',
//         'https://m.media-amazon.com/images/I/315vs3rLEZL._SX38_SY50_CR,0,0,38,50_.jpg',
//         'https://m.media-amazon.com/images/I/51cT7898CFL._SX35_SY46._CR0,0,35,46_BG85,85,85_BR-120_PKdp-play-icon-overlay__.jpg',
//         'https://m.media-amazon.com/images/I/31aq0fhLKGL._SX38_SY50_CR,0,0,38,50_.jpg',
//         'https://m.media-amazon.com/images/I/31GXHfKZXQL._SX38_SY50_CR,0,0,38,50_.jpg',
//         'https://m.media-amazon.com/images/I/41TPEDRrKeL._SX38_SY50_CR,0,0,38,50_.jpg',
//         'https://m.media-amazon.com/images/I/41-jeF+KcfL._SX38_SY50_CR,0,0,38,50_.jpg',
//         'https://m.media-amazon.com/images/I/31UhWMyEBAL._SX38_SY50_CR,0,0,38,50_.jpg',
//         'https://m.media-amazon.com/images/I/315vs3rLEZL._SY445_SX342_QL70_FMwebp_.jpg',
//       ],
//       product_spec_imgs: [
//         'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/iphone_13/Green/updated/r1434_Product_Page_Flex_Module_Avail_Amazon_Desktop__en-IN_01._CB624147061_.jpg',
//         'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/iphone_13/Green/updated/r1434_Product_Page_Flex_Module_Avail_Amazon_Desktop__en-IN_02._CB624147061_.jpg',
//         'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/iphone_13/Green/updated/r1434_Product_Page_Flex_Module_Avail_Amazon_Desktop__en-IN_03._CB624147061_.jpg',
//         'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/iphone_13/Green/updated/r1434_Product_Page_Flex_Module_Avail_Amazon_Desktop__en-IN_04._CB624147061_.jpg',
//         'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/iphone_13/Green/updated/r1434_Product_Page_Flex_Module_Avail_Amazon_Desktop__en-IN_05._CB624147061_.jpg',
//         'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/iphone_13/Green/updated/r1434_Product_Page_Flex_Module_Avail_Amazon_Desktop__en-IN_06._CB624147061_.jpg',
//         'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/iphone_13/Green/updated/r1434_Product_Page_Flex_Module_Avail_Amazon_Desktop__en-IN_07._CB624147061_.jpg',
//         'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/iphone_13/Green/updated/r1434_Product_Page_Flex_Module_Avail_Amazon_Desktop__en-IN_08._CB624147061_.jpg',
//         'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/iphone_13/Green/updated/r1434_Product_Page_Flex_Module_Avail_Amazon_Desktop__en-IN_09._CB624147061_.jpg',
//       ],
//     },
//     attrs: [
//       {
//         brand: 'Apple',
//       },
//       {
//         model_name: 'IPhone 13',
//       },
//       {
//         network_service_provider: 'Unlocked for All Carriers',
//       },
//       {
//         operating_system: 'IOS',
//       },
//       {
//         cellular_technology: '5G',
//       },
//     ],
//   },
//   {
//     title: 'Apple iPhone 14 Pro Max 128GB Deep Purple',
//     description: [
//       '17.00 cm (6.7-inch) Super Retina XDR display featuring Always-On and ProMotion',
//       'Dynamic Island, a magical new way to interact with iPhone',
//       '48MP Main camera for up to 4x greater resolution',
//       'Cinematic mode now in 4K Dolby Vision up to 30 fps',
//       'Action mode for smooth, steady, handheld videos',
//     ],
//     price: '139900',
//     category: 'SmartPhones & Basic Mobiles',
//     variants: {
//       colors: [
//         {
//           img: 'https://m.media-amazon.com/images/I/110waksaerL._SS36_.jpg',
//           color: 'Deep Purple',
//         },
//         {
//           img: 'https://m.media-amazon.com/images/I/01byr1bQy5L._SS36_.jpg',
//           color: 'Gold',
//         },
//         {
//           img: 'https://m.media-amazon.com/images/I/01O-vnAecgL._SS36_.jpg',
//           color: 'Silver',
//         },
//         {
//           img: 'https://m.media-amazon.com/images/I/11Z5UjmqOvL._SS36_.jpg',
//           color: 'Space Black',
//         },
//       ],
//       sizes: ['1 TB', '128 GB', '256 GB', '512 GB'],
//     },
//     imgs: {
//       thumbnail: 'https://m.media-amazon.com/images/I/71yzJoE7WlL._SX679_.jpg',
//       product_imgs: [
//         'https://m.media-amazon.com/images/G/31/HomeCustomProduct/360_icon_73x73v2._CB485971317_SX38_SY50_CR,0,0,38,50_FMpng_RI_.png',
//         'https://m.media-amazon.com/images/I/31GmCJTD0GL._SX38_SY50_CR,0,0,38,50_.jpg',
//         'https://m.media-amazon.com/images/I/31rbfkFguWL._SX35_SY46._CR0,0,35,46_BG85,85,85_BR-120_PKdp-play-icon-overlay__.jpg',
//         'https://m.media-amazon.com/images/I/2191kA6QMaL._SX38_SY50_CR,0,0,38,50_.jpg',
//         'https://m.media-amazon.com/images/I/41MSfEb+VuL._SX38_SY50_CR,0,0,38,50_.jpg',
//         'https://m.media-amazon.com/images/I/41Egk8TQzSL._SX38_SY50_CR,0,0,38,50_.jpg',
//         'https://m.media-amazon.com/images/I/51VlqNpoMeL._SX38_SY50_CR,0,0,38,50_.jpg',
//         'https://m.media-amazon.com/images/I/319ks7Vl9cL._SX38_SY50_CR,0,0,38,50_.jpg',
//         'https://m.media-amazon.com/images/I/71yzJoE7WlL._SX679_.jpg',
//       ],
//       product_spec_imgs: [
//         'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/2022/i14/Aplus_14pro/iPhone_14_Pro_Product_Page_Flex_Module_Avail_Amazon_Desktop__en-IN_01._CB609619398_.jpg',
//         'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/2022/i14/Aplus_14pro/iPhone_14_Pro_Product_Page_Flex_Module_Avail_Amazon_Desktop__en-IN_02._CB609619398_.jpg',
//         'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/2022/i14/Aplus_14pro/iPhone_14_Pro_Product_Page_Flex_Module_Avail_Amazon_Desktop__en-IN_03._CB609619398_.jpg',
//         'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/2022/i14/Aplus_14pro/iPhone_14_Pro_Product_Page_Flex_Module_Avail_Amazon_Desktop__en-IN_04._CB609619398_.jpg',
//         'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/2022/i14/Aplus_14pro/iPhone_14_Pro_Product_Page_Flex_Module_Avail_Amazon_Desktop__en-IN_05._CB609619398_.jpg',
//         'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/2022/i14/Aplus_14pro/iPhone_14_Pro_Product_Page_Flex_Module_Avail_Amazon_Desktop__en-IN_06._CB609619398_.jpg',
//         'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/2022/i14/Aplus_14pro/iPhone_14_Pro_Product_Page_Flex_Module_Avail_Amazon_Desktop__en-IN_07._CB609619398_.jpg',
//         'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/2022/i14/Aplus_14pro/iPhone_14_Pro_Product_Page_Flex_Module_Avail_Amazon_Desktop__en-IN_08._CB609619398_.jpg',
//         'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/2022/i14/Aplus_14pro/iPhone_14_Pro_Product_Page_Flex_Module_Avail_Amazon_Desktop__en-IN_09._CB609619398_.jpg',
//       ],
//     },
//     attrs: [
//       {
//         brand: 'Apple',
//       },
//       {
//         model_name: 'IPhone',
//       },
//       {
//         network_service_provider: 'Unlocked for All Carriers',
//       },
//       {
//         operating_system: 'IOS',
//       },
//       {
//         cellular_technology: '5G',
//       },
//     ],
//   },
//   {
//     title: 'Apple iPhone 12 (128GB) - White',
//     description: [
//       '6.1-inch (15.5 cm diagonal) Super Retina XDR display',
//       'Ceramic Shield, tougher than any smartphone glass',
//       'A14 Bionic chip, the fastest chip ever in a smartphone',
//       'Advanced dual-camera system with 12MP Ultra Wide and Wide cameras; Night mode, Deep Fusion, Smart HDR 3, 4K Dolby Vision HDR recording',
//       '12MP TrueDepth front camera with Night mode, 4K Dolby Vision HDR recording',
//       'Industry-leading IP68 water resistance',
//       'Supports MagSafe accessories for easy attach and faster wireless charging',
//       'iOS with redesigned widgets on the Home screen, all-new App Library, App Clips and more',
//     ],
//     price: '57900',
//     category: 'SmartPhones & Basic Mobiles',
//     variants: {
//       colors: [
//         {
//           img: 'https://m.media-amazon.com/images/I/216SM1ek5NL._SS36_.jpg',
//           color: '(PRODUCT)RED',
//         },
//         {
//           img: 'https://m.media-amazon.com/images/I/11-vGMP430L._SS36_.jpg',
//           color: 'Black',
//         },
//         {
//           img: 'https://m.media-amazon.com/images/I/11fz+rFWQiL._SS36_.jpg',
//           color: 'Green',
//         },
//         {
//           img: 'https://m.media-amazon.com/images/I/11ooLJcPp0L._SS36_.jpg',
//           color: 'White',
//         },
//         {
//           img: 'https://m.media-amazon.com/images/I/217XcU3LauL._SS36_.jpg',
//           color: 'Blue',
//         },
//         {
//           img: 'https://m.media-amazon.com/images/I/11YY8uKyebS._SS36_.jpg',
//           color: 'Purple',
//         },
//       ],
//       sizes: ['64GB', '128GB', '256GB'],
//     },
//     imgs: {
//       thumbnail:
//         'https://m.media-amazon.com/images/I/317JiGToz-L._SY445_SX342_QL70_FMwebp_.jpg',
//       product_imgs: [
//         'https://m.media-amazon.com/images/G/31/HomeCustomProduct/360_icon_73x73v2._CB485971317_SX38_SY50_CR,0,0,38,50_FMpng_RI_.png',
//         'https://m.media-amazon.com/images/I/317JiGToz-L._SX38_SY50_CR,0,0,38,50_.jpg',
//         'https://m.media-amazon.com/images/I/91ewXAzTtGL._SX35_SY46._CR0,0,35,46_BG85,85,85_BR-120_PKdp-play-icon-overlay__.png',
//         'https://m.media-amazon.com/images/I/31-gIg+D+qL._SX38_SY50_CR,0,0,38,50_.jpg',
//         'https://m.media-amazon.com/images/I/41LGQ7JRlVL._SX38_SY50_CR,0,0,38,50_.jpg',
//         'https://m.media-amazon.com/images/I/41whFEzDzvL._SX38_SY50_CR,0,0,38,50_.jpg',
//         'https://m.media-amazon.com/images/I/31ti3okPgEL._SX38_SY50_CR,0,0,38,50_.jpg',
//         'https://m.media-amazon.com/images/I/317JiGToz-L._SY445_SX342_QL70_FMwebp_.jpg',
//       ],
//       product_spec_imgs: [
//         'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/Aplus_content/12_Q4_21/iPhone_12_Product_Page_Flex_Module_Amazon_Desktop_Avail_v1__en-IN_01._CB650646856_.jpg',
//         'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/Aplus_content/12_Q4_21/iPhone_12_Product_Page_Flex_Module_Amazon_Desktop_Avail_v1__en-IN_02._CB650646856_.jpg',
//         'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/Aplus_content/12_Q4_21/iPhone_12_Product_Page_Flex_Module_Amazon_Desktop_Avail_v1__en-IN_03._CB650646856_.jpg',
//         'https://m.media-amazon.com/images/G/31/img21/Wireless/Apple/Purple/PDP/Desktop/IN_r1307_r1306_Marketing_Page_Amazon_1500_FFH_04._CB670248208_.jpg',
//         'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/Aplus_content/12_Q4_21/iPhone_12_Product_Page_Flex_Module_Amazon_Desktop_Avail_v1__en-IN_05._CB650646856_.jpg',
//         'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/Aplus_content/12_Q4_21/iPhone_12_Product_Page_Flex_Module_Amazon_Desktop_Avail_v1__en-IN_06._CB650646856_.jpg',
//         'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/Aplus_content/12_Q4_21/iPhone_12_Product_Page_Flex_Module_Amazon_Desktop_Avail_v1__en-IN_07._CB650646856_.jpg',
//         'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/Aplus_content/12_Q4_21/iPhone_12_Product_Page_Flex_Module_Amazon_Desktop_Avail_v1__en-IN_08._CB650646856_.jpg',
//         'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/Aplus_content/12_Q4_21/iPhone_12_Product_Page_Flex_Module_Amazon_Desktop_Avail_v1__en-IN_09._CB650646856_.jpg',
//       ],
//     },
//     attrs: [
//       {
//         brand: 'Apple',
//       },
//       {
//         model_name: 'IPhone 12 128GB White',
//       },
//       {
//         operating_system: 'IOS 14',
//       },
//       {
//         cellular_technology: '5G',
//       },
//       {
//         memory_storage_capacity: '128 GB',
//       },
//     ],
//   },
//   {
//     title: 'Apple iPhone 11 (128GB) - Black',
//     description: [
//       '6.1-inch (15.5 cm diagonal) Liquid Retina HD LCD display',
//       'Water and dust resistant (2 meters for up to 30 minutes, IP68)',
//       'Dual-camera system with 12MP Ultra Wide and Wide cameras; Night mode, Portrait mode, and 4K video up to 60fps',
//       '12MP TrueDepth front camera with Portrait mode, 4K video, and Slo-Mo',
//       'Face ID for secure authentication',
//       'A13 Bionic chip with third-generation Neural Engine',
//       'Fast-charge capable',
//       'Wireless charging',
//       'As part of our efforts to reach our environmental goals, iPhone no longer includes a power adapter or EarPods. Please use your existing Apple power adapter and headphones or buy these accessories separately',
//     ],
//     price: '46999',
//     category: 'SmartPhones & Basic Mobiles',
//     variants: {
//       colors: [
//         {
//           img: 'https://m.media-amazon.com/images/I/11-vGMP430L._SS36_.jpg',
//           color: 'Black',
//         },
//         {
//           img: 'https://m.media-amazon.com/images/I/11BModRrnYL._SS36_.jpg',
//           color: 'Purple',
//         },
//       ],
//       sizes: [],
//     },
//     imgs: {
//       thumbnail:
//         'https://m.media-amazon.com/images/I/41FqG3cHV9L._SY445_SX342_QL70_FMwebp_.jpg',
//       product_imgs: [
//         'https://m.media-amazon.com/images/G/31/HomeCustomProduct/360_icon_73x73v2._CB485971317_SX38_SY50_CR,0,0,38,50_FMpng_RI_.png',
//         'https://m.media-amazon.com/images/I/41FqG3cHV9L._SX38_SY50_CR,0,0,38,50_.jpg',
//         'https://m.media-amazon.com/images/I/51zxPx7gQRL._SX35_SY46._CR0,0,35,46_BG85,85,85_BR-120_PKdp-play-icon-overlay__.jpg',
//         'https://m.media-amazon.com/images/I/31Dk3b3XuoL._SX38_SY50_CR,0,0,38,50_.jpg',
//         'https://m.media-amazon.com/images/I/31Z1aWp7VCL._SX38_SY50_CR,0,0,38,50_.jpg',
//         'https://m.media-amazon.com/images/I/51bSyHs3YPL._SX38_SY50_CR,0,0,38,50_.jpg',
//         'https://m.media-amazon.com/images/I/41sYbvqVKEL._SX38_SY50_CR,0,0,38,50_.jpg',
//         'https://m.media-amazon.com/images/I/311bD5-O9WL._SX38_SY50_CR,0,0,38,50_.jpg',
//         'https://m.media-amazon.com/images/I/41FqG3cHV9L._SY445_SX342_QL70_FMwebp_.jpg',
//       ],
//       product_spec_imgs: [
//         'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/River_Page/i11/iPhone_11_Product_Page_Flex_Module_Amazon_Avail_Desktop__en-IN_01._CB640265849_.jpg',
//         'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/River_Page/i11/iPhone_11_Product_Page_Flex_Module_Amazon_Avail_Desktop__en-IN_02._CB640265849_.jpg',
//         'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/River_Page/i11/iPhone_11_Product_Page_Flex_Module_Amazon_Avail_Desktop__en-IN_03._CB640265849_.jpg',
//         'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/River_Page/i11/iPhone_11_Product_Page_Flex_Module_Amazon_Avail_Desktop__en-IN_04._CB640265849_.jpg',
//         'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/River_Page/i11/iPhone_11_Product_Page_Flex_Module_Amazon_Avail_Desktop__en-IN_05._CB640265849_.jpg',
//         'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/River_Page/i11/iPhone_11_Product_Page_Flex_Module_Amazon_Avail_Desktop__en-IN_06._CB640265849_.jpg',
//         'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/River_Page/i11/iPhone_11_Product_Page_Flex_Module_Amazon_Avail_Desktop__en-IN_07._CB640265849_.jpg',
//         'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/River_Page/i11/iPhone_11_Product_Page_Flex_Module_Amazon_Avail_Desktop__en-IN_08._CB640265849_.jpg',
//         'https://m.media-amazon.com/images/G/31/img21/Wireless/katariy/Apple/River_Page/i11/iPhone_11_Product_Page_Flex_Module_Amazon_Avail_Desktop__en-IN_09._CB640265849_.jpg',
//       ],
//     },
//     attrs: [
//       {
//         brand: 'Apple',
//       },
//       {
//         model_name: 'IPhone 11',
//       },
//       {
//         network_service_provider: 'Unlocked for All Carriers',
//       },
//       {
//         operating_system: 'IOS 14',
//       },
//       {
//         cellular_technology: '4G',
//       },
//     ],
//   },
//   {
//     title:
//       'Samsung Galaxy S22 5G (Phantom White, 8GB RAM, 128GB Storage) with No Cost EMI/Additional Exchange Offers',
//     description: [
//       'Pro-grade Camera that lets you make your nights epic with Nightography: It’s our brightest innovation yet. The sensor pulls in more light, the Super Clear Glass dials down lens flare, and fast-acting AI delivers near-instant intelligent processing.',
//       'VisionBooster outshines the sun: Stunning 120Hz Dynamic AMOLED 2X display is crafted specifically for high outdoor visibility, keeping the view clear in bright daylight.',
//       '4nm processor, our fastest chip yet: Our fastest, most powerful chip ever. That means, a faster CPU and GPU compared to Galaxy S21 Ultra. It’s an epic leap for smartphone technology.',
//       'Sleek design in a range of colors lets you express yourself how you like. The slim bezels flow into a symmetrical polished frame for an expansive, balanced display. Corning Gorilla Glass Victus+ on the screen and back panels.',
//       'Connector type: usb type c',
//     ],
//     price: '57999',
//     category: 'SmartPhones & Basic Mobiles',
//     variants: {
//       colors: [
//         {
//           img: 'https://m.media-amazon.com/images/I/51jWftRoSHL._SS36_.jpg',
//           color: 'Green',
//         },
//         {
//           img: 'https://m.media-amazon.com/images/I/11krcr5W0SL._SS36_.jpg',
//           color: 'Phantom Black',
//         },
//         {
//           img: 'https://m.media-amazon.com/images/I/41mt0QQkvKL._SS36_.jpg',
//           color: 'Phantom White',
//         },
//       ],
//       sizes: ['8GB RAM + 128GB Storage', '8GB RAM + 256GB Storage'],
//     },
//     imgs: {
//       thumbnail:
//         'https://m.media-amazon.com/images/I/41mt0QQkvKL._SX300_SY300_QL70_FMwebp_.jpg',
//       product_imgs: [
//         'https://m.media-amazon.com/images/G/31/HomeCustomProduct/360_icon_73x73v2._CB485971317_SX38_SY50_CR,0,0,38,50_FMpng_RI_.png',
//         'https://m.media-amazon.com/images/I/41mt0QQkvKL._SX38_SY50_CR,0,0,38,50_.jpg',
//         'https://m.media-amazon.com/images/I/51-oNCJXfUL.SX38_SY50_CR,0,0,38,50_BG85,85,85_BR-120_PKdp-play-icon-overlay__.jpg',
//         'https://m.media-amazon.com/images/I/41GGdtZ4dNL._SX38_SY50_CR,0,0,38,50_.jpg',
//         'https://m.media-amazon.com/images/I/51qyKcmZxVL._SX38_SY50_CR,0,0,38,50_.jpg',
//         'https://m.media-amazon.com/images/I/31umoKBPE2L._SX38_SY50_CR,0,0,38,50_.jpg',
//         'https://m.media-amazon.com/images/I/411rX8TpTEL._SX38_SY50_CR,0,0,38,50_.jpg',
//         'https://m.media-amazon.com/images/I/31Eog40DTbL._SX38_SY50_CR,0,0,38,50_.jpg',
//         'https://m.media-amazon.com/images/I/41mt0QQkvKL._SX300_SY300_QL70_FMwebp_.jpg',
//       ],
//       product_spec_imgs: [],
//     },
//     attrs: [
//       {
//         brand: 'Samsung',
//       },
//       {
//         model_name: 'Samsung Galaxy S22 5G',
//       },
//       {
//         network_service_provider: 'Unlocked for All Carriers',
//       },
//       {
//         os: 'Android 12',
//       },
//       {
//         cellular_technology: '5G',
//       },
//     ],
//   },

//   {
//     title:
//       'Samsung Galaxy S20 FE 5G (Cloud Navy, 8GB RAM, 128GB Storage) with No Cost EMI & Additional Exchange Offers',
//     description: [
//       '5G Ready powered by Qualcomm Snapdragon 865 Octa-Core processor, 8GB RAM, 128GB internal memory expandable up to 1TB, Android 11.0 operating system and dual SIM',
//       'Triple Rear Camera Setup - 12MP (Dual Pixel) OIS F1.8 Wide Rear Camera + 8MP OIS Tele Camera + 12MP Ultra Wide | 30X Space Zoom, Single Take & Night Mode | 32MP F2.2 Front Punch Hole Camera',
//       '6.5-inch(16.40 centimeters) Infinity-O Super AMOLED Display with 120Hz Refresh rate, 1080 x 2400 (FHD+) Resolution "',
//       '4500 mAh battery (Non -removable) with Super Fast Charging, FAst Wireless Charging & Finger Print sensor',
//       'IP68 Rated, MicroSD Card Slot (Expandable upto 1 TB), Dual Nano Sim, Hybrid Sim Slot, 5G+5G Dual stand by',
//     ],
//     price: '37990',
//     category: 'SmartPhones & Basic Mobiles',
//     variants: {
//       colors: [
//         {
//           img: 'https://m.media-amazon.com/images/I/41ezRvTwcaL._SS36_.jpg',
//           color: 'Cloud Navy',
//         },
//         {
//           img: 'https://m.media-amazon.com/images/I/41CkKbseMGL._SS36_.jpg',
//           color: 'Cloud Green',
//         },
//         {
//           img: 'https://m.media-amazon.com/images/I/410iWt8d79L._SS36_.jpg',
//           color: 'Cloud Lavender',
//         },
//         {
//           img: 'https://m.media-amazon.com/images/I/41CkKbseMGL._SS36_.jpg',
//           color: 'Green',
//         },
//         {
//           img: 'https://m.media-amazon.com/images/I/410iWt8d79L._SS36_.jpg',
//           color: 'Lavender',
//         },
//         {
//           img: 'https://m.media-amazon.com/images/I/41ezRvTwcaL._SS36_.jpg',
//           color: 'Navy',
//         },
//       ],
//       sizes: ['8GB', '8GB RAM + 128GB Storage', '8GB+128Gb'],
//     },
//     imgs: {
//       thumbnail:
//         'https://m.media-amazon.com/images/I/41ezRvTwcaL._SX300_SY300_QL70_FMwebp_.jpg',
//       product_imgs: [
//         'https://m.media-amazon.com/images/G/31/HomeCustomProduct/360_icon_73x73v2._CB485971317_SX38_SY50_CR,0,0,38,50_FMpng_RI_.png',
//         'https://m.media-amazon.com/images/I/41ezRvTwcaL._SX38_SY50_CR,0,0,38,50_.jpg',
//         'https://m.media-amazon.com/images/I/51vKpohV4sL.SX38_SY50_CR,0,0,38,50_BG85,85,85_BR-120_PKdp-play-icon-overlay__.jpg',
//         'https://m.media-amazon.com/images/I/51NOXCFIpqL._SX38_SY50_CR,0,0,38,50_.jpg',
//         'https://m.media-amazon.com/images/I/41MK2GpSCQL._SX38_SY50_CR,0,0,38,50_.jpg',
//         'https://m.media-amazon.com/images/I/31w1DJIrFgL._SX38_SY50_CR,0,0,38,50_.jpg',
//         'https://m.media-amazon.com/images/I/41ankmEMJ2L._SX38_SY50_CR,0,0,38,50_.jpg',
//         'https://m.media-amazon.com/images/I/31+182it6FL._SX38_SY50_CR,0,0,38,50_.jpg',
//         'https://m.media-amazon.com/images/I/41ezRvTwcaL._SX300_SY300_QL70_FMwebp_.jpg',
//       ],
//       product_spec_imgs: [],
//     },
//     attrs: [
//       {
//         brand: 'Samsung',
//       },
//       {
//         model_name: 'Samsung Galaxy S20 FE 5G',
//       },
//       {
//         network_service_provider: 'VoiceStream Wireless Provider Type',
//       },
//       {
//         os: 'Android 11;Android 11.0, Android 11',
//       },
//       {
//         cellular_technology: '5G',
//       },
//     ],
//   },
//   {
//     title:
//       'Samsung Galaxy S22 Ultra 5G (Burgundy, 12GB, 256GB Storage) with No Cost EMI/Additional Exchange Offers',
//     description: [
//       'The first Galaxy S with embedded S Pen. Write comfortably like pen on paper, turn quick notes into legible text and use Air Actions to control your phone remotely. Improved latency in Samsung Notes makes every pen stroke feel as natural as ink on paper — and you can convert those hastily written ideas into legible text.',
//       '5G Ready powered by Galaxy’s first 4nm processor. Our fastest, most powerful chip ever. That means, a faster CPU and GPU compared to Galaxy S21 Ultra. It’s an epic leap for smartphone technology.',
//       "The Dynamic AMOLED 2x display improves outdoor visibility with up to 1750 nits in peak brightness.* And the 120Hz adaptive refresh rate keeps the scroll smooth, adjusting to what's on screen for an optimized view.",
//       "Our most advanced Pro-grade Camera yet, packing the power of a professional's kit in one handheld device. Also lets you make your nights epic with Nightography: The sensor pulls in more light, the Super Clear Lens tones down lens flare, and fast-acting AI delivers near-instant intelligent processing.",
//       'Connector type: usb type c',
//     ],
//     price: '109999',
//     category: 'laptops',
//     variants: {
//       colors: [
//         {
//           img: 'https://m.media-amazon.com/images/I/61SL31LIauL._SS36_.jpg',
//           color: 'Dark Red',
//         },
//         {
//           img: 'https://m.media-amazon.com/images/I/41ntGH88Z2L._SS36_.jpg',
//           color: 'Green',
//         },
//         {
//           img: 'https://m.media-amazon.com/images/I/61YEJpbkaRL._SS36_.jpg',
//           color: 'Phantom Black',
//         },
//         {
//           img: 'https://m.media-amazon.com/images/I/41SEA5N7DTL._SS36_.jpg',
//           color: 'Phantom White',
//         },
//         {
//           img: 'https://m.media-amazon.com/images/I/41QPv5h1veL._SS36_.jpg',
//           color: 'Burgundy',
//         },
//       ],
//       sizes: ['12GB RAM + 256GB Storage', '12GB RAM + 512GB Storage'],
//     },
//     imgs: {
//       thumbnail: 'https://m.media-amazon.com/images/I/71J8tz0UeJL._SX522_.jpg',
//       product_imgs: [
//         'https://m.media-amazon.com/images/G/31/HomeCustomProduct/360_icon_73x73v2._CB485971317_SX38_SY50_CR,0,0,38,50_FMpng_RI_.png',
//         'https://m.media-amazon.com/images/I/41QPv5h1veL._SX38_SY50_CR,0,0,38,50_.jpg',
//         'https://m.media-amazon.com/images/I/61uk-+cONKL.SX38_SY50_CR,0,0,38,50_BG85,85,85_BR-120_PKdp-play-icon-overlay__.jpg',
//         'https://m.media-amazon.com/images/I/513zpPsHmWL._SX38_SY50_CR,0,0,38,50_.jpg',
//         'https://m.media-amazon.com/images/I/41GUtRgGdTL._SX38_SY50_CR,0,0,38,50_.jpg',
//         'https://m.media-amazon.com/images/I/617SHUskQXL._SX38_SY50_CR,0,0,38,50_.jpg',
//         'https://m.media-amazon.com/images/I/41Kx606aaXL._SX38_SY50_CR,0,0,38,50_.jpg',
//         'https://m.media-amazon.com/images/I/31TnXtYT1DL._SX38_SY50_CR,0,0,38,50_.jpg',
//         'https://m.media-amazon.com/images/I/71J8tz0UeJL._SX522_.jpg',
//       ],
//       product_spec_imgs: [],
//     },
//     attrs: [
//       {
//         brand: 'Samsung',
//       },
//       {
//         model_name: 'Samsung Galaxy S22 Ultra 5G',
//       },
//       {
//         network_service_provider: 'Unlocked for All Carriers',
//       },
//       {
//         os: 'Android 12',
//       },
//       {
//         cellular_technology: '5G',
//       },
//     ],
//   },
//   {
//     title:
//       'Samsung Galaxy Z Fold4 5G (Beige, 12GB RAM, 256GB Storage) with No Cost EMI/Additional Exchange Offers',
//     description: [
//       "Stands out. Stands up. Unfolds. The Galaxy Z Fold4 does a lot in one hand with its 15.73 cm(6.2-inch) Cover Screen. Unfolded, the 19.21 cm(7.6-inch) Main Screen lets you really get into the zone. Pushed-back bezels and the Under Display Camera means there's more screen and no black dot getting between you and the breathtaking Infinity Flex Display.",
//       'Do more than more with Multi View. Whether toggling between texts or catching up on emails, take full advantage of the expansive Main Screen with Multi View. PC-like power in your pocket transforms apps optimized with One UI to give you menus and more in a glance',
//       "New Taskbar for PC-like multitasking. Wipe out tasks in fewer taps. Add apps to the Taskbar for quick navigation and bouncing between windows when you're in the groove.4 And with App Pair, one tap launches up to three apps, all sharing one super-productive screen",
//       "Our toughest Samsung Galaxy foldables ever. From the inside out, Galaxy Z Fold4 is made with materials that are not only stunning, but stand up to life's bumps and fumbles. The front and rear panels, made with exclusive Corning Gorilla Glass Victus+, are ready to resist sneaky scrapes and scratches. With our toughest aluminum frame made with Armor Aluminum, this is one durable smartphone.",
//       "World’s first water resistant foldable smartphones. Be adventurous, rain or shine. You don't have to sweat the forecast when you've got one of the world's first water-resistant foldable smartphones.",
//     ],
//     price: '154998',
//     category: 'SmartPhones & Basic Mobiles',
//     variants: {
//       colors: [
//         {
//           img: 'https://m.media-amazon.com/images/I/51PheHVbbuL._SS36_.jpg',
//           color: 'Beige',
//         },
//         {
//           img: 'https://m.media-amazon.com/images/I/41P4+pgIcOL._SS36_.jpg',
//           color: 'Graygreen',
//         },
//         {
//           img: 'https://m.media-amazon.com/images/I/51WR6BgZsdL._SS36_.jpg',
//           color: 'Phantom Black',
//         },
//       ],
//       sizes: ['12GB RAM + 256GB Storage', '12GB RAM + 512GB Storage'],
//     },
//     imgs: {
//       thumbnail:
//         'https://m.media-amazon.com/images/I/412duTxQyhL._SX300_SY300_QL70_FMwebp_.jpg',
//       product_imgs: [
//         'https://m.media-amazon.com/images/G/31/HomeCustomProduct/360_icon_73x73v2._CB485971317_SX38_SY50_CR,0,0,38,50_FMpng_RI_.png',
//         'https://m.media-amazon.com/images/I/412duTxQyhL._SX38_SY50_CR,0,0,38,50_.jpg',
//         'https://m.media-amazon.com/images/I/51EcN1gwABL.SX38_SY50_CR,0,0,38,50_BG85,85,85_BR-120_PKdp-play-icon-overlay__.jpg',
//         'https://m.media-amazon.com/images/I/410E9jH6exL._SX38_SY50_CR,0,0,38,50_.jpg',
//         'https://m.media-amazon.com/images/I/41AnY+PGokL._SX38_SY50_CR,0,0,38,50_.jpg',
//         'https://m.media-amazon.com/images/I/41K+10kvHYL._SX38_SY50_CR,0,0,38,50_.jpg',
//         'https://m.media-amazon.com/images/I/41oGYXYjYwL._SX38_SY50_CR,0,0,38,50_.jpg',
//         'https://m.media-amazon.com/images/I/412duTxQyhL._SX300_SY300_QL70_FMwebp_.jpg',
//       ],
//       product_spec_imgs: [],
//     },
//     attrs: [
//       {
//         brand: 'Samsung',
//       },
//       {
//         model_name: 'Samsung Galaxy Z Fold4 5G',
//       },
//       {
//         network_service_provider: 'Unlocked for All Carriers',
//       },
//       {
//         os: 'Android 12.0',
//       },
//       {
//         cellular_technology: '5G',
//       },
//     ],
//   },
//   {
//     title:
//       '2020 Apple MacBook Air Laptop: Apple M1 chip, 13.3-inch/33.74 cm Retina Display, 8GB RAM, 256GB SSD Storage, Backlit Keyboard, FaceTime HD Camera, Touch ID. Works with iPhone/iPad; Space Grey',
//     description: [
//       'All-Day Battery Life – Go longer than ever with up to 18 hours of battery life.',
//       'Powerful Performance – Take on everything from professional-quality editing to action-packed gaming with ease. The Apple M1 chip with an 8-core CPU delivers up to 3.5x faster performance than the previous generation while using way less power.',
//       'Superfast Memory – 8GB of unified memory makes your entire system speedy and responsive. That way it can support tasks like memory-hogging multitab browsing and opening a huge graphic file quickly and easily.',
//       'Stunning Display – With a 13.3-inch/33.74 cm Retina display, images come alive with new levels of realism. Text is sharp and clear, and colors are more vibrant.',
//       'Why Mac – Easy to learn. Easy to set up. Astoundingly powerful. Intuitive. Packed with apps to use right out of the box. Mac is designed to let you work, play, and create like never before.',
//       'Simply Compatible – All your existing apps work, including Adobe Creative Cloud, Microsoft 365, and Google Drive. Plus you can use your favorite iPhone and iPad apps directly on macOS. Altogether you’ll have access to the biggest collection of apps ever for Mac. All available on the App Store.',
//       'Easy to Learn – If you already have an iPhone, MacBook Air feels familiar from the moment you turn it on. And it works perfectly with all your Apple devices. Use your iPad to extend the workspace of your Mac, answer texts and phone calls directly on your Mac, and more.',
//       'Fanless Design – Your MacBook Air stays cool and runs quietly even while tackling intense workloads.',
//       'AppleCare – Every Mac comes with a one-year limited warranty and up to 90 days of complimentary technical support. Get AppleCare+ to extend your coverage and reduce the stress and cost of unexpected repairs.',
//       'Environmentally Friendly – MacBook Air is made with a 100% recycled aluminum enclosure and uses less energy for a smaller carbon footprint',
//     ],
//     price: '88490',
//     category: 'laptops',
//     variants: {
//       colors: [
//         {
//           img: 'https://m.media-amazon.com/images/I/11z272hbPUL._SS36_.jpg',
//           color: 'Silver',
//         },
//         {
//           img: 'https://m.media-amazon.com/images/I/11+37-+oQ9L._SS36_.jpg',
//           color: 'Gold',
//         },
//         {
//           img: 'https://m.media-amazon.com/images/I/11LRdTsNcJL._SS36_.jpg',
//           color: 'Space Grey',
//         },
//       ],
//       sizes: ['256 GB', '512GB'],
//     },
//     imgs: {
//       thumbnail:
//         'https://m.media-amazon.com/images/I/316ArzLeJ2L._SY445_SX342_QL70_FMwebp_.jpg',
//       product_imgs: [
//         'https://m.media-amazon.com/images/G/31/HomeCustomProduct/360_icon_73x73v2._CB485971317_SX38_SY50_CR,0,0,38,50_FMpng_RI_.png',
//         'https://m.media-amazon.com/images/I/316ArzLeJ2L._SX38_SY50_CR,0,0,38,50_.jpg',
//         'https://m.media-amazon.com/images/I/61B1rYhCGzL._SX35_SY46._CR0,0,35,46_BG85,85,85_BR-120_PKdp-play-icon-overlay__.jpg',
//         'https://m.media-amazon.com/images/I/410Is8X6jSL._SX38_SY50_CR,0,0,38,50_.jpg',
//         'https://m.media-amazon.com/images/I/417bLev2AmL._SX38_SY50_CR,0,0,38,50_.jpg',
//         'https://m.media-amazon.com/images/I/21cr-m0oDgL._SX38_SY50_CR,0,0,38,50_.jpg',
//         'https://m.media-amazon.com/images/I/21S4-+VSllL._SX38_SY50_CR,0,0,38,50_.jpg',
//         'https://m.media-amazon.com/images/I/31uDXnoCg6L._SX38_SY50_CR,0,0,38,50_.jpg',
//         'https://m.media-amazon.com/images/I/316ArzLeJ2L._SY445_SX342_QL70_FMwebp_.jpg',
//       ],
//       product_spec_imgs: [
//         'https://m.media-amazon.com/images/G/31/img20/Laptops/Apple_EYE_2020/11-11-2020/Macbook_Air/PC/Aplus/IN_r1332_Marketing-Page_L_FFH_01._CB415712569_.jpg',
//         'https://m.media-amazon.com/images/G/31/img20/Laptops/Apple_EYE_2020/11-11-2020/Macbook_Air/PC/Aplus/IN_r1332_Marketing-Page_L_FFH_02._CB415712569_.jpg',
//         'https://m.media-amazon.com/images/G/31/img20/Laptops/Apple_EYE_2020/11-11-2020/Macbook_Air/PC/Aplus/IN_r1332_Marketing-Page_L_FFH_03._CB415712569_.jpg',
//         'https://m.media-amazon.com/images/G/31/img20/Laptops/Apple_EYE_2020/11-11-2020/Macbook_Air/PC/Aplus/IN_r1332_Marketing-Page_L_FFH_04._CB415712569_.jpg',
//         'https://m.media-amazon.com/images/G/31/img20/Laptops/Apple_EYE_2020/11-11-2020/Macbook_Air/PC/Aplus/IN_r1332_Marketing-Page_L_FFH_05._CB415712569_.jpg',
//         'https://m.media-amazon.com/images/G/31/img20/Laptops/Apple_EYE_2020/11-11-2020/Macbook_Air/PC/Aplus/IN_r1332_Marketing-Page_L_FFH_06._CB415712569_.jpg',
//         'https://m.media-amazon.com/images/G/31/img20/Laptops/Apple_EYE_2020/11-11-2020/Macbook_Air/PC/Aplus/IN_r1332_Marketing-Page_L_FFH_07._CB415712569_.jpg',
//         'https://m.media-amazon.com/images/G/31/img20/Laptops/Apple_EYE_2020/11-11-2020/Macbook_Air/PC/Aplus/IN_r1332_Marketing-Page_L_FFH_08._CB415712569_.jpg',
//         'https://m.media-amazon.com/images/G/31/img20/Laptops/Apple_EYE_2020/11-11-2020/Macbook_Air/PC/Aplus/IN_r1332_Marketing-Page_L_FFH_09._CB415712569_.jpg',
//       ],
//     },
//     attrs: [
//       {
//         brand: 'Apple',
//       },
//       {
//         model_name: 'MacBook Air',
//       },
//       {
//         screen_size: '13 Inches',
//       },
//       {
//         colour: 'Space Grey',
//       },
//       {
//         cpu_model: 'Core M Family',
//       },
//       {
//         ram_memory_installed_size: '8 GB',
//       },
//       {
//         operating_system: 'MacOS 10.14 Mojave',
//       },
//       {
//         special_feature: 'Portable',
//       },
//       {
//         graphics_card_description: 'Integrated',
//       },
//       {
//         cpu_speed: '3.1 GHz',
//       },
//     ],
//   },
//   {
//     title:
//       '2021 Apple MacBook Pro (16-inch/41.05 cm, Apple M1 Max chip with 10‑core CPU and 32‑core GPU, 32GB RAM, 1TB SSD) - Silver',
//     description: [
//       'Apple M1 Pro or M1 Max chip for a massive leap in CPU, GPU and machine learning performance',
//       'Up to 10-core CPU delivers up to 2x faster performance to fly through pro workflows quicker than ever',
//       'Up to 32-core GPU with up to 4x faster performance for graphics-intensive apps and games',
//       '16-core Neural Engine for up to 5x faster machine learning performance',
//       'Longer battery life, up to 21 hours',
//       'Up to 64GB of unified memory so everything you do is fast and fluid',
//       'Up to 8TB of super-fast SSD storage launches apps and opens files in an instant',
//       'Stunning 41.05 cm (16-inch) Liquid Retina XDR display with extreme dynamic range and contrast ratio',
//       '1080p FaceTime HD camera with advanced image signal processor for sharper video calls',
//       'Six-speaker sound system with force-cancelling woofers.',
//     ],
//     price: '306990',
//     category: 'laptops',
//     variants: {
//       colors: [
//         {
//           img: 'https://m.media-amazon.com/images/I/11z272hbPUL._SS36_.jpg',
//           color: 'Silver',
//         },
//         {
//           img: 'https://m.media-amazon.com/images/I/11LRdTsNcJL._SS36_.jpg',
//           color: 'Space Grey',
//         },
//       ],
//       sizes: ['1 TB', '512 GB'],
//     },
//     imgs: {
//       thumbnail:
//         'https://m.media-amazon.com/images/I/31zUXtO55tL._SY445_SX342_QL70_FMwebp_.jpg',
//       product_imgs: [
//         'https://m.media-amazon.com/images/G/31/HomeCustomProduct/360_icon_73x73v2._CB485971317_SX38_SY50_CR,0,0,38,50_FMpng_RI_.png',
//         'https://m.media-amazon.com/images/I/31zUXtO55tL._SX38_SY50_CR,0,0,38,50_.jpg',
//         'https://m.media-amazon.com/images/I/71St+t-rx0L._SX35_SY46._CR0,0,35,46_BG85,85,85_BR-120_PKdp-play-icon-overlay__.jpg',
//         'https://m.media-amazon.com/images/I/31sLrLI-dnL._SX38_SY50_CR,0,0,38,50_.jpg',
//         'https://m.media-amazon.com/images/I/31m8ROAxIKL._SX38_SY50_CR,0,0,38,50_.jpg',
//         'https://m.media-amazon.com/images/I/41rYKFZVYQL._SX38_SY50_CR,0,0,38,50_.jpg',
//         'https://m.media-amazon.com/images/I/41VXCHi8mjL._SX38_SY50_CR,0,0,38,50_.jpg',
//         'https://m.media-amazon.com/images/I/312YB13w0fL._SX38_SY50_CR,0,0,38,50_.jpg',
//         'https://m.media-amazon.com/images/I/31zUXtO55tL._SY445_SX342_QL70_FMwebp_.jpg',
//       ],
//       product_spec_imgs: [
//         'https://m.media-amazon.com/images/G/31/img21/Laptops/Apple-NPI/OCT21/r1464_r1465_Product_Page_Flex_Module_Amazon_Desktop_Avail_1500__en-IN_01._CB637671236_.jpg',
//         'https://m.media-amazon.com/images/G/31/img21/Laptops/Apple-NPI/OCT21/r1464_r1465_Product_Page_Flex_Module_Amazon_Desktop_Avail_1500__en-IN_02._CB637671236_.jpg',
//         'https://m.media-amazon.com/images/G/31/img21/Laptops/Apple-NPI/OCT21/r1464_r1465_Product_Page_Flex_Module_Amazon_Desktop_Avail_1500__en-IN_03._CB637671236_.jpg',
//         'https://m.media-amazon.com/images/G/31/img21/Laptops/Apple-NPI/OCT21/r1464_r1465_Product_Page_Flex_Module_Amazon_Desktop_Avail_1500__en-IN_04._CB637671236_.jpg',
//         'https://m.media-amazon.com/images/G/31/img21/Laptops/Apple-NPI/OCT21/r1464_r1465_Product_Page_Flex_Module_Amazon_Desktop_Avail_1500__en-IN_05._CB637671239_.jpg',
//         'https://m.media-amazon.com/images/G/31/img21/Laptops/Apple-NPI/OCT21/r1464_r1465_Product_Page_Flex_Module_Amazon_Desktop_Avail_1500__en-IN_06._CB637671239_.jpg',
//         'https://m.media-amazon.com/images/G/31/img21/Laptops/Apple-NPI/OCT21/r1464_r1465_Product_Page_Flex_Module_Amazon_Desktop_Avail_1500__en-IN_07._CB637671236_.jpg',
//         'https://m.media-amazon.com/images/G/31/img21/Laptops/Apple-NPI/OCT21/r1464_r1465_Product_Page_Flex_Module_Amazon_Desktop_Avail_1500__en-IN_08._CB637671236_.jpg',
//         'https://m.media-amazon.com/images/G/31/img21/Laptops/Apple-NPI/OCT21/r1464_r1465_Product_Page_Flex_Module_Amazon_Desktop_Avail_1500__en-IN_09._CB637671236_.jpg',
//       ],
//     },
//     attrs: [
//       {
//         brand: 'Apple',
//       },
//       {
//         model_name: 'MacBook Pro',
//       },
//       {
//         screen_size: '41.05 Centimetres',
//       },
//       {
//         colour: 'Silver',
//       },
//       {
//         cpu_model: 'Apple M1',
//       },
//       {
//         ram_memory_installed_size: '32 GB',
//       },
//       {
//         operating_system: 'MacOS 12 Monterey',
//       },
//       {
//         graphics_card_description: '32 Core GPU',
//       },
//       {
//         cpu_speed: '3.1 GHz',
//       },
//       {
//         hard_disk_description: 'SSD',
//       },
//     ],
//   },
//   {
//     title: "Campus Men's Maxico Running Shoes",
//     description: [],
//     price: { unit: '$', value: '669' },
//     category: 'Shoes',
//     brand: 'Campus',
//     variants: {
//       colors: [
//         {
//           img: 'https://m.media-amazon.com/images/I/31wHkAVviVL._SS47_.jpg',
//           color: 'BLU/LMN',
//         },
//         {
//           img: 'https://m.media-amazon.com/images/I/41R-XCoNJlL._SS47_.jpg',
//           color: 'BLU/RED',
//         },
//         {
//           img: 'https://m.media-amazon.com/images/I/41ANKBvsqJL._SS47_.jpg',
//           color: 'BLU/SKY',
//         },
//         {
//           img: 'https://m.media-amazon.com/images/I/41MWg7N4prL._SS47_.jpg',
//           color: 'CH.GRY/T.BLU',
//         },
//         {
//           img: 'https://m.media-amazon.com/images/I/418JEDj6iVL._SS47_.jpg',
//           color: 'MOD.BLU/BLU',
//         },
//       ],
//       sizes: [
//         '6 UK' ,
//         '8 UK' ,
//         '9 UK' ,
//         '10 UK' ,
//       ],
//     },
//     imgs: {
//       thumbnail: 'https://m.media-amazon.com/images/I/718lvALiK1L._UX675_.jpg',
//       product_imgs: [
//         'https://m.media-amazon.com/images/G/31/HomeCustomProduct/360_icon_73x73v2._CB485971317_SS40_FMpng_RI_.png',
//         'https://m.media-amazon.com/images/I/31wHkAVviVL._US40_.jpg',
//         'https://m.media-amazon.com/images/I/41tMut9Eo4L._US40_.jpg',
//         'https://m.media-amazon.com/images/I/41qZGl-E41L._US40_.jpg',
//         'https://m.media-amazon.com/images/I/31OmUxqcXnL._US40_.jpg',
//         'https://m.media-amazon.com/images/I/41YaajkfqKL._US40_.jpg',
//         'https://m.media-amazon.com/images/I/31ZBaPzwTmL._US40_.jpg',
//         'https://m.media-amazon.com/images/I/41EpF4AVeSL.SS40_PKmb-play-button-overlay-thumb_.jpg',
//         'https://m.media-amazon.com/images/I/718lvALiK1L._UX675_.jpg',
//         'https://m.media-amazon.com/images/I/71UDBmG9kbL._SY500._SX._UX._SY._UY_.jpg',
//       ],
//       product_spec_imgs: [
//         'https://m.media-amazon.com/images/S/aplus-media/sota/9554852c-f796-4187-b434-83c44f3be10a.__CR0,0,4043,2501_PT0_SX970_V1___.jpg',
//         'https://m.media-amazon.com/images/S/aplus-media/sota/b1d73cce-b969-4fdb-85a8-f14c18bcfdd6.__CR0,0,4043,1250_PT0_SX970_V1___.jpg',
//         'https://m.media-amazon.com/images/S/aplus-media/sota/5b3c4a1d-cf44-44ad-ae51-fd4f3b2627a9.__CR0,0,4043,1250_PT0_SX970_V1___.jpg',
//         'https://m.media-amazon.com/images/S/aplus-media/sota/dc4602ea-1677-40f6-8e74-40522616980b.__CR1,0,4042,2500_PT0_SX970_V1___.jpg',
//         'https://m.media-amazon.com/images/S/aplus-media/sota/fffd562b-d25b-4597-a679-6a9f5de597b1.__CR0,0,4043,2501_PT0_SX970_V1___.jpg',
//       ],
//     },
//     attrs: [
//       {
//         sole: 'Phylon',
//       },
//       {
//         closure: 'Lace-Up',
//       },
//       {
//         'fit type': 'Regular',
//       },
//       {
//         'shoe width': 'Medium',
//       },
//       {
//         'material type': 'Mesh',
//       },
//       {
//         lifestyle: 'Sports',
//       },
//       {
//         'warranty type': 'Manufacturer',
//       },
//       {
//         'care instructions':
//           ' Allow your pair of shoes to air and de-odorize at a regular basis, this also helps them retain their natural shape; use shoe bags to prevent any stains or mildew; dust any dry dirt from the surface using a clean cloth, do not use polish or shiner  ',
//       },
//     ],
//   },
//   {
//     title: 'Puma Mens Softride Premier So Splatter Walking Shoe',
//     description: [],
//     price: 2779,
//     category: 'Shoes',
//     brand: 'Puma',
//     variants: {
//       colors: [],
//       sizes: [
//         '6 UK',
//         '6.5 UK,'
//         '7 UK',
//         '7.5 UK',
//         '8.5 UK',
//         '9 UK',
//         '9.5 UK',
//         '10 UK',
//         '10.5 U',
//         '11 UK',
//         '12 UK',
//         '13 UK',
//       ],
//     },
//     imgs: {
//       thumbnail: 'https://m.media-amazon.com/images/I/51QUWOV3nyL._UY575_.jpg',
//       product_imgs: [
//         'https://m.media-amazon.com/images/G/31/HomeCustomProduct/360_icon_73x73v2._CB485971317_SS40_FMpng_RI_.png',
//         'https://m.media-amazon.com/images/I/31LDR6AbqLL._US40_.jpg',
//         'https://m.media-amazon.com/images/I/31JVtUu84rL._US40_.jpg',
//         'https://m.media-amazon.com/images/I/31JJsH3XtdL._US40_.jpg',
//         'https://m.media-amazon.com/images/I/41E6vWkueuL._US40_.jpg',
//         'https://m.media-amazon.com/images/I/41PHrBJ+2JL._US40_.jpg',
//         'https://m.media-amazon.com/images/I/316YohgPAPL._US40_.jpg',
//         'https://m.media-amazon.com/images/I/414oye2F77L._US40_.jpg',
//         'https://m.media-amazon.com/images/I/51QUWOV3nyL._UY575_.jpg',
//       ],
//       product_spec_imgs: [],
//     },
//     attrs: [
//       {
//         sole: 'Rubber',
//       },
//       {
//         closure: 'Lace-Up',
//       },
//       {
//         'fit type': 'Regular',
//       },
//       {
//         'shoe width': 'Medium ',
//       },
//       {
//         'style name': 'Walking Shoe  ',
//       },
//       {
//         'model name': 'Softride Premier SO Splatter',
//       },
//       {
//         'brand color': 'CASTLEROCK-Puma Black-Lime Squeeze',
//       },
//       {
//         activitygroup: 'Running',
//       },
//       {
//         careinstructions: 'Wipe with a clean dry cloth',
//       },
//     ],
//   },
//   {
//     title: 'Nike Mens M Zoom Court Lite 3 Flip Flops',
//     description: [],
//     price: { unit: '3303' },
//     category: 'Shoes',
//     brand: 'Nike',
//     variants: {
//       colors: [],
//       sizes: [
//         '6 UK (6.5 US)',
//         '6.5 UK (7 US)',
//         '7.5 UK (8 US)',
//         '8.5 UK (9 US)',
//         '9.5 UK (10 US)',
//         '10.5 UK (11 US)',
//         '11.5 UK (12 US)',
//         '13 UK (13.5 US)',
//       ],
//     },
//     imgs: {
//       thumbnail: 'https://m.media-amazon.com/images/I/511bjrEKkxL._UY695_.jpg',
//       product_imgs: [
//         'https://m.media-amazon.com/images/G/31/HomeCustomProduct/360_icon_73x73v2._CB485971317_SS40_FMpng_RI_.png',
//         'https://m.media-amazon.com/images/I/2169tYZ9lpL._US40_.jpg',
//         'https://m.media-amazon.com/images/I/2169tYZ9lpL._US40_.jpg',
//         'https://m.media-amazon.com/images/I/21WoKU97k1L._US40_.jpg',
//         'https://m.media-amazon.com/images/I/31HecI66FaL._US40_.jpg',
//         'https://m.media-amazon.com/images/I/31I-Iq8my8L._US40_.jpg',
//         'https://m.media-amazon.com/images/I/31zoJWg5fmL._US40_.jpg',
//         'https://m.media-amazon.com/images/I/511bjrEKkxL._UY695_.jpg',
//       ],
//       product_spec_imgs: [],
//     },
//     attrs: [
//       {
//         closure: 'Pull On',
//       },
//       {
//         'shoe width': 'Medium',
//       },
//       {
//         name: 'breathable sports shoe  ',
//       },
//     ],
//   },
// ];

// products = products.map((product) => {
//   const total_variants= product.variants.sizes.length+ product.variants.colors.length;

//   const variant_ids = total_variants.map(el=> new mongoose.Types.ObjectId())

//   // lets take care of color
//   colors_variant_products= product.variants.colors.forEach(el=>{
//     const new_variant_product= produce(product,draft=>{
//       draft.title= draft.title.split(' ').slice(0,-1) + el.color;
//       draft.assets.thu
//     })
//   })

//   product.price = {
//     value: Math.round(Number(product.price / 70)),
//     unit: '$',
//   };

//   const { sizes } = product.variants;
//   if (sizes.length === 0) return product;

//   sizes.forEach((size, i) => {
//     sizes[i] = {
//       price:
//         Math.round(product.price.value * 0.05) * (i + 1) +
//         Number(product.price.value),
//       value: size,
//     };
//   });

//   return product;
// });
