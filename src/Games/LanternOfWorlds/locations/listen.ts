import { IGame, Location } from '../types';
import description from './listen.html?raw';

export function Listen() {
	return Location({
		name: 'Listen',
		description: description,
		destinations: [
			
		]
	});
}