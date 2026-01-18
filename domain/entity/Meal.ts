export class Meal {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly calories: number,
    public readonly protein: number,
  ) {}
}
