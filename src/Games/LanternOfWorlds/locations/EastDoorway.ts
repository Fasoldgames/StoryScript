import { IGame, Location } from '../types';
import description from './EastDoorway.html?raw';
import { RoundChamber } from './RoundChamber';

export function EastDoorway() {
	return Location({
		name: 'East Doorway',
		description: description,
		destinations: [
					{
									name: 'Round Chamber',
									target: RoundChamber
								},	
				],
	});
}