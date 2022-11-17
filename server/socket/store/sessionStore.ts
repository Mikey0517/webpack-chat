/*
 * @Author       : 徐洋皓月
 * @Date         : 2022-11-15 15:07:17
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-11-17 14:11:42
 * @FilePath     : /chat-webpack/server/socket/store/sessionStore.ts
 */
import type { Session } from '../../index.d.js'

/* abstract */ class SessionStore {
  findSession(sessionID: string) {}
  saveSession(sessionID: string, session: Session) {}
  findAllSessions() {}
}

class InMemorySessionStore extends SessionStore {
  private sessions: Map<string, Session>
  constructor() {
    super();
    this.sessions = new Map();
  }

  findSession(sessionID: string): Session {
    return (this.sessions.get(sessionID)) as Session
  }

  saveSession(sessionID: string, session: Session) {
    this.sessions.set(sessionID, session);
  }

  findAllSessions() {
    return [...this.sessions.values()];
  }
}

export default new InMemorySessionStore()
