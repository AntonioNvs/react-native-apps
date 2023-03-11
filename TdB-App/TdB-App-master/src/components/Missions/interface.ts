export interface ChangeMissionsDTO{
  point: number;
  nameMission: string,
  subMission?: number
}

export default interface MissionOptions {
  onPontuationChange(arrayChange: {point: number, nameMission: string, subMission?: number}[]): void;
}
