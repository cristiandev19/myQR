const express    = require('express'),
      app        = express(),
      cors       = require('cors'),
      bodyParser = require('body-parser'),
      { dbConnection } = require('./databases/mongo'),
      { config } = require('./config/index');

//passport stuff
const passport      = require('passport'),
      jwtStrategry  = require('./strategies/jwt');
passport.use(jwtStrategry);

// Hacemos la conexion a mongodb
dbConnection();

// Importamos los middlewares para manejar los errores
const { logErrors, errorHandler } = require('./middlewares/errorHandler');

// Aqui configuraciones
app
  .use(cors({ 'origin': '*' }))
  .use(bodyParser.urlencoded({ limit: '5mb', extended: true }))
  .use(bodyParser.json({ limit: '5mb' }));

// Importamos modulos
// const r_example = require('./src/modules/example/r_example');
const auth_router = require('./modules/auth/auth.router');
// Establecemos las rutas
app
  // .use('/example', r_example)
  .use('/auth', auth_router);

// Middleware para manejo de errores
app
  .use(logErrors)
  .use(errorHandler);


app.listen(config.port, () => {
  console.log(`Example app listening at http://localhost:${config.port}`);
});