export default class SubMissionSchema {
  static schema = {
    name: 'SubMission',
    primaryKey: 'id',
    properties: {
      id: { type: 'int', indexed: true },
      description: 'string',
      number: 'int',
      mission_name: 'string',
    },
  };
}
