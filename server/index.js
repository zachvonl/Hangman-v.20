const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://mongo:27017/hangman', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Player = mongoose.model('Player', {
  name: String,
  wins: Number,
  losses: Number,
});

app.post('/api/record', async (req, res) => {
  const { name, didWin } = req.body;
  const player = await Player.findOne({ name }) || new Player({ name, wins: 0, losses: 0 });
  if (didWin) player.wins += 1;
  else player.losses += 1;
  await player.save();
  res.json(player);
});

app.get('/api/leaderboard', async (req, res) => {
  const players = await Player.find({});
  res.json(players);
});

app.listen(4000, () => console.log('Server on port 4000'));
