import { ConnectMessage } from './connect-message';
import { ConnectReplyMessage } from './connect-reply-message';
import { DataMessage } from './data-message';
import { DisconnectedMessage } from './disconnected-message';

class MessageFactory {
  fromJSON(json: string) {
    const messageObject = JSON.parse(json);

    if (messageObject.type === undefined) {
      throw new Error('Payload type not found');
    }

    let message = null;

    switch (messageObject.type) {
      case ConnectMessage.type:
        message = new ConnectMessage();
        break;

      case ConnectReplyMessage.type:
        message = new ConnectReplyMessage({
          status: messageObject.status,
          id: messageObject.id,
        });
        break;

      case DataMessage.type:
        message = new DataMessage({
          payload: messageObject.payload,
        });
        break;

      case DisconnectedMessage.type:
        message = new DisconnectedMessage({
          reason: messageObject.reason,
        });
        break;

      default:
        throw new Error('Unexpected message type');
    }

    return message;
  }
}

export { MessageFactory };
