const express = require('express');

const dvdRoute = require('./src/routes/dvd')

const app = express();

const db = require('./src/model');
db.sequelize.sync({}).then(() => {
    console.log('Drop and re-sync db.');
})

app.use(express.json());

app.use((req, res, next) => {
    console.log('Incoming req from ', req.ip);
    next();
})

//CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});
//CORS

app.use('/dvd', dvdRoute);

app.use((req, res, next) => {
    console.log('Request End', req.ip);
    next();
});

app.use((req, res) => {
    res.status(404).send('<h2>Oops. Page Not Found</h2>')
});

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log("Server listened on port", PORT);
});

// app.listen(process.env.PORT || PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// })