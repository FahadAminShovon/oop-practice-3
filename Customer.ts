import { Vehicle } from './Vehicle';

export class Customer {
  private _firstName: string;
  private _lastName: string;

  constructor(firstName: string, lastName: string) {
    this._firstName = firstName;
    this._lastName = lastName;
  }

  public getFirstName(): string {
    return this._firstName;
  }

  public getLastName(): string {
    return this._lastName;
  }

  public rentVehicle(vehicle: Vehicle, from: Date, till: Date): void {
    const status = vehicle.checkStatus(from, till);
    if (status === 'Maintenance') {
      throw new Error('Vehicle is in maintenance');
    }
    if (status === 'Rented') {
      throw new Error('Vehicle is already rented');
    }
    vehicle.rentVehicle(from, till);
  }
}
