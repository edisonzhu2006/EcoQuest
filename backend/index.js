const express = require('express')
const mongoose = require('mongoose')
const Item = require('./models/item.model');
const app = express()

app.use(express.json());
app.get('/',  function (req, res) {
    res.send('Hello From de api.');
});


app.listen(3000, () => {console.log('Server is running on port 3000')
});

app.post( '/api/items', async (req, res) => {
    try {
        const item = await Item.create(req.body);
        res.status(200).json(item);
    }
    catch (error) {
        res.status(500).json({  error: error.message });
    }
    console.log(req.body);
    res.send('Item added');
});

app.get('/api/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/api/item/:id", async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        res.status(200).json(item);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//to update an item
app.put("/api/item/:id", async (req, res) => {
  try {
    const{id} = req.params;
    const product = await Product.findbyIdAndUpdate(id, req.body);

    if (!product) {
      return res.status(404).send('item not found');
    }

    res.status(200).json({message: "item updated"});
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
});

mongoose.connect('mongodb+srv://ez2103:WQtgiFLH4aYBtCZw@backend.pv7daup.mongodb.net/Backend?retryWrites=true&w=majority&appName=Backend', {
  })
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(() => {
    console.log('Connection failed!');
  });