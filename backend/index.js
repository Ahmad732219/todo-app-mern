const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL || 'mongodb://admin:password123@mongodb:27017/tododb?authSource=admin')
  .then(() => console.log('MongoDB Connected!'))
  .catch(err => console.log('MongoDB Error:', err));

// Todo Model
const Todo = mongoose.model('Todo', {
  title: String,
  completed: { type: Boolean, default: false }
});

// Routes
app.get('/', (req, res) => {
  res.send('Todo API is running! 🚀');
});

app.get('/todos', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post('/todos', async (req, res) => {
  const todo = new Todo({ title: req.body.title });
  await todo.save();
  res.json(todo);
});

app.delete('/todos/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
