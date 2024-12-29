export class Vehicle {
  #vehicleType: string;
  #rate: number;
  #rentSchedule: { from: Date; till: Date } | undefined;
  #maintenanceSchedule: { from: Date; till: Date } | undefined;
  #id: number;

  constructor(vehicleType: string, rate: number, id: number) {
    this.#vehicleType = vehicleType;
    this.#rate = rate;
    this.#id = id;
  }

  get id() {
    return this.#id;
  }

  get vehicleType(): string {
    return this.#vehicleType;
  }

  get rate(): number {
    return this.#rate;
  }

  checkStatus(from: Date, till: Date) {
    if (
      this.#maintenanceSchedule &&
      from >= this.#maintenanceSchedule.from &&
      till <= this.#maintenanceSchedule.till
    ) {
      return 'Maintenance';
    }
    if (
      this.#rentSchedule &&
      from >= this.#rentSchedule.from &&
      till <= this.#rentSchedule.till
    ) {
      return 'Rented';
    }
    return 'Available';
  }

  moveToMaintenance(from: Date, till: Date): void {
    const status = this.checkStatus(from, till);
    if (status === 'Maintenance') {
      throw new Error('Vehicle is already in maintenance');
    }
    if (status === 'Rented') {
      throw new Error('Vehicle is rented');
    }
    this.#maintenanceSchedule = { from, till };
  }

  moveFromMaintenance(): void {
    const status = this.checkStatus(new Date(), new Date());
    if (status !== 'Maintenance') {
      throw new Error('Vehicle is not in maintenance');
    }
    this.#maintenanceSchedule = undefined;
  }

  rentVehicle(from: Date, till: Date): void {
    const status = this.checkStatus(from, till);
    if (status === 'Maintenance') {
      throw new Error('Vehicle is in maintenance');
    }
    if (status === 'Rented') {
      throw new Error('Vehicle is already rented');
    }
    this.#rentSchedule = { from, till };
  }

  returnVehicle(): void {
    const status = this.checkStatus(new Date(), new Date());
    if (status !== 'Rented') {
      throw new Error('Vehicle is not rented');
    }
    this.#rentSchedule = undefined;
  }
}
