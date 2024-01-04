const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors({ origin: '*' }));

mongoose.connect('mongodb+srv://samsulmuhyidin:<password>@cluster0.jof99vn.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

const Schema = mongoose.Schema;

const dataSchema = new Schema({
  input1: String,
  input2: Number,
  input3: Boolean
});

const Data = mongoose.model('Data', dataSchema);

app.post('/data', async (req, res) => {
  const { input1, input2, input3 } = req.body;
  
  const newData = new Data({ input1, input2, input3 });
  await newData.save();
  
  res.send('Data sent to MongoDB successfully');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});