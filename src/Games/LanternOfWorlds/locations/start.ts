import { Location } from '../types'
import { OldTemple } from './OldTemple';
import description from './Start.html?raw'

export function Start() {
    return Location({
        name: 'Camp',
        description: description,
        destinations: [
            {
                name: 'Investigate the ruins',
                target: OldTemple
            },
        ]
    });
}