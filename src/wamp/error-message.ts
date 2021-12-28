import { Message } from './message';

interface ErrorMessageParams {
  requestType: number;
  requestId: number;
  details: object;
  errorUri: string;
  args?: string[];
  kwArgs?: object;
}

class ErrorMessage extends Message {
  static type = 8;

  public requestType: number;
  public requestId: number;
  public details: object;
  public errorUri: string;
  public args?: string[];
  public kwArgs?: object;

  constructor(params: ErrorMessageParams) {
    super(ErrorMessage.type);

    const { requestType, requestId, details, errorUri, args, kwArgs } = params;

    this.requestType = requestType;
    this.requestId = requestId;
    this.details = details;
    this.errorUri = errorUri;
    this.args = args;
    this.kwArgs = kwArgs;
  }

  serialize() {
    return JSON.stringify([
      this.type,
      this.requestType,
      this.requestId,
      this.details,
      this.errorUri,
      this.args,
      this.kwArgs,
    ]);
  }
}

export { ErrorMessage, ErrorMessageParams };
