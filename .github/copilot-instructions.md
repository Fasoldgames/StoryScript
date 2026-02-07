# StoryScript AI Coding Assistant Instructions

## Project Overview
StoryScript is a TypeScript-based adventure game engine that generates web/Electron applications. Games are built by composing functional entities (locations, characters, items, enemies) through a definition-driven architecture with a service layer for game logic.

## Architecture & Data Flow

### Core Layers
1. **Engine** (`src/Engine/`) — Reusable framework code handling all game mechanics
2. **Games** (`src/Games/`) — Game-specific implementations (characters, rules, locations, UI)
3. **Services** (`src/Engine/Services/`) — Centralized business logic via ServiceFactory singleton
4. **UI** (`src/UI/`) — Vue 3 components; connects ServiceFactory to reactive state (Pinia)

### Game Initialization Flow
```
Games/{GameName}/run.ts → Run('GameName', Rules(), CustomTexts())
  ↓
src/Engine/run.ts → imports assets via import.meta.glob
  → builds definitions array
  → creates ServiceFactory
  → calls serviceFactory.init(game)
  ↓
Services instantiated with dependencies: IGame, IRules, IDefinitions, IInterfaceTexts
```

### ServiceFactory Pattern
The **ServiceFactory** singleton (line 33–141) is the DI container. Services are lazy-initialized via constructor and accessed via `GetService()` getters. **All service dependencies flow through ServiceFactory.init()**:
- **CharacterService** — Character stats, creation, loading
- **GameService** — Game lifecycle, save/load
- **LocationService** — Location navigation, state
- **ItemService** — Inventory, equipment, item usage
- **ConversationService** — NPC dialogue
- **CombinationService** — Item combinations
- **CombatService** — Combat mechanics
- **TradeService** — NPC trading

Access services: `ServiceFactory.GetInstance().GetCharacterService()`

## Game-Specific Structure

