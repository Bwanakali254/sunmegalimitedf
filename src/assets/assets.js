import logo from './logo.svg'
import hero from './hero.png'
import aboutus from './aboutus.jpg'
import contact from './contact.jpg'
import mpesaLogo from './M-PESA_LOGO-01.png'
import pesapalLogo from './pesapal.png'
import binIcon from './bin_icon.png'
import cartIcon from './cart_icon.png'
import crossIcon from './cross_icon.png'
import dropdownIcon from './dropdown_icon.png'
import exchangeIcon from './exchange_icon.png'
import menuIcon from './menu_icon.png'
import profileIcon from './profile_icon.png'
import qualityIcon from './quality_icon.png'
import searchIcon from './search_icon.png'
import starDullIcon from './star_dull_icon.png'
import starIcon from './star_icon.png'
import supportImg from './support_img.png'

// Batteries
import b_img1 from './products/batteries/b_img1.png'
import b_img2 from './products/batteries/b_img2.png'
import b_img3 from './products/batteries/b_img3.png'
import b_img4 from './products/batteries/b_img4.png'
import b_img5 from './products/batteries/b_img5.png'
import bb_img1 from './products/batteries/bb_img1.png'
import bb_img2 from './products/batteries/bb_img2.png'
import bb_img3 from './products/batteries/bb_img3.png'
import bb_img4 from './products/batteries/bb_img4.png'

// Controllers
import Ct_img1 from './products/controllers/Ct_img1.png'
import Ct_img2 from './products/controllers/Ct_img2.png'
import Ct_img3 from './products/controllers/Ct_img3.png'
import Ct_img4 from './products/controllers/Ct_img4.png'
import Ct_img5 from './products/controllers/Ct_img5.png'

// Converters
import cv_img1 from './products/converters/cv_img1.png'
import cv_img2 from './products/converters/cv_img2.png'

// Energy Storage Systems
import s_img1 from './products/energy-storage-systems/s_img1.png'
import s_img1_2 from './products/energy-storage-systems/s_img1_2.png'
import s_img1_3 from './products/energy-storage-systems/s_img1_3.png'
import s_img1_4 from './products/energy-storage-systems/s_img1_4.png'
import s_img2 from './products/energy-storage-systems/s_img2.png'
import s_img2_1 from './products/energy-storage-systems/s_img2_1.png'
import s_img3 from './products/energy-storage-systems/s_img3.png'
import s_img3_1 from './products/energy-storage-systems/s_img3_1.png'
import s_img3_2 from './products/energy-storage-systems/s_img3_2.png'
import s_img4 from './products/energy-storage-systems/s_img4.jpg'
import s_img4_1 from './products/energy-storage-systems/s_img4_1.jpg'
import s_img4_2 from './products/energy-storage-systems/s_img4_2.jpg'
import s_img4_3 from './products/energy-storage-systems/s_img4_3.jpg'
import s_img5 from './products/energy-storage-systems/s_img5.png'
import s_img5_1 from './products/energy-storage-systems/s_img5_1.png'
import s_img6 from './products/energy-storage-systems/s_img6.png'
import s_img7 from './products/energy-storage-systems/s_img7.png'
import s_img7_1 from './products/energy-storage-systems/s_img7_1.png'
import s_img7_2 from './products/energy-storage-systems/s_img7_2.png'
import s_img8 from './products/energy-storage-systems/s_img8.png'
import s_img8_1 from './products/energy-storage-systems/s_img8_1.png'
import s_img8_2 from './products/energy-storage-systems/s_img8_2.png'
import s_img8_3 from './products/energy-storage-systems/s_img8_3.png'
import s_img8_4 from './products/energy-storage-systems/s_img8_4.png'
import s_img8_5 from './products/energy-storage-systems/s_img8_5.png'

// Inverters
import i_img1 from './products/inverters/i_img1.png'

// Portable Power
import p_img1 from './products/portable-power/p_img1.png'
import p_img2 from './products/portable-power/p_img2.png'
import p_img3 from './products/portable-power/p_img3.png'

