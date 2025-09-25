import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class GamesGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('joinGame')
  handleJoin(@MessageBody() data: { username: string }) {
    this.server.emit('playerJoined', data);
  }

  @SubscribeMessage('submitStatement')
  handleStatement(@MessageBody() data: { user: string; text: string; type: string }) {
    this.server.emit('newStatement', data);
  }
}
