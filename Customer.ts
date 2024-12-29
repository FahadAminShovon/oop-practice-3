import { Vehicle } from './Vehicle';

export class Customer {
  #firstName: string;
  #lastName: string;
  #rentedVehicles: Vehicle[] = [];

  constructor(firstName: string, lastName: string) {
    this.#firstName = firstName;
    this.#lastName = lastName;
  }

  public getFirstName(): string {
    return this.#firstName;
  }

  public getLastName(): string {
    return this.#lastName;
  }

  public rentVehicle(vehicle: Vehicle, from: Date, till: Date): void {
    try {
      vehicle.rentVehicle(from, till);
      this.#rentedVehicles.push(vehicle);
    } catch (e) {
      console.log(e.message);
    }
  }
}
