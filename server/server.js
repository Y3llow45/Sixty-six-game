const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const bcrypt = require('bcrypt');
const generateToken = require('./services/genToken');
const bodyParser = require('body-parser');
const Book = require("./models/Book");
const User = require("./models/User");

const app = express()
const PORT = parseInt(process.env.PORT, 10)
const saltRounds = parseInt(process.env.saltRounds, 10)
const AtlasUri = process.env.ATLASURI;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(AtlasUri).then(() => {
  console.log('Connected to db');
})

app.post('/register', async (req, res) => {
  try {
    let { username, password } = req.body;
    const testUsername = await User.find({ username: username })
    console.log('find')
    if (testUsername.length > 0) {
      console.log(testUsername)
      return res.status(400).json({ message: 'Username already exists' });
    }
    console.log('continnuing')
    bcrypt
      .hash(password, saltRounds)
      .then(hash => {
        let newUser = new User({ username: username, password: hash })
        console.log('before saving')
        newUser.save();
        console.log('saved')
      })
      .catch((err) => { throw err })
  }
  catch (error) {
    res.statusMessage = `${error}`;
    return res.status(500).send();
  }
  console.log('acc created')
  res.status(201).json({ message: 'Account created' });
})

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.find({ username: username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    bcrypt
      .hash(user.password, saltRounds)
      .then(hash => {
        user.password = hash;
      })
      .catch((err) => { throw err })

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }
    const token = generateToken(user._id, user.username);
    res.status(200).json({ message: 'Sign in successful', token, username: user.username });

  } catch (error) {
    console.error('Error during sign-in:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

app.get('/test', async (req, res) => {
  console.log('here')
  try {
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
    await newBook.save().then(console.log('added'))
  } catch (error) {
    console.log(error)
  }
  res.status(200).json({ message: 'created' })
})

app.get('/checkUsername/:username', async (req, res) => {
  try {
    let { username } = req.params;
    user = await User.findOne({ username: input });
    if (!lesson) {
      return res.status(200).json({ message: 'false' });
    } else {
      return res.status(200).json({ message: 'true' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`)
})