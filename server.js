const dotenv = require('dotenv');
const mongoose = require('mongoose');
const livereload = require('livereload');
const path = require('path');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! shutting dow...');
  console.log(err.name, err.message, err.stack);
  process.exit(1);
});
 
dotenv.config({ path: './config.env' });
 
//    

const connectToDB = require('./database');
connectToDB();

const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));

// ping browser on Express boot, once browser has reconnected and handshaken
liveReloadServer.server.once('connection', () => {
  liveReloadServer.refresh('/');
}); 
 
const app = require('./app');

const port = process.env.PORT;
console.log(port);
const server = app.listen(port, () => {
  console.log(`node listenenig at port ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! Shutting down');
  console.log(err.name, err.message, err.stack);
  server.close(() => {
    process.exit(1);
  });
}); 

process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('💥 Process terminated!');
  });
});
 