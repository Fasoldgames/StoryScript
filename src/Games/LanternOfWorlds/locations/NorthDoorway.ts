import { IGame, Location } from '../types';
import description from './NorthDoorway.html?raw';

export function NorthDoorway() {
	return Location({
		name: 'NorthDoorway',
		description: description,
		destinations: [
			
		]
	});
}