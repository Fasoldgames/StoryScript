import { IGame, Location } from '../types';
import { OldPillar } from './OldPillar';
import description from './OldTemple.html?raw';
import { Start } from './start';
import { StrangeStructure } from './StrangeStructure';
import { ActionStatus } from '../../../Engine/Interfaces/enumerations/actionStatus';

export function OldTemple() {
	let hasListened = false;
	let hasLookedAround = false;

	return Location({
		name: 'Old ruins',
		description: description,
		destinations: [
			
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
				status: () => hasListened ? ActionStatus.Unavailable : ActionStatus.Available,
				execute: (game: IGame) => {
					game.currentLocation.descriptionSelector='listen';
					game.actionLog.length=0;
					hasListened = true;
					return true;
				},
			}
		],[
			'Look',
				{
				text: 'Look around',
				status: () => hasLookedAround ? ActionStatus.Unavailable : ActionStatus.Available,
				execute: (game: IGame) => {
					game.currentLocation.descriptionSelector='look';
					game.actionLog.length=0;
					hasLookedAround = true;
					return true;
				},
			}
		],[
			'InvestigatePillar',
				{
				text: 'Investigate the pillar',
				status: () => hasLookedAround ? ActionStatus.Available : ActionStatus.Unavailable,
				execute: (game: IGame) => {
					game.changeLocation(OldPillar, true);
					return false;
				},
			}
		],[
			'InvestigateTomb',
				{
				text: 'Investigate the tomb',
				status: () => hasLookedAround ? ActionStatus.Available : ActionStatus.Unavailable,
				execute: (game: IGame) => {
					game.actionLog.push('You investigate the mysterious tomb.');
					return true;
				},
			}
		],[
			'Return to Camp',
				{
				text: 'Return to Camp',
				execute: (game: IGame) => {
					game.changeLocation(Start, true);
					game.currentLocation.descriptionSelector = 'returned';
					return false;
				},
			}
		],

		]
		
	});
}
