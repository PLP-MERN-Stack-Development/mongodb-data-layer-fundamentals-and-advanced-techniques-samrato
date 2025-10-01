// queries.js
require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function runQueries() {
  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    const books = db.collection('books');

    console.log('Connected to MongoDB');

    // --- Basic CRUD ---
    const fiction = await books.find({ genre: 'Fiction' }).toArray();
    console.log('Fiction Books:', fiction.map(b => b.title));

    const after1950 = await books.find({ published_year: { $gt: 1950 } }).toArray();
    console.log('Books after 1950:', after1950.map(b => b.title));

    const orwellBooks = await books.find({ author: 'George Orwell' }).toArray();
    console.log('Books by George Orwell:', orwellBooks.map(b => b.title));

    await books.updateOne({ title: '1984' }, { $set: { price: 12.99 } });
    console.log('Updated price of "1984"');

    await books.deleteOne({ title: 'Moby Dick' });
    console.log('Deleted "Moby Dick"');

    // --- Advanced Queries ---
    const recentInStock = await books.find({ in_stock: true, published_year: { $gt: 2010 } })
      .project({ title: 1, author: 1, price: 1, _id: 0 }).toArray();
    console.log('Recent in-stock books:', recentInStock);

    const asc = await books.find().sort({ price: 1 }).toArray();
    console.log('Books sorted ascending:', asc.map(b => b.title));

    const desc = await books.find().sort({ price: -1 }).toArray();
    console.log('Books sorted descending:', desc.map(b => b.title));

    const page1 = await books.find().skip(0).limit(5).toArray();
    console.log('Page 1:', page1.map(b => b.title));

    const page2 = await books.find().skip(5).limit(5).toArray();
    console.log('Page 2:', page2.map(b => b.title));

    // --- Aggregation ---
    const avgPrice = await books.aggregate([
      { $group: { _id: '$genre', avgPrice: { $avg: '$price' } } }
    ]).toArray();
    console.log('Average price by genre:', avgPrice);

    const topAuthor = await books.aggregate([
      { $group: { _id: '$author', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 }
    ]).toArray();
    console.log('Author with most books:', topAuthor);

    const byDecade = await books.aggregate([
      { $group: { _id: { $multiply: [ { $floor: { $divide: ['$published_year', 10] } }, 10 ] }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]).toArray();
    console.log('Books by decade:', byDecade);

    // --- Indexing ---
    await books.createIndex({ title: 1 });
    await books.createIndex({ author: 1, published_year: -1 });
    console.log('Indexes created');

    const explain = await books.find({ title: '1984' }).explain();
    console.log('Explain query for "1984":', explain.queryPlanner);

  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
    console.log('Connection closed');
  }
}

runQueries();
