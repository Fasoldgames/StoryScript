import { IGame, Location } from '../types';
import { EastDoorway } from './EastDoorway';
import { NorthDoorway } from './NorthDoorway';
import description from './RoundChamber.html?raw';
import { StrangeStructure } from './StrangeStructure';
import { WestDoorway } from './WestDoorway';

export function RoundChamber() {
	return Location({
		name: 'Round Chamber',
		description: description,
		destinations: [
			{
				name: 'North Doorway',
				target: NorthDoorway
			},	
			{
				name: 'West Doorway',
				target: WestDoorway
			},	
			{
				name: 'East Doorway',
				target: EastDoorway
			},			
		], 
		actions: [[
			'Inspect the statue',
				{
				text: 'Inspect the statue',
				execute: (game: IGame) => {
					game.currentLocation.descriptionSelector='Inspect the statue';
					game.actionLog.length=0;
					return true;
				},
			}
		],
		]
		
	});
}