abstract class Message {
  public type: number;

  constructor(type: number) {
    this.type = type;
  }

  abstract serialize(): string;
}

export { Message };
