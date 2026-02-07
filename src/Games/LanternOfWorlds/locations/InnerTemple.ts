import { IGame, Location } from '../types';
import { RoundChamber } from './RoundChamber';
import description from './InnerTemple.html?raw';

export function InnerTemple() {
	return Location({
		name: 'Inner Temple',
		description: description,
		destinations: [
			{
				name: 'Round Chamber',
				target: RoundChamber
			}
		],
	});
}
