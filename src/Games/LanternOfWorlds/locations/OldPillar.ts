import { IGame, Location } from '../types';
import description from './OldPillar.html?raw';

export function OldPillar() {
	return Location({
		name: 'OldPillar',
		description: description,
		destinations: [
			
		],
		actions: [[
			'Dig',
				{
				text: 'Dig',
				execute: (game: IGame) => {
					game.currentLocation.descriptionSelector='Dig';
					game.actionLog.length=0;
				},
			}
		]
		]
	});
}