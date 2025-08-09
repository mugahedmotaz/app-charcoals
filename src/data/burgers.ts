
import { url } from 'inspector';
import { BurgerItem } from '../types/burger';
import E from "../components/eshin.jpg";
export const burgerData: BurgerItem[] = [
  {

//     const sandwiches = [
//   { name: "", beef: 7500, chicken: 8500, content:""},
//   { name: "", beef: 8000, chicken: 9000, content:"" },
//   { name: "", beef: 9000, chicken: 10000, content:"" },
//   { name: "", beef: 9500, chicken: 10500, content:""},
//   { name: "", beef: 9000, chicken: 10000, content:""},
//   { name: "", beef: 9000, chicken: 10000, content:""},
//   { name: "", beef: 10000, chicken: 11000, content:"" },
//   { name: "", beef: 11000, chicken: 12000, content:""},
//   { name:"", beef: 12500, chicken: 13500, content:"" },
//   { name: "", beef: 13000, chicken: 14000, content:"" },
// ];

    id: '1',
    name: 'كلاسيك',
    description: "لحمه/فراخ +مايونيز+كاتشب+ بصل + خس",
    price: 7500,
    // originalPrice:,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
    category: 'burger',
    popular: true,
    extras: [
    ]
  },
  {
    id: '2',
    name: 'تشيز',
    description: "لحمه/فراخ +مايونيز+كاتشب+ جبنه + بصل+ خس",
    price: 7900,
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop',
    category: 'burger',
    // new: true,
    extras: []
  },
  {
    id: '3',
    name: ' باربكيو',
    description: "لحمه/فراخ + مايونيز + كاتشب + جبنه + باربكيو + بصل + خس",
    price: 8000,
    image: 'https://images.unsplash.com/photo-1606755962773-d324e2d5314f?w=400&h=300&fit=crop',
    category: 'burger',
    extras: [
    ]
  },
  {
    id: '4',
    name: ' هالبينو',
    description: "لحمه/فراخ +مايونيز+ كاتشب+ جبنه + هالبينو+ بصل+ خس" ,
    price: 8500,
    // originalPrice: 100,
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&h=300&fit=crop',
    category: 'burger',
    popular: true,
    extras: [
    ]
  },
  {
    id: '5',
    name: 'سيكريت',
    description: "لحمه/فراخ + مايونيز + كاتشب + جبنه + سويت صوص + بصل + خس" ,
    price: 9000,
    image: 'https://images.unsplash.com/photo-1525059696034-4967a729002e?w=400&h=300&fit=crop',
    category: 'burger',
    // new: true,
    extras: [
    ]
  },
  {
    id: '6',
    name: 'ايشن',
    description: "لحمه/فراخ + مايونيز + جبنه + سويت صوص + بصل + خس" ,
    price: 9000,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop',
    // image:E,
    category: 'burger',
    extras: [
    ]
  },
  {
    id: '7',
    name: 'إسموكي ',
    description: "لحمة/فراخ + مايونيز + جبنة + صوص مدخن + بصل + خس",
    price: 9000,
    image: 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?w=400&h=300&fit=crop',
    category: 'burger',
    extras: []
  },
  {
    id: '8',
    name: "جوسي تشارلي",
    description: "لحمه/فراخ + مايونيز + كاتشب + جبنه + مارتدلا + بصل + خس" ,
    price: 11000,
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=400&h=300&fit=crop',
    category: 'burger',
    popular: true,
    extras: [
    ]
  },
  {
    id: '9',
    name:  "دبل ميكس",
    description: " دبل لحمه/فراخ  + كاتشب + جبنه + سبشل صوص + بصل + خس"  ,
    price: 12500,
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=400&h=300&fit=crop',
    category: 'burger',
    popular: true,
    extras: [
    ]
  },
  {
    id: '10',
    name:  " شاركلز",
    description: "لحمه/فراخ + مايونيز + كاتشب + جبنه + شيدر صوص + بصل + خس"  ,
    price: 13000,
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=400&h=300&fit=crop',
    category: 'burger',
    popular: true,
    extras: [
    ]
  },
{
    id: '11',
    name: ' كومبو كلاسيك ',
    description: "لحمه/فراخ +مايونيز+كاتشب+ بصل + خس",
    price: 15500,
    // originalPrice:,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
    category: 'combo',
    popular: true,
    extras: [
    ]
  },
  {
    id: '12',
    name: ' كومبو تشيز',
    description: "لحمه/فراخ +مايونيز+كاتشب+ جبنه + بصل+ خس",
    price: 16000,
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop',
    category: 'combo',
    // new: true,
    extras: []
  },
  {
    id: '13',
    name: 'كومبو باربكيو',
    description: "لحمه/فراخ + مايونيز + كاتشب + جبنه + باربكيو + بصل + خس",
    price: 17000,
    image: 'https://images.unsplash.com/photo-1606755962773-d324e2d5314f?w=400&h=300&fit=crop',
    category: 'combo',
    extras: [
    ]
  },
  {
    id: '14',
    name: 'كومبو هالبينو',
    description: "لحمه/فراخ +مايونيز+ كاتشب+ جبنه + هالبينو+ بصل+ خس" ,
    price: 17500,
    // originalPrice: 100,
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&h=300&fit=crop',
    category: 'combo',
    popular: true,
    extras: [
    ]
  },
  {
    id: '15',
    name: 'كومبو سيكريت',
    description: "لحمه/فراخ + مايونيز + كاتشب + جبنه + سويت صوص + بصل + خس" ,
    price: 18000,
    image: 'https://images.unsplash.com/photo-1525059696034-4967a729002e?w=400&h=300&fit=crop',
    category: 'combo',
    // new: true,
    extras: [
    ]
  },
  {
    id: '16',
    name: 'كومبو ايشن',
    description: "لحمه/فراخ + مايونيز + جبنه + سويت صوص + بصل + خس" ,
    price: 9000,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop',
    category: 'combo',
    extras: [
    ]
  },
  {
    id: '17',
    name: 'كومبو إسموكي ',
    description: "لحمة/فراخ + مايونيز + جبنة + صوص مدخن + بصل + خس",
    price: 9000,
    image: 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?w=400&h=300&fit=crop',
    category: 'combo',
    extras: []
  },
  {
    id: '18',
    name: "كومبو جوسي تشارلي",
    description: "لحمه/فراخ + مايونيز + كاتشب + جبنه + مارتدلا + بصل + خس" ,
    price: 11000,
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=400&h=300&fit=crop',
    category: 'combo',
    popular: true,
    extras: [
    ]
  },
  {
    id: '19',
    name:  "كومبو دبل ميكس",
    description: " دبل لحمه/فراخ  + كاتشب + جبنه + سبشل صوص + بصل + خس"  ,
    price: 12500,
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=400&h=300&fit=crop',
    category: 'combo',
    popular: true,
    extras: [
    ]
  },
  {
    id: '20',
    name:  "كومبو شاركلز",
    description: "لحمه/فراخ + مايونيز + كاتشب + جبنه + شيدر صوص + بصل + خس"  ,
    price: 13000,
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=400&h=300&fit=crop',
    category: 'combo',
    popular: true,
    extras: [
    ]
  }
];



