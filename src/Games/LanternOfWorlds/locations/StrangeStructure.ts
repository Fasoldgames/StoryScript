import { IGame, Location } from '../types';
import description from './StrangeStructure.html?raw';

export function StrangeStructure() {
	return Location({
		name: 'StrangeStructure',
		description: description,
		destinations: [			
		],
		actions: [[
			'Force the door',
				{
				text: 'Force the door',
				execute: (game: IGame) => {
					game.currentLocation.descriptionSelector='Force the door';
					game.actionLog.length=0;
				},
			}
		]
		]
	});
}