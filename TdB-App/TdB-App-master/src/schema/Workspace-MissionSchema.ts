export default class WorkspaceMissionSchema {
  static schema = {
    name: 'WorkspaceMission',
    properties: {
      workspace: 'string',
      mission: 'string',
    },
  };
}