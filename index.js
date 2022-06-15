import Express from "express";
import router from "./routes/index.js";
import db from "./config/db.js";

const app = Express();

// Conectar la base de datos
db.authenticate()
    .then(() => console.log('Base de datos Conectada'))
    .catch(error => console.log(error));

// Definir puerto
const port = process.env.PORT || 4000;
const host = process.env.HOST || '0.0.0.0'

// Habilitar PUG
app.set('view engine', 'pug');

// Obtener el año actual
app.use((req, res, next) => {

    const year = new Date();

    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = 'Agencia de Viajes';

    return next();
});

// Agregar body parser para leer los datos del formulario
app.use(Express.urlencoded({ extended: true }));

// Definir la carpeta publica
app.use(Express.static('public'));

// Agrega Router
app.use('/', router);

app.listen(port, host, () => {
    console.log(`El Servidor esta funcionando en el puerto ${port}`);
});