import app from './app';
import env from './config/environment';
import logger from './shared/utils/logger';

const server = app.listen(env.PORT, () => {
  logger.info(`Server running on port ${env.PORT}`);
});

server.on('error', (error: NodeJS.ErrnoException) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof env.PORT === 'string' ? `Pipe ${env.PORT}` : `Port ${env.PORT}`;

  switch (error.code) {
    case 'EACCES':
      logger.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      logger.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});

process.on('unhandledRejection', (error: Error) => {
  logger.error('Unhandled Rejection:', error);
  server.close(() => process.exit(1));
});

process.on('uncaughtException', (error: Error) => {
  logger.error('Uncaught Exception:', error);
  server.close(() => process.exit(1));
});

export default server;