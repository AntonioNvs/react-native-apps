import getRealm from "../services/realm";
import { isAfter, subDays, isBefore, eachDayOfInterval } from 'date-fns'

export async function searchNumberRegister(workspaceName: string) {
  const realm = await getRealm()

  // Capturando as ocorrências do workspace
  const registersWithWorkspace = realm.objects('Register').filter(row => row.workspace_name === workspaceName) 
  let lastWeek = 0;
  let firstRegisterDate = new Date();
  for(let register of registersWithWorkspace) {
    if(isBefore(register.date, firstRegisterDate))
          firstRegisterDate = register.date

    // última semana
    if(isAfter(register.date, subDays(new Date(), 7)))
      lastWeek ++; 
  }



  const firstDateRegister = eachDayOfInterval({
    start: firstRegisterDate,
    end: new Date()
  }).length

  const valuesReturn = {
    allTests: registersWithWorkspace.length,
    lastWeek,
    frequency: registersWithWorkspace.length / ((firstDateRegister != 0) ? firstDateRegister : 1)
  }

  return valuesReturn
}