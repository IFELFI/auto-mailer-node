import net from 'net';
import 'dotenv/config';
import config from './config';
import { BufferData, BufferDataSchema } from './validations/buffer';
import { sendAuthCode } from './services/authCode.service';
import { logger } from './utils/logger';
import { validate } from './validations';
import { generateError } from './utils/error';

const server = net.createServer((socket) => {
  socket.setEncoding('utf-8');

  socket.on('data', (buffer: Buffer) => {
    let bufferData: BufferData | undefined
    try {
      bufferData = JSON.parse(buffer.toString());
      validate(BufferDataSchema, bufferData);
    } catch (error: Error | unknown) {
      if (error instanceof Error) {
        const errorMessage = generateError(error.message);
        socket.write(errorMessage);
        logger.error(error);
        return;
      } else {
        const errorMessage = generateError('Unknown error');
        socket.write(errorMessage);
        logger.error(error);
        return;
      }
    }

    if (bufferData && bufferData.cmd === 'sendAuthCode') {
      sendAuthCode(bufferData.data);
    } else {
      socket.write('Unknown command');
      logger.error(JSON.stringify(bufferData));
    }
  });

  socket.on('close', () => {
    logger.info('Client disconnected');
  });

  socket.on('error', (err) => {
    logger.error(err);
  });

  socket.write('Hello from server');
});

server.on('error', (err) => {
  logger.error(err);
});

server.listen(config.server.port, config.server.host, () => {
  logger.info(`Server is listening on ${config.server.host}:${config.server.port}`);
});
