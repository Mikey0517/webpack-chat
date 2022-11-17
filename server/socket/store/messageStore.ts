/*
 * @Author       : 徐洋皓月
 * @Date         : 2022-11-15 15:07:17
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-11-17 13:55:27
 * @FilePath     : /chat-webpack/server/socket/store/messageStore.ts
 */
import type { Message } from '../../index.d.js'

/* abstract */ class MessageStore {
  saveMessage(message: Message) {}
  findMessagesForUser(userID: string) {}
}

class InMemoryMessageStore extends MessageStore {
  private messages: Array<Message>
  constructor() {
    super();
    this.messages = [];
  }

  saveMessage(message: Message) {
    this.messages.push(message);
  }

  findMessagesForUser(userID: string) {
    return this.messages.filter(
      ({ from, to }) => from === userID || to === userID
    );
  }
}

export default new InMemoryMessageStore()
