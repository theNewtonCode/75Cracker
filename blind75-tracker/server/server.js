const express = require('express');
const progressRoutes = require('./routes/progress');

const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use('/api/progress', progressRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});