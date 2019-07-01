import { Car } from './Car';
import { User } from './User';

export interface CarStatus	{
	carNo: string;
	carId: Car;
	userId: User;
	status: string;
}
