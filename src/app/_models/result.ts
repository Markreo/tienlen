export class Result {
  [playerId: string]: {
    order: number;
    plus: Array<string>[];
    minus: Array<string>[];
  }
}
