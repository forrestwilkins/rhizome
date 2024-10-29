import { WebSocket, WebSocketServer } from 'ws';

export class WebSocketWithId extends WebSocket {
  id!: string;
}

export class WebSocketServerWithIds extends WebSocketServer<
  typeof WebSocketWithId
> {}
