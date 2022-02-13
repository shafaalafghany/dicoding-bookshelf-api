const hapi = require('@hapi/hapi');
const routes = require('./modules/books/book.routes');

const init = async () => {
  const server = hapi.server({
    port: 5000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route(routes);

  await server.start();
  console.log('app listen to port 5000');
};

init();
