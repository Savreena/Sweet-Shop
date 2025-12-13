const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const Sweet = require('./src/models/Sweet');

dotenv.config();

const sweets = [
  {
    name: "Gulab Jamun",
    description: "Soft, spongy milk-solid balls soaked in rose-scented sugar syrup.",
    price: 150,
    category: "Syrup-based",
    quantity: 10,
    image: "https://images.unsplash.com/photo-1605197584506-c505224f9860?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    name: "Rasgulla",
    description: "Ball-shaped dumplings of chhena and semolina dough, cooked in light syrup.",
    price: 120,
    category: "Syrup-based",
    quantity: 0,
    image: "https://images.unsplash.com/photo-1589119908995-c6837fa14848?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    name: "Kaju Katli",
    description: "Diamond-shaped sweet made with cashew nuts and sugar, topped with silver leaf.",
    price: 450,
    category: "Dry",
    quantity: 25,
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    name: "Jalebi",
    description: "Deep-fried maida flour batter in pretzel or circular shapes, which are then soaked in sugar syrup.",
    price: 100,
    category: "Fried",
    quantity: 15,
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    name: "Laddu",
    description: "Ball-shaped sweets made of flour, fat, and sugar.",
    price: 200,
    category: "Dry",
    quantity: 5,
    image: "https://images.unsplash.com/photo-1629837553536-f0331070773d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    name: "Barfi",
    description: "Dense milk-based sweet confectionery.",
    price: 300,
    category: "Milk-based",
    quantity: 20,
    image: "https://images.unsplash.com/photo-1598449356475-b9f71db7d847?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
];

const seedData = async () => {
  try {
    await connectDB();

    await Sweet.deleteMany();
    console.log('Sweets deleted...');

    await Sweet.insertMany(sweets);
    console.log('Sweets imported...');

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedData();
