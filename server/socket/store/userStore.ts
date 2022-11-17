/*
 * @Author       : 徐洋皓月
 * @Date         : 2022-11-17 13:25:38
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-11-17 14:11:35
 * @FilePath     : /chat-webpack/server/socket/store/userStore.ts
 */
import type { User } from '../../index.d.js'

/* abstract */ class UserStore {
  findUser(userID: string) {}
  saveUser(userID: string, user: User) {}
  findAllUser() {}
}

class InMemoryUserStore extends UserStore {
  private users: Map<string, User>
  constructor() {
    super();
    this.users = new Map();
  }

  findUser(userID: string): User {
    return (this.users.get(userID)) as User
  }

  saveUser(userID: string, user: User) {
    this.users.set(userID, user);
  }

  findAllUser() {
    return [...this.users.values()];
  }
}

export default new InMemoryUserStore()
