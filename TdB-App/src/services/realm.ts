import Realm from 'realm';

import MissionSchema from '../schema/MissionsSchema';
import SubMissionSchema from '../schema/SubMissionSchema';
import WorkspaceSchema from '../schema/WorkspaceSchema';
import WorkspaceMissionSchema from '../schema/Workspace-MissionSchema';
import RegisterSubMissionSchema from '../schema/Register-SubMissionSchema';
import RegisterSchema from '../schema/RegisterSchema';

export default function getRealm() {
  return Realm.open({
    schema: [
      WorkspaceSchema, MissionSchema, SubMissionSchema, WorkspaceMissionSchema, RegisterSubMissionSchema, RegisterSchema],
  });
}
