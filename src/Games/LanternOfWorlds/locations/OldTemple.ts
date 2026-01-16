import { IGame, Location } from '../types';
import { Listen } from './listen';
import { LookAround } from './LookAround';
import description from './OldTemple.html?raw';
import { Start } from './start';

export function OldTemple() {
	return Location({
		name: 'Old ruins',
		description: description,
		destinations: [
			{
				name: 'Return to Camp',
				target: Start
			},			
		], 
		actions: [[
			'Listen',
				{
				text: 'Listen',
				execute: (game: IGame) => {
					//game.currentLocation.descriptionSelector='listen';
					game.actionLog.length=0;
					game.logToActionLog(game.currentLocation.descriptions['listen']);
					return true;
				},
			}
		],[
			'Look',
				{
				text: 'Look around',
				execute: (game: IGame) => {
					game.actionLog.length=0;
					game.logToActionLog(game.currentLocation.descriptions['look']);
					return true;
				},
			}
		],

		]
		
	});
}
