import { AbortMessage } from './abort-message';
import { CallMessage } from './call-message';
import { ErrorMessage } from './error-message';
import { GoodbyeMessage } from './goodbye-message';
import { HelloMessage } from './hello-message';
import { ResultMessage } from './result-message';
import { WelcomeMessage } from './welcome-message';

class MessageFactory {
  fromJSON(json: string) {
    const payload = JSON.parse(json);

    if (!Array.isArray(payload)) {
      throw new Error('Payload not an array');
    }

    if (payload.length === 0) {
      throw new Error('Payload has no elements');
    }

    const msgType = payload[0];

    let message = null;

    let details;
    let errorMessage;

    switch (msgType) {
      case HelloMessage.type:
        details = payload[2];

        message = new HelloMessage({
          realm: payload[1],
          roles: Object.keys(details.roles),
        });
        break;

      case WelcomeMessage.type:
        details = payload[2];

        message = new WelcomeMessage({
          session: payload[1],
          roles: Object.keys(details.roles),
        });
        break;

      case CallMessage.type:
        message = new CallMessage({
          requestId: payload[1],
          options: payload[2],
          procedureUri: payload[3],
          args: payload[4],
          kwArgs: payload[5],
        });
        break;

      case ResultMessage.type:
        message = new ResultMessage({
          requestId: payload[1],
          details: payload[2],
          args: payload[3],
          kwArgs: payload[4],
        });
        break;

      case AbortMessage.type:
        details = payload[1];

        errorMessage = '';

        if (typeof details !== 'object') {
          throw new Error('`details` must be an object');
        }

        if (typeof details.message === 'string') {
          errorMessage = details.message;
        }

        message = new AbortMessage({
          errorMessage,
          reason: payload[2],
        });
        break;

      case GoodbyeMessage.type:
        details = payload[1];

        errorMessage = '';

        if (typeof details !== 'object') {
          throw new Error('`details` must be an object');
        }

        if (typeof details.message === 'string') {
          errorMessage = details.message;
        }

        message = new GoodbyeMessage({
          errorMessage,
          reason: payload[2],
        });
        break;

      case ErrorMessage.type:
        const [requestType, requestId, _details, errorUri, args, kwArgs] =
          payload.slice(1);

        if (typeof requestType !== 'number') {
          throw new Error('`requestType` must be a number');
        }

        if (typeof requestId !== 'number') {
          throw new Error('`requestId` must be a number');
        }

        if (typeof _details !== 'object') {
          throw new Error('`details` must be an object');
        }

        if (typeof errorUri !== 'string') {
          throw new Error('`errorUri` must be a string');
        }

        if (args && !Array.isArray(args)) {
          throw new Error('`args` must be an array');
        }

        if (kwArgs && typeof kwArgs !== 'object') {
          throw new Error('`kwArgs` must be an object');
        }

        message = new ErrorMessage({
          requestType,
          requestId,
          details: _details,
          errorUri,
          args,
          kwArgs,
        });
        break;

      default:
        throw new Error('Unexpected message type');
    }

    return message;
  }
}

export { MessageFactory };
