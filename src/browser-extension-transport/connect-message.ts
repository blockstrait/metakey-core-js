import { Message } from './message';

class ConnectMessage extends Message {
  static type = 'Connect';

  constructor() {
    super(ConnectMessage.type);
  }

  serialize() {
    return JSON.stringify({
      type: this.type,
    });
  }
}

export { ConnectMessage };
