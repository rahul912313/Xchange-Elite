import { RedisClientType, createClient } from "redis";
import { MessageFromOrderbook } from "./types/response";
import { MessageToEngine } from "./types/request";

class RedisManager {
  private static instance: RedisManager;
  private client: RedisClientType;
  private publisher: RedisClientType;

  private constructor() {
    // Redis is running on localhost and port 6379 (docker bind port)
    this.client = createClient({ url: "redis://localhost:6379" });
    this.client.connect();

    this.publisher = createClient({ url: "redis://localhost:6379" });
    this.publisher.connect();
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new RedisManager();
    return this.instance;
  }

  // Push to the queue and also listen for the same message
  public sendAndAwaitMessage(message: MessageToEngine) {
    return new Promise<MessageFromOrderbook>((resolve) => {
      const clientId = this.createRandomClientId();
      this.client.subscribe(clientId, (message) => {
        this.client.unsubscribe(clientId);
        resolve(JSON.parse(message));
      });

      // Push the message to the Redis queue
      this.publisher.lPush(
        "messageQueue",
        JSON.stringify({ clientId, message })
      );
    });
  }

  private createRandomClientId(): string {
    return Math.random().toString(36).substring(7);
  }
}

export { RedisManager };
