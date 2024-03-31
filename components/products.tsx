import { useCart } from "react-use-cart";

const { setItems } = useCart();

const products = [
  {
    id: "1",
    name: "Fresh Foam 1080v9",
    brand: "New Balance",
    sku: "W1080LN9",
    price: 15000,
  },
  {
    id: "cjld2cjxh0000qzrmn831i7rn",
    name: "Fresh Foam 1080v9",
    brand: "New Balance",
    sku: "W1080LN9",
    price: 15000,
  },
];

setItems(products);


const services = [
    {
      id: "1",
      name: "Fresh Foam 1080v9",
      brand: "New Balance",
      sku: "W1080LN9",
      price: 15000,
    },
    {
      id: "cjld2cjxh0000qzrmn831i7rn",
      name: "Fresh Foam 1080v9",
      brand: "New Balance",
      price: 15000,
    },
  ];
  
  setItems(services);