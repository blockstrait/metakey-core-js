import { Message } from './message';

interface ConnectReplyMessageParams {
  status: string;
  id?: number;
}

class ConnectReplyMessage extends Message {
  static type = 'ConnectReply';

  public status: string;
  public id?: number;

  constructor(params: ConnectReplyMessageParams) {
    super(ConnectReplyMessage.type);

    const { status, id } = params;

    this.status = status;
    this.id = id;
  }

  serialize() {
    return JSON.stringify({
      type: this.type,
      status: this.status,
      id: this.id,
    });
  }
}

export { ConnectReplyMessage, ConnectReplyMessageParams };
