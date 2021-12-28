import { Message } from './message';

interface WelcomeMessageParams {
  session: number;
  roles: string[];
}

class WelcomeMessage extends Message {
  static type = 2;

  public session: number;
  public roles: string[];

  constructor(params: WelcomeMessageParams) {
    super(WelcomeMessage.type);

    const { session, roles } = params;

    const supportedRoles = ['broker', 'dealer'];

    roles.forEach(role => {
      if (!supportedRoles.includes(role)) {
        throw new Error('Unsupported role');
      }
    });

    this.session = session;
    this.roles = roles;
  }

  serialize(): string {
    const details: any = {
      roles: {},
    };

    this.roles.forEach(role => {
      details.roles[role] = {};
    });

    return JSON.stringify([this.type, this.session, details]);
  }
}

export { WelcomeMessage, WelcomeMessageParams };
