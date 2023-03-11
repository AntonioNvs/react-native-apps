export default class RegisterSchema {
  static schema = {
    name: 'Register',
    primaryKey: 'id',
    properties: {
      id: { type: 'int', indexed: true},
      pontuation: 'int',
      workspace_name: 'string',
      time: 'int',
      date: 'date',
    },
  };
}
