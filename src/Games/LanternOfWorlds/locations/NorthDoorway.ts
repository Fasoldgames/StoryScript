import { IGame, Location } from '../types';
import description from './NorthDoorway.html?raw';
import { RoundChamber } from './RoundChamber';

export function NorthDoorway() {
	return Location({
		name: 'North room',
		description: description,
		destinations: [
							{
											name: 'Round Chamber',
											target: RoundChamber
										},	
						],
	});
}