export const assets = {
     logo,
     hero,
    aboutus,
    contact,
    mpesaLogo,
    pesapalLogo,
    // Icons
    binIcon,
    cartIcon,
    crossIcon,
    dropdownIcon,
    exchangeIcon,
    menuIcon,
    profileIcon,
    qualityIcon,
    searchIcon,
    starDullIcon,
    starIcon,
    supportImg,
    // Batteries
    b_img1,
    b_img2,
    b_img3,
    b_img4,
    b_img5,
    bb_img1,
    bb_img2,
    bb_img3,
    bb_img4,
    // Controllers
    Ct_img1,
    Ct_img2,
    Ct_img3,
    Ct_img4,
    Ct_img5,
    // Converters
    cv_img1,
    cv_img2,
    // Energy Storage Systems
    s_img1,
    s_img1_2,
    s_img1_3,
    s_img1_4,
    s_img2,
    s_img2_1,
    s_img3,
    s_img3_1,
    s_img3_2,
    s_img4,
    s_img4_1,
    s_img4_2,
    s_img4_3,
    s_img5,
    s_img5_1,
    s_img6,
    s_img7,
    s_img7_1,
    s_img7_2,
    s_img8,
    s_img8_1,
    s_img8_2,
    s_img8_3,
    s_img8_4,
    s_img8_5,
    // Inverters
    i_img1,
    // Portable Power
    p_img1,
    p_img2,
    p_img3,
}

