import { Location, IGame } from '../types'
import { OldTemple } from './OldTemple';
import description from './Start.html?raw'

export function Start() {
    const location = Location({
        name: 'Camp',
        description: description,
        descriptionSelector: '',
        destinations: [],
        actions: [[
            'InvestigateRuins',
                {
                text: 'Investigate the ruins',
                execute: (game: IGame) => {
                    game.changeLocation(OldTemple, true);
                    return false;
                },
            }
        ]]
    });
    
    return location;
}