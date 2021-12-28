import { Message } from './message';

interface DataMessageParams {
  payload: string;
}

class DataMessage extends Message {
  static type = 'Data';

  public payload: string;

  constructor(params: DataMessageParams) {
    super(DataMessage.type);

    const { payload } = params;

    this.payload = payload;
  }

  serialize() {
    return JSON.stringify({
      type: this.type,
      payload: this.payload,
    });
  }
}

export { DataMessage, DataMessageParams };
