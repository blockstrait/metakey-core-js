import { Message } from './message';

interface CallMessageParams {
  requestId: number;
  procedureUri: string;
  options?: object;
  args?: string[];
  kwArgs?: object;
}

class CallMessage extends Message {
  static type = 48;

  public requestId: number;
  public procedureUri: string;
  public options?: object;
  public args?: string[];
  public kwArgs?: object;

  constructor(params: CallMessageParams) {
    super(CallMessage.type);

    const { requestId, procedureUri, options, args, kwArgs } = params;

    this.requestId = requestId;
    this.procedureUri = procedureUri;
    this.options = options;
    this.args = args;
    this.kwArgs = kwArgs;
  }

  serialize() {
    const list = [this.type, this.requestId, this.options, this.procedureUri];

    if (this.args || this.kwArgs) {
      list.push(this.args ? this.args : []);
      list.push(this.kwArgs ? this.kwArgs : {});
    }

    return JSON.stringify(list);
  }
}

export { CallMessage, CallMessageParams };
