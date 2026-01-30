import { IGame, Location } from '../types';
import { RoundChamber } from './RoundChamber';
import description from './WestDoorway.html?raw';

export function WestDoorway() {
	return Location({
		name: 'West Doorway',
		description: description,
		destinations: [
			{
							name: 'Round Chamber',
							target: RoundChamber
						},	
		],
	         actions: [[
			'Inspect the basin',
				{
				text: 'Inspect the basin',
				execute: (game: IGame) => {
					game.currentLocation.descriptionSelector='Inspect the basin';
					game.actionLog.length=0;
					return true;
				},
			}
		]
		]
		
	});
}