### Required Files per Game
Every game in `src/Games/{GameName}/` must have:
- **character.ts** — Extends `ICharacter` with game-specific properties
- **rules.ts** — Exports `Rules(): IRules` function with game mechanics hooks
- **customTexts.ts** — Exports `CustomTexts(): IInterfaceTexts` for UI strings
- **types.ts** — Aggregates all game interfaces and re-exports Engine types
- **run.ts** — Single call: `Run('GameName', Rules(), CustomTexts())`
- **interfaces/** — Game-specific interface definitions
- **locations/**, **items/**, **enemies/**, **persons/**, **quests/** — Asset definitions

### Asset Definition Pattern
Each asset is a **function factory** returning an interface instance:
```typescript
// locations/NorthDoorway.ts
export function NorthDoorway() {
    return Location({
        name: 'North room',
        description: description,  // HTML imported as raw string
        destinations: [{name: 'Round Chamber', target: RoundChamber}]
    });
}
```
Assets are collected via `import.meta.glob()` in `run.ts` → converted to definitions array → registered in ServiceFactory.

### Rules Hook System
The `Rules()` function returns `IRules` object with callbacks for game mechanics:
- `setup.getCombinationActions()` — Item combinations
- `general.scoreChange()` — Level progression on score change
- `character.*` — Sheet attributes, creation steps, attribute calculation
- Combat, trade, conversation hooks available

## TypeScript Patterns & Conventions

### Interface-First Design
- Interfaces prefixed with `I` (e.g., `ICharacter`, `IGame`)
- All service contracts defined as interfaces in `Interfaces/services/`
- Game implementations extend Engine interfaces; **type consistency enforced at compile time**

### Service Constructor Injection
Services receive dependencies via constructor:
```typescript
export class ItemService implements IItemService {
    constructor(private readonly _game: IGame, private readonly _rules: IRules, private readonly _texts: IInterfaceTexts) {}
}
```
**Pattern:** Private readonly properties; no mutations. Tests mock these dependencies.

### Type Safety with Game-Specific Types
Each game aggregates types in `types.ts`:
```typescript
// Re-export Engine types with game-specific overrides
export type { IAction, IItem, IEnemy, ... };
export { Character, Location, Item, ... };
```
Use `import { IGame, ... } from './types'` in game code.

### Utility Functions
- `src/Engine/arrayAndFunctionExtensions.ts` — Extends Array/Function prototypes (must call `addArrayExtensions()` in tests)
- `src/Engine/Services/sharedFunctions.ts` — Function serialization (for save/load), template parsing, random selection
- **Note:** Function serialization converts arrow functions to `function` notation for deserialization safety

## Testing & Validation

### Test Structure
Tests use **Vitest** (`vitest.config.ts`):
- Engine tests in `src/Tests/Engine/specs/` (isolate services with mocks)
- Coverage includes Engine + active game only (configured in `vitest.config.ts`)
- **Run:** `npm test` (UI), `npm run test:coverage`

### Test Patterns
Services are instantiated with mock dependencies:
```typescript
function getService(game?: IGame, rules?: IRules, texts?: IInterfaceTexts) {
    return new ItemService(game || {}, rules || Rules(), texts || new DefaultTexts());
}
```
Before tests: `addArrayExtensions()` and `addFunctionExtensions()` **must be called** (they modify prototypes).

### Helper Setup (src/Tests/Engine/helpers.ts)
`initServiceFactory()` does full game bootstrap for integration tests:
- Imports all assets via `import.meta.glob()`
- Builds definitions and entities
- Creates configured ServiceFactory
- Returns ready-to-use `ServiceFactory.GetInstance()`

## Build & Deployment

### Scripts
- `npm start` — Vite dev server (reads `currentGameName.js`)
- `npm run publish` — Build + postbuild optimizations → `dist/`
- `npm run electron-start` — Build + Electron desktop app
- Asset scripts: `npm run sca` (action), `npm run scl` (location), etc. — Generate boilerplate files
- `npm run create-game` — Create new game folder

### Active Game Selection
- File `currentGameName.js` exports current game name
- Vite config uses this to set build paths
- **Change to switch games:** Update `currentGameName.js`, resources copied from `src/Games/{GameName}/resources/`

### Build Config
- **Vite** compiles Vue + TypeScript → single bundle
- **Electron builder** packages for Windows (`.portable`)
- **Type checking:** Enabled via `vite-plugin-checker`

## Key Integration Points & Data Patterns

### State Serialization
- **DataService** saves/loads to localStorage
- **DataSerializer** converts circular references → serializable form
- **DataSynchronizer** merges save data with current state
- Game state must be serializable (avoid function closures except those registered in `rules`)

### Location Compilation
LocationService compiles locations on load:
- Resolves destination target functions
- Caches compiled state
- **ICompiledLocation** used at runtime; source **ILocation** in definitions

### Item Combinations
- CombinationService matches tools/targets against rules
- Combination result modifies state (inventory, character properties)
- Defined in `rules.getCombinationActions()`

### Sound System
- ISoundPlayer manages audio playback
- SoundService integrates with game lifecycle
- Conversations trigger sound effects via service

## Common Tasks

### Adding a New Gameplay Mechanic
1. Add hook to `IRules` in `Interfaces/rules/`
2. Implement logic in relevant Service (e.g., CombatService)
3. Call hook from service at appropriate point
4. Override hook in game's `rules.ts`

### Creating a Location
Create `src/Games/{GameName}/locations/LocationName.ts`:
```typescript
import { Location } from '../types';
import description from './LocationName.html?raw';
import { DestinationLocation } from './DestinationLocation';

export function LocationName() {
    return Location({
        name: 'Display Name',
        description: description,
        destinations: [{ name: 'Exit Name', target: DestinationLocation }]
    });
}
```
Pair with `LocationName.html` for rich descriptions.

### Accessing Services in Game Code
Always use ServiceFactory singleton:
```typescript
const itemService = ServiceFactory.GetInstance().GetItemService();
itemService.useItem(character, item);
```
**Never instantiate services directly** (breaks singleton pattern and dependency injection).

### Modifying Character/Equipment
Characters implement `ICharacter`; equipment is `Record<string, IItem | null>`. Game defines equipment slots in `character.ts` constructor:
```typescript
equipment: IEquipment = {
    head: null,
    body: null,
    leftHand: null,
    rightHand: null
    // Add game-specific slots
}
```

## Files to Know
- [src/Engine/ServiceFactory.ts](src/Engine/ServiceFactory.ts) — DI container, service lifecycle
- [src/Engine/run.ts](src/Engine/run.ts) — Asset import & definitions building
- [src/Engine/Services/](src/Engine/Services/) — Core business logic
- [src/Games/_GameTemplate/](src/Games/_GameTemplate/) — Template for new games
- [package.json](package.json) — Build scripts & dependencies
- [vite.config.ts](vite.config.ts) — Asset copying, game-specific paths

## Debugging Tips
- **ServiceFactory not initialized?** Ensure `serviceFactory.init()` called before accessing services
- **Assets not loading?** Check `import.meta.glob()` patterns match file locations
- **Save/load issues?** Verify game state is serializable; check DataSerializer for circular refs
- **Type errors in game code?** Import types from `./types` not directly from Engine
- **Function deserialization fails?** Ensure functions use `function()` notation, not arrows (check sharedFunctions.serializeFunction)
