import { Customer } from './Customer';
import { Vehicle } from './Vehicle';

const vehicle1 = new Vehicle('Car', 100, 1);
const vehicle2 = new Vehicle('Bike', 50, 2);
const customer = new Customer('John', 'Doe');
console.log(vehicle1.checkStatus(new Date(), new Date()));
console.log(vehicle2.checkStatus(new Date(), new Date()));
customer.rentVehicle(vehicle1, new Date(), new Date());
console.log(vehicle1.checkStatus(new Date(), new Date()));
console.log(vehicle2.checkStatus(new Date(), new Date()));