// const combos = [
//   { name: " كومبو كلاسيك", beef: 15500, chicken: 16500,  content:"لحمه/فراخ +مايونيز+كاتشب+ بصل + خس "},
//   { name:  " كومبو تشيز", beef: 16000, chicken: 17000, },
//   { name: " كومبو باربكيو", beef: 17000, chicken: 18000, },
//   { name: " كومبو هالبينو", beef: 17500, chicken: 18500, },
//   { name: " كومبو سيكريت", beef: 17000, chicken: 18000, },
//   { name: " كومبو ايشن", beef: 17000, chicken: 18000, },
//   { name: " كومبو إسموكي", beef: 18000, chicken: 19000, },
//   { name: "كومبو جوسي تشارلي", beef: 19000, chicken: 20000, },
//   { name: "كومبو دبل ميكس", beef: 20500, chicken: 21500, },
//   { name: "كومبو شاركلز", beef: 21000, chicken: 22000, },
// ];
// const extras = [
//   { name: "قطعة لحم", price: 4000 },
//   { name: "قطعة فراخ", price: 4500 },
//   { name: "قطعة مارتديلا", price: 2000 },
//   { name: "صوص سويت شيلي", price: 1000 },
//   { name: "صوص مايونيز", price: 1000 },
//   { name: "شرائح هالبينو", price: 1000 },
//   { name: "جبنة شرائح", price: 1000 },
//   { name: "جبنة صوص شيدر", price: 1000 },
//   { name: "صوص باربكيو", price: 1000 },
// ];
// const chips = [
//   { name: "شيبس", price: 6000 },
//   { name: "شيبس بالجبنة", price: 6500 },
//   { name: "شيبس بالهالبينو", price: 7000 },
//   { name: "شيبس شاركلز", price: 7500 },
//   { name: "شيبس كرسبي", price: 8000 },
//   { name: "شيبس عائلي", price: 8500 },
// ];
// const drinks = [
//   { name: "مياه غازية", price: 1500 },
//   { name: "مياه معدنية", price: 1000 },
// ];
