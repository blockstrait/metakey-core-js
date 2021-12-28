import { Message } from './message';

interface HelloMessageParams {
  realm: string;
  roles: string[];
}

class HelloMessage extends Message {
  static type = 1;

  public realm: string;
  public roles: string[];

  constructor(params: HelloMessageParams) {
    super(HelloMessage.type);

    const { realm, roles } = params;

    const supportedRoles = ['publisher', 'subscriber', 'caller', 'callee'];

    roles.forEach(role => {
      if (!supportedRoles.includes(role)) {
        throw new Error('Unsupported role');
      }
    });

    this.realm = realm;
    this.roles = roles;
  }

  serialize(): string {
    const details: any = {
      roles: {},
    };

    this.roles.forEach(role => {
      details.roles[role] = {};
    });

    return JSON.stringify([this.type, this.realm, details]);
  }
}

export { HelloMessage, HelloMessageParams };
