const express = require('express');

const antennesRoute = require('./controllers/antennes')


const port = process.env.PORT || 3001;


const app = express();
// app.use(cors())
app.use(express.urlencoded({
    limit: "50mb",
    extended: false
  }));
  
app.use(express.json({limit: "50mb"}));


app.use('/api', antennesRoute)

app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});

