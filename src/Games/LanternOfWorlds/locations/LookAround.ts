import { IGame, Location } from '../types';
import description from './LookAround.html?raw';

export function LookAround() {
	return Location({
		name: 'LookAround',
		description: description,
		destinations: [
			
		]
	});
}