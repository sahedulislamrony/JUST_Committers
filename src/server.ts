import app from './app';
import { config } from './config/environment';

let server: ReturnType<typeof app.listen>;

const startServer = () => {
  server = app.listen(config.port, () => {
    console.log(`=================================`);
    console.log(`  Server is running on port ${config.port}`);
    console.log(`  Environment: ${config.nodeEnv}`);
    console.log(`  Health Check: http://localhost:${config.port}/api/v1/health`);
    console.log(`=================================`);
  });
};

// Graceful shutdown
const gracefulShutdown = (signal: string) => {
  console.log(`Received ${signal}. Shutting down gracefully...`);
  if (server) {
    server.close(() => {
      console.log('Server closed.');
      process.exit(0);
    });
  } else {
    process.exit(0);
  }

  // Force exit if shutdown hangs
  setTimeout(() => {
    console.error('Forced shutdown due to timeout.');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

process.on('unhandledRejection', (reason: Error | any) => {
  console.error('UNHANDLED REJECTION! 💥 Shutting down...');
  console.error(reason);
  gracefulShutdown('unhandledRejection');
});

process.on('uncaughtException', (error: Error) => {
  console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.error(error);
  process.exit(1);
});

startServer();
