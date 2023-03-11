export default class WorkspaceSchema {
  static schema = {
    name: 'Workspace',
    primaryKey: 'name',
    properties: {
      name: { type: 'string', indexed: true },
    },
  };
}
