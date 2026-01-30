import { IGame, Location } from '../types';
import description from './EastDoorway.html?raw';

export function EastDoorway() {
	return Location({
		name: 'EastDoorway',
		description: description,
		destinations: [
			
		]
	});
}