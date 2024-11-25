import cacheService from '../cache/cache.service';
import { WebSocketWithId } from '../pub-sub/pub-sub.models';
import pubSubService from '../pub-sub/pub-sub.service';

const DRAW_STREAM_KEY = 'interactions:draw';
const DRAW_CLEAR_CHANNEL = 'draw:clear';
const DRAW_CHANNEL = 'draw';

interface Point {
  x: number;
  y: number;
}

interface Stroke {
  path: Point[];
}

class InteractionsService {
  constructor() {
    pubSubService.registerChannelHandler(
      DRAW_CHANNEL,
      this.handleDrawMessage.bind(this),
    );
  }

  async getDrawStream() {
    const stream = await cacheService.getStreamMessages(DRAW_STREAM_KEY);
    const reversedStream = stream.reverse();

    return reversedStream.map(({ id, message }) => ({
      message: { path: JSON.parse(message.path) },
      id,
    }));
  }

  async clearDrawStream() {
    await cacheService.trimStreamMessages(DRAW_STREAM_KEY, Date.now());
    await pubSubService.publish(DRAW_CLEAR_CHANNEL, { clear: true });
  }

  async handleDrawMessage({ path }: Stroke, publisher: WebSocketWithId) {
    await cacheService.addStreamMessage(DRAW_STREAM_KEY, {
      userId: publisher.id,
      path: JSON.stringify(path),
    });
  }
}

const interactionsService = new InteractionsService();
export default interactionsService;
