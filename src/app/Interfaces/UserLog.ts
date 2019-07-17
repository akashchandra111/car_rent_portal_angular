import { User } from './User';
import { CarStatus } from './CarStatus';

export interface UserLog	{
	userLogId: string;
	userId: User;
	startTime: string;
	endTime: string;
	currentLocation: string;
	dropLocation: string;
	secretKey: string;
	totalAmount: number;
	carNo: string;
}
