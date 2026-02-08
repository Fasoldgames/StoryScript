import { IGame, Location } from '../types';
import { OldPillar } from './OldPillar';
import description from './OldTemple.html?raw';
import { Start } from './start';
import { StrangeStructure } from './StrangeStructure';
import { ActionStatus } from '../../../Engine/Interfaces/enumerations/actionStatus';

export function OldTemple() {
	const location = Location({
		name: 'Old ruins',
		description: description,
		descriptionSelector: '',
		destinations: [],
		actions: [[
			'Listen',
				{
				text: 'Listen',
				status: () => (location as any).hasListened ? ActionStatus.Unavailable : ActionStatus.Available,
				execute: (game: IGame) => {
					(location as any).descriptionSelector='listen';
					game.actionLog.length=0;
					(location as any).hasListened = true;
					return true;
				},
			}
		],[
			'Look',
				{
				text: 'Look around',
				status: () => (location as any).hasLookedAround ? ActionStatus.Unavailable : ActionStatus.Available,
				execute: (game: IGame) => {
					(location as any).descriptionSelector='look';
					game.actionLog.length=0;
					(location as any).hasLookedAround = true;
					return true;
				},
			}
		],[
			'InvestigatePillar',
				{
				text: 'Investigate the pillar',
				status: () => (location as any).hasLookedAround ? ActionStatus.Available : ActionStatus.Unavailable,
				execute: (game: IGame) => {
					game.changeLocation(OldPillar, true);
					return false;
				},
			}
		],[
			'InvestigateTomb',
				{
				text: 'Investigate the tomb',
				status: () => (location as any).hasLookedAround ? ActionStatus.Available : ActionStatus.Unavailable,
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
					(location as any).descriptionSelector = '';
					return false;
				},
			}
		],

		]
		
	});

	(location as any).hasListened = false;
	(location as any).hasLookedAround = false;
	
	return location;
}
