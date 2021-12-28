import { Message } from './message';

interface AbortMessageParams {
  errorMessage: string;
  reason: string;
}

class AbortMessage extends Message {
  static type = 3;

  public errorMessage: string;
  public reason: string;

  constructor(params: AbortMessageParams) {
    super(AbortMessage.type);

    const { errorMessage, reason } = params;

    this.errorMessage = errorMessage;
    this.reason = reason;
  }

  serialize() {
    const details: any = {
      message: this.errorMessage,
    };

    return JSON.stringify([this.type, details, this.reason]);
  }
}

export { AbortMessage, AbortMessageParams };
