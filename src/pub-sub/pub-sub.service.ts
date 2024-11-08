import WebSocket from 'ws';
import cacheService from '../cache/cache.service';
import { PubSubMessage, WebSocketWithId } from './pub-sub.models';

class PubSubService {
  /** Local mapping of subscriber IDs to WebSocket connections */
  private subscribers: Record<string, WebSocketWithId>;

  constructor() {
    this.subscribers = {};
  }

  handleMessage(webSocket: WebSocketWithId, data: WebSocket.RawData) {
    const { channel, body, request, token }: PubSubMessage = JSON.parse(
      data.toString(),
    );
    switch (request) {
      case 'PUBLISH':
        this.publish(channel, body, webSocket);
        break;
      case 'SUBSCRIBE':
        this.subscribe(channel, token, webSocket);
        break;
      case 'UNSUBSCRIBE':
        this.unsubscribe(channel, webSocket);
        break;
      default:
        webSocket.send(JSON.stringify({ error: 'Invalid request type' }));
    }
  }

  async publish(
    channel: string,
    message: unknown,
    publisher?: WebSocketWithId,
  ) {
    const subscriberIds = await cacheService.client.sMembers(
      `channel:${channel}`,
    );
    if (subscriberIds.length === 0) {
      console.error(`Channel ${channel} does not have any subscribers.`);
      return;
    }
    for (const subscriberId of subscriberIds) {
      if (subscriberId === publisher?.id) {
        continue;
      }
      const subscriber = this.subscribers[subscriberId];
      if (subscriber?.readyState === WebSocket.OPEN) {
        subscriber.send(
          JSON.stringify({
            channel: channel,
            body: message,
          }),
        );
      }
    }
  }

  async subscribe(channel: string, token: string, subscriber: WebSocketWithId) {
    subscriber.id = token;

    // Add subscriber to local map and Redis set
    this.subscribers[token] = subscriber;
    await cacheService.client.sAdd(`channel:${channel}`, token);

    // Clean up on disconnect
    subscriber.on('close', async () => {
      await this.unsubscribe(channel, subscriber);
      delete this.subscribers[token];
    });
  }

  async unsubscribe(channel: string, subscriber: WebSocketWithId) {
    await cacheService.client.sRem(`channel:${channel}`, subscriber.id);
    delete this.subscribers[subscriber.id];
  }
}

const pubSubService = new PubSubService();
export default pubSubService;
