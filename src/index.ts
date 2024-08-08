import net from 'net';
import 'dotenv/config';
import config from './config';
import { BufferData } from './validations/buffer';
import { sendAuthCode } from './services/authCode.service';
import { log } from 'console';

const server = net.createServer((socket) => {
  socket.setEncoding('utf-8');

  socket.on('data', (buffer: BufferData) => {
    // if (buffer.cmd === 'echo') {
    //   sendAuthCode(buffer.data);
    // } else {
    //   socket.write(buffer.data);
    //   socket.write('Unknown command');
    // }
    sendAuthCode({email: 'ifelfi@gmail.com', code: '1234'})
  });

  socket.on('close', () => {
    console.log('Client disconnected');
  });

  socket.on('error', (err) => {
    console.error(err);
  });

  socket.write('Hello from server');
});

server.on('error', (err) => {
  console.error(err);
});

// server.listen(config.server.port, config.server.host, () => {
//   console.log(`Server started on ${process.env.HOST}:${process.env.PORT}`);
// });
server.listen(config.server.port, () => {
  console.log(`Server started on ${process.env.HOST}:${process.env.PORT}`);
});
