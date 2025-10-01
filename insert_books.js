// insert_books.js
require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;
const collectionName = 'books';

// Sample book data
const books = [
  { title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction', published_year: 1960, price: 12.99, in_stock: true, pages: 336, publisher: 'J. B. Lippincott & Co.' },
  { title: '1984', author: 'George Orwell', genre: 'Dystopian', published_year: 1949, price: 10.99, in_stock: true, pages: 328, publisher: 'Secker & Warburg' },
  { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Fiction', published_year: 1925, price: 9.99, in_stock: true, pages: 180, publisher: 'Charles Scribner\'s Sons' },
  { title: 'Brave New World', author: 'Aldous Huxley', genre: 'Dystopian', published_year: 1932, price: 11.50, in_stock: false, pages: 311, publisher: 'Chatto & Windus' },
  { title: 'The Hobbit', author: 'J.R.R. Tolkien', genre: 'Fantasy', published_year: 1937, price: 14.99, in_stock: true, pages: 310, publisher: 'George Allen & Unwin' },
  { title: 'The Catcher in the Rye', author: 'J.D. Salinger', genre: 'Fiction', published_year: 1951, price: 8.99, in_stock: true, pages: 224, publisher: 'Little, Brown and Company' },
  { title: 'Pride and Prejudice', author: 'Jane Austen', genre: 'Romance', published_year: 1813, price: 7.99, in_stock: true, pages: 432, publisher: 'T. Egerton, Whitehall' },
  { title: 'The Lord of the Rings', author: 'J.R.R. Tolkien', genre: 'Fantasy', published_year: 1954, price: 19.99, in_stock: true, pages: 1178, publisher: 'Allen & Unwin' },
  { title: 'Animal Farm', author: 'George Orwell', genre: 'Political Satire', published_year: 1945, price: 8.50, in_stock: false, pages: 112, publisher: 'Secker & Warburg' },
  { title: 'The Alchemist', author: 'Paulo Coelho', genre: 'Fiction', published_year: 1988, price: 10.99, in_stock: true, pages: 197, publisher: 'HarperOne' },
  { title: 'Moby Dick', author: 'Herman Melville', genre: 'Adventure', published_year: 1851, price: 12.50, in_stock: false, pages: 635, publisher: 'Harper & Brothers' },
  { title: 'Wuthering Heights', author: 'Emily Brontë', genre: 'Gothic Fiction', published_year: 1847, price: 9.99, in_stock: true, pages: 342, publisher: 'Thomas Cautley Newby' }
];

async function insertBooks() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    let insertedCount = 0;

    for (const book of books) {
      const exists = await collection.findOne({ title: book.title });
      if (!exists) {
        await collection.insertOne(book);
        insertedCount++;
        console.log(`Inserted: "${book.title}"`);
      } else {
        console.log(`Skipped (already exists): "${book.title}"`);
      }
    }

    console.log(`\nFinished. ${insertedCount} new books were inserted.`);

  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
    console.log('Connection closed');
  }
}

insertBooks().catch(console.error);
