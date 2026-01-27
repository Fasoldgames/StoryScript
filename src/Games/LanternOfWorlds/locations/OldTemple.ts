import { IGame, Location } from '../types';
import { OldPillar } from './OldPillar';
import description from './OldTemple.html?raw';
import { Start } from './start';
import { StrangeStructure } from './StrangeStructure';

export function OldTemple() {
	return Location({
		name: 'Old ruins',
		description: description,
		destinations: [
			{
				name: 'Return to Camp',
				target: Start
			},	
			{
				name: 'Old Pillar',
				target: OldPillar
			},	
			{
				name: 'Strange Structure',
				target: StrangeStructure
			},			
		], 
		actions: [[
			'Listen',
				{
				text: 'Listen',
				execute: (game: IGame) => {
					game.currentLocation.descriptionSelector='listen';
					game.actionLog.length=0;
					return true;
				},
			}
		],[
			'Look',
				{
				text: 'Look around',
				execute: (game: IGame) => {
					game.currentLocation.descriptionSelector='look';
					game.actionLog.length=0;
					return true;
				},
			}
		],

		]
		
	});
}
