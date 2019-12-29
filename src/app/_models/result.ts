export class Result {
  // @ts-ignore
  id?: number;

  [playerId: string]: {
    order: number;
    plus: string[];
    minus: string[];
  }
}