export const products = [
// Batteries - High Voltage (Individual Products)
{
    _id: "bat001",
    name: "Koyoe High Voltage Battery 102V 40Ah - Model 1",
    description: "Premium lithium-ion high-voltage battery module with 102V nominal voltage and 40Ah capacity. Features advanced BMS protection, long cycle life, and compact design ideal for energy storage systems.",
    price: "85000",
    image: [b_img1],
    category: "batteries",
    subCategory: "high-voltage-battery-102v-40ah",
    brand: "koyoe",
    quantity: "15",
    rating: "4.7",
    reviews: "23",
    createdAt: "2026-01-06",
    bestseller: true,
},
{
    _id: "bat002",
    name: "Koyoe High Voltage Battery 102V 40Ah - Model 2",
    description: "Premium lithium-ion high-voltage battery module with 102V nominal voltage and 40Ah capacity. Features advanced BMS protection, long cycle life, and compact design ideal for energy storage systems.",
    price: "85000",
    image: [b_img2],
    category: "batteries",
    subCategory: "high-voltage-battery-102v-40ah",
    brand: "koyoe",
    quantity: "15",
    rating: "4.7",
    reviews: "23",
    createdAt: "2026-01-06",
    bestseller: true,
},
{
    _id: "bat003",
    name: "Koyoe High Voltage Battery 102V 40Ah - Model 3",
    description: "Premium lithium-ion high-voltage battery module with 102V nominal voltage and 40Ah capacity. Features advanced BMS protection, long cycle life, and compact design ideal for energy storage systems.",
    price: "85000",
    image: [b_img3],
    category: "batteries",
    subCategory: "high-voltage-battery-102v-40ah",
    brand: "koyoe",
    quantity: "15",
    rating: "4.7",
    reviews: "23",
    createdAt: "2026-01-06",
    bestseller: true,
},
{
    _id: "bat004",
    name: "Koyoe High Voltage Battery 102V 40Ah - Model 4",
    description: "Premium lithium-ion high-voltage battery module with 102V nominal voltage and 40Ah capacity. Features advanced BMS protection, long cycle life, and compact design ideal for energy storage systems.",
    price: "85000",
    image: [b_img4],
    category: "batteries",
    subCategory: "high-voltage-battery-102v-40ah",
    brand: "koyoe",
    quantity: "15",
    rating: "4.7",
    reviews: "23",
    createdAt: "2026-01-06",
    bestseller: true,
},
{
    _id: "bat005",
    name: "Koyoe High Voltage Battery 102V 40Ah - Model 5",
    description: "Premium lithium-ion high-voltage battery module with 102V nominal voltage and 40Ah capacity. Features advanced BMS protection, long cycle life, and compact design ideal for energy storage systems.",
    price: "85000",
    image: [b_img5],
    category: "batteries",
    subCategory: "high-voltage-battery-102v-40ah",
    brand: "koyoe",
    quantity: "15",
    rating: "4.7",
    reviews: "23",
    createdAt: "2026-01-06",
    bestseller: true,
},
// Batteries - Stack Battery Pack (Individual Products)
{
    _id: "bat006",
    name: "Koyoe Stack Battery Pack 51V 100Ah - Model 1",
    description: "Modular stackable battery pack system with 51V output and 100Ah capacity. Designed for scalable energy storage solutions with easy stacking capability for increased capacity.",
    price: "120000",
    image: [bb_img1],
    category: "batteries",
    subCategory: "stack-battery-pack-51v-100ah",
    brand: "koyoe",
    quantity: "12",
    rating: "4.6",
    reviews: "18",
    createdAt: "2026-01-06",
    bestseller: true,
},
{
    _id: "bat007",
    name: "Koyoe Stack Battery Pack 51V 100Ah - Model 2",
    description: "Modular stackable battery pack system with 51V output and 100Ah capacity. Designed for scalable energy storage solutions with easy stacking capability for increased capacity.",
    price: "120000",
    image: [bb_img2],
    category: "batteries",
    subCategory: "stack-battery-pack-51v-100ah",
    brand: "koyoe",
    quantity: "12",
    rating: "4.6",
    reviews: "18",
    createdAt: "2026-01-06",
    bestseller: true,
},
{
    _id: "bat008",
    name: "Koyoe Stack Battery Pack 51V 100Ah - Model 3",
    description: "Modular stackable battery pack system with 51V output and 100Ah capacity. Designed for scalable energy storage solutions with easy stacking capability for increased capacity.",
    price: "120000",
    image: [bb_img3],
    category: "batteries",
    subCategory: "stack-battery-pack-51v-100ah",
    brand: "koyoe",
    quantity: "12",
    rating: "4.6",
    reviews: "18",
    createdAt: "2026-01-06",
    bestseller: true,
},
{
    _id: "bat009",
    name: "Koyoe Stack Battery Pack 51V 100Ah - Model 4",
    description: "Modular stackable battery pack system with 51V output and 100Ah capacity. Designed for scalable energy storage solutions with easy stacking capability for increased capacity.",
    price: "120000",
    image: [bb_img4],
    category: "batteries",
    subCategory: "stack-battery-pack-51v-100ah",
    brand: "koyoe",
    quantity: "12",
    rating: "4.6",
    reviews: "18",
    createdAt: "2026-01-06",
    bestseller: true,
},
// Controllers (Individual Products)
{
    _id: "ctrl001",
    name: "Main Controller C40 Battery Management System - View 1",
    description: "Advanced C40 main controller with comprehensive battery management system. Features real-time monitoring, cell balancing, overcharge protection, and temperature management for optimal battery performance.",
    price: "45000",
    image: [Ct_img1],
    category: "controllers",
    subCategory: "main-controller-c40",
    brand: "koyoe",
    quantity: "20",
    rating: "4.8",
    reviews: "31",
    createdAt: "2026-01-06",
    bestseller: false,
},
{
    _id: "ctrl002",
    name: "Main Controller C40 Battery Management System - View 2",
    description: "Advanced C40 main controller with comprehensive battery management system. Features real-time monitoring, cell balancing, overcharge protection, and temperature management for optimal battery performance.",
    price: "45000",
    image: [Ct_img2],
    category: "controllers",
    subCategory: "main-controller-c40",
    brand: "koyoe",
    quantity: "20",
    rating: "4.8",
    reviews: "31",
    createdAt: "2026-01-06",
    bestseller: false,
},
{
    _id: "ctrl003",
    name: "Main Controller C40 Battery Management System - View 3",
    description: "Advanced C40 main controller with comprehensive battery management system. Features real-time monitoring, cell balancing, overcharge protection, and temperature management for optimal battery performance.",
    price: "45000",
    image: [Ct_img3],
    category: "controllers",
    subCategory: "main-controller-c40",
    brand: "koyoe",
    quantity: "20",
    rating: "4.8",
    reviews: "31",
    createdAt: "2026-01-06",
    bestseller: false,
},
{
    _id: "ctrl004",
    name: "Main Controller C40 Battery Management System - View 4",
    description: "Advanced C40 main controller with comprehensive battery management system. Features real-time monitoring, cell balancing, overcharge protection, and temperature management for optimal battery performance.",
    price: "45000",
    image: [Ct_img4],
    category: "controllers",
    subCategory: "main-controller-c40",
    brand: "koyoe",
    quantity: "20",
    rating: "4.8",
    reviews: "31",
    createdAt: "2026-01-06",
    bestseller: false,
},
{
    _id: "ctrl005",
    name: "Main Controller C40 Battery Management System - View 5",
    description: "Advanced C40 main controller with comprehensive battery management system. Features real-time monitoring, cell balancing, overcharge protection, and temperature management for optimal battery performance.",
    price: "45000",
    image: [Ct_img5],
    category: "controllers",
    subCategory: "main-controller-c40",
    brand: "koyoe",
    quantity: "20",
    rating: "4.8",
    reviews: "31",
    createdAt: "2026-01-06",
    bestseller: false,
},
// Converters (Individual Products)
{
    _id: "conv001",
    name: "Power Converter 100-125kW DC to AC - View 1",
    description: "High-efficiency power converter with 100-125kW capacity for DC to AC conversion. Ideal for large-scale energy storage systems and grid-tie applications with advanced MPPT technology.",
    price: "280000",
    image: [cv_img1],
    category: "converters",
    subCategory: "power-converter-100-125kw",
    brand: "koyoe",
    quantity: "8",
    rating: "4.5",
    reviews: "14",
    createdAt: "2026-01-06",
    bestseller: false,
},
{
    _id: "conv002",
    name: "Power Converter 100-125kW DC to AC - View 2",
    description: "High-efficiency power converter with 100-125kW capacity for DC to AC conversion. Ideal for large-scale energy storage systems and grid-tie applications with advanced MPPT technology.",
    price: "280000",
    image: [cv_img2],
    category: "converters",
    subCategory: "power-converter-100-125kw",
    brand: "koyoe",
    quantity: "8",
    rating: "4.5",
    reviews: "14",
    createdAt: "2026-01-06",
    bestseller: false,
},
// Energy Storage Systems - Single Phase Hybrid Inverter
{
    _id: "ess001",
    name: "Single Phase Hybrid Inverter 3-8kW",
    description: "Versatile single-phase hybrid inverter system with 3-8kW power range. Combines solar inverter, battery charger, and grid-tie functionality in one compact unit for residential energy independence.",
    price: "95000",
    image: [s_img1, s_img1_2, s_img1_3, s_img1_4],
    category: "energy-storage-systems",
    subCategory: "single-phase-hybrid-inverter-3-8kw",
    brand: "koyoe",
    quantity: "18",
    rating: "4.6",
    reviews: "27",
    createdAt: "2026-01-06",
    bestseller: true,
},
// Energy Storage Systems - Three Phase Hybrid Inverter 30-60kW
{
    _id: "ess002",
    name: "Three Phase Hybrid Inverter 30-60kW",
    description: "Industrial-grade three-phase hybrid inverter with 30-60kW power output. Designed for commercial and industrial applications with advanced grid management and load balancing capabilities.",
    price: "320000",
    image: [s_img2, s_img2_1],
    category: "energy-storage-systems",
    subCategory: "three-phase-hybrid-inverter-30-60kw",
    brand: "koyoe",
    quantity: "10",
    rating: "4.7",
    reviews: "19",
    createdAt: "2026-01-06",
    bestseller: false,
},
// Energy Storage Systems - Three Phase Hybrid Inverter 5-25kW
{
    _id: "ess003",
    name: "Three Phase Hybrid Inverter 5-25kW",
    description: "Medium-capacity three-phase hybrid inverter system with 5-25kW range. Perfect for small commercial buildings and large residential properties requiring three-phase power.",
    price: "180000",
    image: [s_img3, s_img3_1, s_img3_2],
    category: "energy-storage-systems",
    subCategory: "three-phase-hybrid-inverter-5-25kw",
    brand: "koyoe",
    quantity: "15",
    rating: "4.5",
    reviews: "22",
    createdAt: "2026-01-06",
    bestseller: false,
},
// Energy Storage Systems - Controller C40 System
{
    _id: "ess004",
    name: "Controller C40 Standalone System",
    description: "Complete energy storage system featuring the C40 controller with integrated battery management. Includes monitoring interface and protection systems for safe and efficient operation.",
    price: "125000",
    image: [s_img4, s_img4_1, s_img4_2, s_img4_3],
    category: "energy-storage-systems",
    subCategory: "controller-c40-system",
    brand: "koyoe",
    quantity: "12",
    rating: "4.6",
    reviews: "16",
    createdAt: "2026-01-06",
    bestseller: false,
},
// Energy Storage Systems - Energy Storage System 30-40-50-60kW
{
    _id: "ess005",
    name: "Energy Storage System 30-60kW 121kWh",
    description: "Large-scale energy storage system with 30-60kW power output and 121kWh capacity. Ideal for commercial facilities, data centers, and industrial applications requiring reliable backup power.",
    price: "450000",
    image: [s_img5, s_img5_1],
    category: "energy-storage-systems",
    subCategory: "energy-storage-system-30-40-50-60kw-121kwh",
    brand: "koyoe",
    quantity: "6",
    rating: "4.8",
    reviews: "11",
    createdAt: "2026-01-06",
    bestseller: false,
},
// Energy Storage Systems - Energy Storage System 100-125kW
{
    _id: "ess006",
    name: "Energy Storage System 100-125kW 241kWh",
    description: "High-capacity energy storage system delivering 100-125kW power and 241kWh energy storage. Designed for large commercial and industrial facilities with advanced grid integration features.",
    price: "680000",
    image: [s_img6],
    category: "energy-storage-systems",
    subCategory: "energy-storage-system-100-125kw-241kwh",
    brand: "koyoe",
    quantity: "4",
    rating: "4.9",
    reviews: "8",
    createdAt: "2026-01-06",
    bestseller: false,
},
// Energy Storage Systems - Stack Hybrid System 3-8kW
{
    _id: "ess007",
    name: "Stack Hybrid System 3-8kW",
    description: "Modular stackable hybrid energy system with 3-8kW power range. Features expandable design allowing multiple units to be stacked for increased capacity and power output.",
    price: "110000",
    image: [s_img7, s_img7_1, s_img7_2],
    category: "energy-storage-systems",
    subCategory: "stack-hybrid-system-3-8kw",
    brand: "koyoe",
    quantity: "14",
    rating: "4.7",
    reviews: "25",
    createdAt: "2026-01-06",
    bestseller: true,
},
// Energy Storage Systems - Stack Hybrid System 5-25kW
{
    _id: "ess008",
    name: "Stack Hybrid System 5-25kW",
    description: "Advanced stackable hybrid energy system with 5-25kW power capacity. Scalable architecture enables multiple units to work together, perfect for growing energy needs in commercial applications.",
    price: "240000",
    image: [s_img8, s_img8_1, s_img8_2, s_img8_3, s_img8_4, s_img8_5],
    category: "energy-storage-systems",
    subCategory: "stack-hybrid-system-5-25kw",
    brand: "koyoe",
    quantity: "9",
    rating: "4.6",
    reviews: "17",
    createdAt: "2026-01-06",
    bestseller: false,
},
// Inverters
{
    _id: "inv001",
    name: "Grid Tie Inverter 10-20kW Three Phase",
    description: "High-performance three-phase grid-tie inverter with 10-20kW power range. Features advanced MPPT technology, anti-islanding protection, and seamless grid synchronization for solar power systems.",
    price: "165000",
    image: [i_img1],
    category: "inverters",
    subCategory: "grid-tie-inverter-10-20kw-three-phase",
    brand: "koyoe",
    quantity: "16",
    rating: "4.7",
    reviews: "29",
    createdAt: "2026-01-06",
    bestseller: true,
},
// Portable Power (Individual Products)
{
    _id: "port001",
    name: "Portable Outdoor Power Supply Station - View 1",
    description: "Versatile portable power station designed for outdoor adventures, camping, and emergency backup. Features multiple output ports, fast charging capability, and rugged construction for reliable off-grid power.",
    price: "75000",
    image: [p_img1],
    category: "portable-power",
    subCategory: "portable-outdoor-power-supply",
    brand: "koyoe",
    quantity: "22",
    rating: "4.8",
    reviews: "42",
    createdAt: "2026-01-06",
    bestseller: true,
},
{
    _id: "port002",
    name: "Portable Outdoor Power Supply Station - View 2",
    description: "Versatile portable power station designed for outdoor adventures, camping, and emergency backup. Features multiple output ports, fast charging capability, and rugged construction for reliable off-grid power.",
    price: "75000",
    image: [p_img2],
    category: "portable-power",
    subCategory: "portable-outdoor-power-supply",
    brand: "koyoe",
    quantity: "22",
    rating: "4.8",
    reviews: "42",
    createdAt: "2026-01-06",
    bestseller: true,
},
{
    _id: "port003",
    name: "Portable Outdoor Power Supply Station - View 3",
    description: "Versatile portable power station designed for outdoor adventures, camping, and emergency backup. Features multiple output ports, fast charging capability, and rugged construction for reliable off-grid power.",
    price: "75000",
    image: [p_img3],
    category: "portable-power",
    subCategory: "portable-outdoor-power-supply",
    brand: "koyoe",
    quantity: "22",
    rating: "4.8",
    reviews: "42",
    createdAt: "2026-01-06",
    bestseller: true,
}
]
