import IMG_1 from "./IMG_1.0.jpg"; // ✅ Correct relative path
import IMG1_1 from "./IMG_1.1.jpg"
import IMG1_2 from "./IMG_1.2.jpg";
import IMG1_3 from "./IMG_1.3.jpg";
import IMG1_4 from "./IMG_1.4.jpg";
import logo from "./PanacheBySoh.png";
import search_icon from "./icon.png"
import profile_icon from './profile_icon.png'
import cart_icon from './cart_icon.png'
import menu_icon from './menu_icon.png'
import dropdown_icon from './dropdown_icon.png' 
import hero_icon from './hero_icon.jpg'
import hero1_icon from './hero1_icon.jpg'
import exchange_icon from './exchange_icon.png'
import days_icon from './days_icon.svg'
import support_icon from './support_icon.png'
import close_icon from './close_icon.png'
import delete_icon from './delete_icon.png'

export const assets = {
  logo,
  IMG_1,
  IMG1_1,
  IMG1_2,
  IMG1_3,
  IMG1_4,
  search_icon,
  profile_icon,
  cart_icon,
  menu_icon,
  dropdown_icon,
  hero_icon,
  hero1_icon,
  exchange_icon,
  days_icon,
  support_icon,
  close_icon,
  delete_icon
};

export const products = [
  {
    _id: "1",
    name: "STITCHED SATIN PRINTED SHIRT + BOTTOM",
    productDetails: [
      {
        color: "Multi",
        fabric: "Satin",
        cut: "Basic",
        slip: "Not Included",
        dupatta: "Not Included",
        trouser: "Satin Wide Leg Pant Included",
      },
    ],
    price:"100",
    image: [IMG_1,], // ✅ This will now contain the actual image path
    category: "Women",
    size: ["S", "M", "L"],
  },
   {
    _id: "2",
    name: "STITCHED MATIN PRINTED SHIRT + BOTTOM",
    productDetails: [
      {
        color: "Multi",
        fabric: "Satin",
        cut: "Basic",
        slip: "Not Included",
        dupatta: "Not Included",
        trouser: "Satin Wide Leg Pant Included",
      },
    ],
    price:"120",
    image: [IMG_1,], // ✅ This will now contain the actual image path
    category: "Women",
    size: ["S", "M", "L"],
  },
   {
    _id: "3",
    name: "STITCHED HATIN PRINTED SHIRT + BOTTOM",
    productDetails: [
      {
        color: "Multi",
        fabric: "Satin",
        cut: "Basic",
        slip: "Not Included",
        dupatta: "Not Included",
        trouser: "Satin Wide Leg Pant Included",
      },
    ],
    price:"50",
    image: [IMG_1,IMG1_1,IMG1_2,IMG1_3,IMG1_4], // ✅ This will now contain the actual image path
    category: "Women",
    size: ["S", "M", "L"],
  },
   {
    _id: "4",
    name: "STITCHED WATIN PRINTED SHIRT + BOTTOM",
    productDetails: [
      {
        color: "Multi",
        fabric: "Satin",
        cut: "Basic",
        slip: "Not Included",
        dupatta: "Not Included",
        trouser: "Satin Wide Leg Pant Included",
      },
    ],
    price:"200",
    image: [IMG_1,], // ✅ This will now contain the actual image path
    category: "Women",
    size: ["S", "M", "L"],
  },

   {
    _id: "5",
    name: "STITCHED OATIN PRINTED SHIRT + BOTTOM",
    productDetails: [
      {
        color: "Multi",
        fabric: "Satin",
        cut: "Basic",
        slip: "Not Included",
        dupatta: "Not Included",
        trouser: "Satin Wide Leg Pant Included",
      },
    ],
    price:"180",
    image: [IMG_1,], // ✅ This will now contain the actual image path
    category: "Women",
    size: ["S", "M", "L"],
  },
];
