Week 1: MongoDB Fundamentals Assignment
🚀 Objective

This assignment demonstrates understanding of MongoDB fundamentals, including:

Connecting to MongoDB using Node.js

Performing CRUD operations

Using advanced queries, projection, sorting, and pagination

Aggregation pipelines

Indexing and performance analysis

📂 Project Structure
plp_bookstore/
│
├─ insert_books.js       # Script to populate the 'books' collection
├─ queries.js            # Script containing all CRUD, advanced queries, and aggregation
├─ .env                  # Environment variables (MongoDB URI and database name)
├─ package.json          # Node.js project file
└─ README.md             # This file


⚙️ Setup Instructions



Install dependencies

npm install


Create .env file in the project root:

MONGO_URI=your_mongodb_connection_string
DB_NAME=plp_bookstore


Replace your_mongodb_connection_string with your MongoDB Atlas URI or local MongoDB connection string.

Run the insert script to populate the database:

node insert_books.js


This will insert sample books into the books collection.

If a book already exists, it will be skipped to avoid duplicates.

Run the queries script to test CRUD operations, advanced queries, aggregation, and indexing:

node queries.js


Check the console output for results.

This script demonstrates:

Finding books by genre, author, or year

Updating book prices

Deleting a book

Advanced queries with projection, sorting, and pagination

Aggregation pipelines

Index creation and performance explanation