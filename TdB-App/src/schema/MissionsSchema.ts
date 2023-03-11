export default class MissionSchema {
  static schema = {
    name: 'Mission',
    primaryKey: 'name',
    properties: {
      name: { type: 'string', indexed: true },
      icon: 'string',
    },
  };
}
