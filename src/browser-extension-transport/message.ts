abstract class Message {
  public type: string;

  constructor(type: string) {
    this.type = type;
  }

  abstract serialize(): string;
}

export { Message };
