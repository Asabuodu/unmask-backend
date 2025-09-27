import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*', // Update this in production to your frontend URL
  },
  namespace: '/games', // socket namespace (e.g. ws://localhost:3000/games)
})
export class GamesGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  // Track connected clients
  private clients: Map<string, Socket> = new Map();

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    this.clients.set(client.id, client);

    // Optionally emit a welcome event
    client.emit('connected', {
      message: 'Welcome to the game gateway!',
      clientId: client.id,
    });
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.clients.delete(client.id);
  }

  // Example: handle player joining a room
  @SubscribeMessage('joinRoom')
  async onJoinRoom(
    @MessageBody() data: { room: string; player: string },
    @ConnectedSocket() client: Socket
  ) {
    await client.join(data.room);
    this.server.to(data.room).emit('playerJoined', {
      player: data.player,
      room: data.room,
    });
    return { event: 'joinedRoom', data };
  }

  // Example: handle player submitting a truth/lie
  @SubscribeMessage('submitChoice')
  onSubmitChoice(
    @MessageBody() data: { room: string; player: string; choice: string }
  ) {
    this.server.to(data.room).emit('choiceSubmitted', {
      player: data.player,
      choice: data.choice,
    });
    return { event: 'submittedChoice', data };
  }

  // Example: broadcast game start
  @SubscribeMessage('startGame')
  onStartGame(@MessageBody() data: { room: string }) {
    this.server.to(data.room).emit('gameStarted', {
      room: data.room,
      timestamp: new Date(),
    });
    return { event: 'gameStarted', data };
  }
}
