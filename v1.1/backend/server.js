const http = require('http');

// on charge l'application
const {app} = require('./app');

const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || '8080');
app.set('port', port);

const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
    default:
      console.error(error);
      throw error;
  }
};

const server = http.createServer(app); // création du serveur

server.on('error', errorHandler); // quand mon serveur rencontre une erreur, il exécute la fonction errorHandler définie plus haut
server.on('listening', () => { // quand mon serveur écoute les requêtes entrantes
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Serveur à l\'écoute sur ' + bind);
});

server.listen(port);