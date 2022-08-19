# Creature Population

A generic environment built with genetic algorithm for experiments on colony (population) of individuals (creatures)

# **Decisions**

- `language` Typescript
- `persistence` No persistence for while
- `engine` Node in memory for while
- `infra` Local
- `interface` CLI

# **TODO**

- [x] Create class Entity
- [x] Create class Service
- [x] Create class Orchestrator
- [x] Refactor log messages
- [x] Show all entity`s information somehow
- [x] Run one turn at time
- [x] Terminal interface to interact (yargs)
- [x] Implement the first application of the concept with a simple creature population
- [x] Remove unused packages
- [x] Export as a module
- [x] Add Stering behavor
- [x] Make functions removable of each entity
- [x] Remove cartesian helper
- [x] Better names for services
- [x] Add action behaivor
- [ ] Refactor all log messages (add message level and type to better toogle them)
- [ ] Make all automated tests again (after the ruge action refactoring)
- [ ] Make a kind of EoE test
- [ ] Centralize fixed parameters
- [ ] Run lint and test on PR
- [ ] Add some kind of persistence
- [ ] Make a cli project to test new ideas (new repo)
- [ ] Make an interface project to test new ideas (new repo)
- [ ] Change the executors objects to lists on orchestrator object (this way many executors can be added, each one to its own purpose)
- [ ] Export an import like a real npm package
- [ ] Export the project as umd (to be used as any js file on html) or as commonjs (to be used as a node package)

# **Backlog**

- `language` GO (Because of the idea of some process that never stops)
- `entity types` inheritance + external modules
- `entity fields` all generic
- `interface` like a game
- `events` turn everything in an event, since worlds creation
- `event` execution with Moleculerjs
- `event` execution with API WS
- `persistence` Postgres
- `persistence` Postgres
- `infra` docker and docker-compose
- `log` papertrail or something like that

# Bomberman Idea

- [x] `Every turn`: all creatures get old
- [x] `Every turn`: all creatures move
- [x] Natural movement simulation
- [ ] `Every turn`: Fit explode ou heal will based on how much damage or healing the creature got
- [ ] `Every turn`: Calculate the average will of explode or heal of all creatures and save it on the World
- [ ] `On Born`: Gets a strength from its father `genetic algorithm`
- [ ] `On Born`: Gets a range from its father `genetic algorithm`
- [ ] `On Born`: Gets a speed from its father `genetic algorithm`
- [x] `On Born`: Gets age = 0
- [x] `On Explode`: Deals X damage, based on its strength, to near creatures
- [x] `On Explode`: Deals damage on X, based on its range, creatures
- [x] `On Heal`: Heals X amount of life, based on its strength, to near creatures
- [x] `On Heal`: Heals X, based on its range, creatures
- [ ] `On Die`: A new creature is generated based on its self `genetic algorithm`
