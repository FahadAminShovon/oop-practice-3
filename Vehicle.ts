type StatusType = 'Available' | 'Rented' | 'Maintenance';

export class Vehicle {
  #vehicleType: string;
  #rate: number;
  #scheduledDate: { from: Date; till: Date } | null;
  #id: number;
  #status: StatusType;

  constructor(vehicleType: string, rate: number, id: number) {
    this.#vehicleType = vehicleType;
    this.#rate = rate;
    this.#id = id;
    this.#status = 'Available';
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

  checkStatus(from: Date, till: Date): StatusType {
    if (from > till) {
      throw new Error('Invalid date range');
    }
    if (!this.#scheduledDate || from >= this.#scheduledDate.till) {
      return 'Available';
    }
    return this.#status;
  }

  moveToMaintenance(from: Date, till: Date): void {
    const status = this.checkStatus(from, till);
    if (status === 'Maintenance') {
      throw new Error('Vehicle is already in maintenance');
    }
    if (status === 'Rented') {
      throw new Error('Vehicle is rented');
    }
    this.#scheduledDate = { from, till };
    this.#status = 'Maintenance';
  }

  moveToAvailable(): void {
    this.#status = 'Available';
    this.#scheduledDate = null;
  }

  moveFromMaintenance(): void {
    if (this.#status !== 'Maintenance') {
      throw new Error('Vehicle is not in maintenance');
    }
    this.moveToAvailable();
  }

  rentVehicle(from: Date, till: Date): void {
    const status = this.checkStatus(from, till);
    if (status === 'Maintenance') {
      throw new Error('Vehicle is in maintenance');
    }
    if (status === 'Rented') {
      throw new Error('Vehicle is already rented');
    }
    this.#scheduledDate = { from, till };
    this.#status = 'Rented';
  }

  returnVehicle(): void {
    if (this.#status !== 'Rented') {
      throw new Error('Vehicle is not rented');
    }
    this.moveToAvailable();
  }
}
