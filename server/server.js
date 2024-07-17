const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const Book = require("./models/Book");

const app = express()
const port = process.env.PORT;
const AtlasUri = process.env.ATLASURI;

app.use(cors());

mongoose.connect(AtlasUri).then(() => {
  console.log('Connected');
})

app.post('/register', (req, res) => {
  res.status(200).json({ message: 'register' })
})

app.post('/login', (req, res) => {
  res.status(200).json({ message: 'login' })
})

app.post('/test', async (req, res) => {
  let newBook = new Book({
    title: 'The Story Smuggler ',
    genre: 'fiction',
    author: 'Georgi Gospodinov',
    preface: `Some smuggle cigarettes or alcohol, others weapons, but for renowned Bulgarian novelist Georgi Gospodinov, the most dangerous contraband is carried by writers, who surreptitiously move stories across borders. In The Story Smuggler, Gospodinov explores how smugglers, writers, and translators are all involved in transporting whatever may be desired, valued, missing, repressed, or forbidden.
    There's a melancholic tone here, as Gospodinov's exploration focuses on his childhood in Communist Bulgaria and on the fantasies of other lives and places that this childhood engendered. Accompanying the text are drawings by award-winning Bulgarian animator and graphic artist Theodore Ushev, adding a further layer to its exposition of border-crossing.`,
    availability: 1,
    year: '2024-01-01',
    price: 74.9,
    signed: true,
    likes: 300,
    pages: 70,
    rating: 4
  });
  await newBook.save();
  res.status(200).json({ message: 'done' })
})

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${port}`)
})