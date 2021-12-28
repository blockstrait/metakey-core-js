import { Message } from './message';

interface ResultMessageParams {
  requestId: number;
  details: object;
  args: string[];
  kwArgs: object;
}

class ResultMessage extends Message {
  static type = 50;

  public requestId: number;
  public details: object;
  public args?: string[];
  public kwArgs?: object;

  constructor(params: ResultMessageParams) {
    super(ResultMessage.type);

    const { requestId, details, args, kwArgs } = params;

    this.requestId = requestId;
    this.details = details;
    this.args = args;
    this.kwArgs = kwArgs;
  }

  serialize() {
    const list = [this.type, this.requestId, this.details];

    if (this.args) {
      list.push(this.args);
    }

    if (this.kwArgs) {
      list.push(this.kwArgs);
    }

    return JSON.stringify(list);
  }
}

export { ResultMessage, ResultMessageParams };
