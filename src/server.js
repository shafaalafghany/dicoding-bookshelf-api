import { server as _server } from '@hapi/hapi';
import routes from './modules/books/book.routes.js';
const PORT = 9000

const init = async () => {
  const server = _server({
    port: PORT,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route(routes);

  await server.start();
  console.log(`app listen to port ${PORT}`);
};

init();
