import { CallMessage } from './call-message';
import { ErrorMessage } from './error-message';

interface CallErrorMessageParams {
  requestId: number;
  details: object;
  errorUri: string;
  args?: string[];
  kwArgs?: object;
}

class CallErrorMessage extends ErrorMessage {
  constructor(params: CallErrorMessageParams) {
    const { requestId, details, errorUri, args, kwArgs } = params;

    super({
      requestType: CallMessage.type,
      requestId,
      details,
      errorUri,
      args,
      kwArgs,
    });
  }
}

export { CallErrorMessage, CallErrorMessageParams };
