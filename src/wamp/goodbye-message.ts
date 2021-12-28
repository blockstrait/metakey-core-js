import { Message } from './message';

interface GoodbyeMessageParams {
  errorMessage: string;
  reason: string;
}

class GoodbyeMessage extends Message {
  static type = 6;

  public reason: string;
  public errorMessage: string;

  constructor(params: GoodbyeMessageParams) {
    super(GoodbyeMessage.type);

    const { reason, errorMessage } = params;

    this.reason = reason;
    this.errorMessage = errorMessage;
  }

  serialize(): string {
    const details: any = {
      message: this.errorMessage,
    };

    return JSON.stringify([this.type, details, this.reason]);
  }
}

export { GoodbyeMessage, GoodbyeMessageParams };
