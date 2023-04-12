require('dotenv').config();
const app = require('./app');
const { db } = require('./database/config');

//AUTENTICACION CON LA BASE DE DATOS
db.authenticate()
    .then(() => console.log('Database Authenticated! 👏'))
    .catch((error) => console.log(error));

//SINCRONIZACION CON LA BASE DE DATOS
db.sync()
    .then(() => console.log('Database Synced! 🔄️'))
    .catch((error) => console.log(error));

const port = +process.env.PORT || 3200;
app.listen(port, () => {
    console.log(`Excellent!, runnig server on port ${port} 🥳`);
});
