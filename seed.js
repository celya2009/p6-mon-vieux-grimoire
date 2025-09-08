const mongoose = require("mongoose");
const Book = require("./models/books.model"); // ton modèle Mongoose
const connectDB = require("./config/db");      // utilise ton fichier db.js
require("dotenv").config();

const books = [
  {
    "userId": "12345",
    "title": "Book for Esther",
    "author": "Auteur 1",
    "imageUrl": "http://localhost:4000/images/Book_for_Esther.png",
    "year": 2020,
    "genre": "Fiction",
    "ratings": [],
    "averageRating": 0
  },
  {
    "userId": "12346",
    "title": "Book of Genesis",
    "author": "Auteur 2",
    "imageUrl": "http://localhost:4000/images/Book_of_Genesis.png",
    "year": 2018,
    "genre": "Religieux",
    "ratings": [],
    "averageRating": 0
  },
  {
    "userId": "12347",
    "title": "Cereal",
    "author": "Auteur 3",
    "imageUrl": "http://localhost:4000/images/Cereal.png",
    "year": 2019,
    "genre": "Cuisine",
    "ratings": [],
    "averageRating": 0
  },
  {
    "userId": "12348",
    "title": "Company of One",
    "author": "Auteur 4",
    "imageUrl": "http://localhost:4000/images/Company_of_one.png",
    "year": 2021,
    "genre": "Business",
    "ratings": [],
    "averageRating": 0
  },
  {
    "userId": "12349",
    "title": "Design Anthology",
    "author": "Auteur 5",
    "imageUrl": "http://localhost:4000/images/Design_Anthology.png",
    "year": 2017,
    "genre": "Design",
    "ratings": [],
    "averageRating": 0
  },
  {
    "userId": "12350",
    "title": "Milk & Honey",
    "author": "Auteur 6",
    "imageUrl": "http://localhost:4000/images/Milk_&_Honey.png",
    "year": 2016,
    "genre": "Poésie",
    "ratings": [],
    "averageRating": 0
  },
  {
    "userId": "12351",
    "title": "Milwaukee Mission",
    "author": "Auteur 7",
    "imageUrl": "http://localhost:4000/images/Milwaukee_Mision.png",
    "year": 2015,
    "genre": "Aventure",
    "ratings": [],
    "averageRating": 0
  },
  {
    "userId": "12352",
    "title": "Psalms",
    "author": "Auteur 8",
    "imageUrl": "http://localhost:4000/images/Psalms.png",
    "year": 2014,
    "genre": "Religieux",
    "ratings": [],
    "averageRating": 0
  },
  {
    "userId": "12353",
    "title": "Stupore e Tremori",
    "author": "Auteur 9",
    "imageUrl": "http://localhost:4000/images/Stupore_e_Tremori.png",
    "year": 2013,
    "genre": "Littérature",
    "ratings": [],
    "averageRating": 0
  },
  {
    "userId": "12354",
    "title": "The Kinfolk Table",
    "author": "Auteur 10",
    "imageUrl": "http://localhost:4000/images/The_Kinfolk_Table.png",
    "year": 2012,
    "genre": "Cuisine",
    "ratings": [],
    "averageRating": 0
  },
  {
    "userId": "12355",
    "title": "Thinking Fast & Slow",
    "author": "Auteur 11",
    "imageUrl": "http://localhost:4000/images/Thinking_fast_&_slow.png",
    "year": 2011,
    "genre": "Psychologie",
    "ratings": [],
    "averageRating": 0
  },
  {
    "userId": "12356",
    "title": "Zero to One",
    "author": "Auteur 12",
    "imageUrl": "http://localhost:4000/images/Zero_to_One.png",
    "year": 2010,
    "genre": "Business",
    "ratings": [],
    "averageRating": 0
  }
]


const seedBooks = async () => {
  await connectDB();          // connecte MongoDB via db.js
  await Book.deleteMany();    // supprime les anciens livres pour éviter les doublons
  await Book.insertMany(books);
  console.log("✅ Livres ajoutés !");
  mongoose.disconnect();
};

seedBooks();
