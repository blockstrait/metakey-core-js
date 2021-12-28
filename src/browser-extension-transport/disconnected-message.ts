import { Message } from './message';

interface DisconnectedMessageParams {
  reason: string;
}

class DisconnectedMessage extends Message {
  static type = 'Disconnected';

  public reason: string;

  constructor(params: DisconnectedMessageParams) {
    super(DisconnectedMessage.type);

    const { reason } = params;

    this.reason = reason;
  }

  serialize() {
    return JSON.stringify({
      type: this.type,
      reason: this.reason,
    });
  }
}

export { DisconnectedMessage, DisconnectedMessageParams };
