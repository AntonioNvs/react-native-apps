export default class RegisterSubMissionSchema {
  static schema = {
    name: 'RegisterSubMission',
    primaryKey: 'id',
    properties: {
      id: { type: 'int', indexed: true},
      register_id: 'int',
      subMission_id: 'int',
      pontuation: 'int',
    },
  };
}
