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
- [x] Refactor all log messages (add message level and type to better toogle them)
- [x] Make all automated tests again (after the ruge action refactoring)
- [ ] Centralize fixed parameters
- [ ] Make a kind of EoE test
- [ ] Run lint and test on PR
- [ ] Add some kind of persistence
- [ ] Add posibility of go turns back and forth (persist every turn and entities state)
- [ ] Make a cli project to test new ideas (new repo)
- [ ] Make an interface project to test new ideas (new repo)
- [ ] Change the executors objects to lists on orchestrator object (this way many executors can be added, each one to its own purpose)
- [ ] Export an import like a real npm package
- [ ] Export the project as umd (to be used as any js file on html) or as commonjs (to be used as a node package)

# Creature Idea

- [x] Start with n creatures
- [x] All creatures move (naturaly)
- [ ] Each Creature have diferent maxspeed
- [ ] `Creature will` Kill or heal (unified)
- [ ] `Creature action`: Hurt or heal only creatures that are close (diferent ranges), can miss if the other walks away
- [ ] Make creatures move`s target based on who it want to heal or kill

# Superhero Idea

- [ ] Start with n creatures, one Hero and one Villain
- [ ] `Creature will` Avoid hurt it self; As much as it is hurt, more it avoids taking damage
- [x] `Creature action` Move
- [ ] `Hero Attibute` Really Fast
- [ ] `Hero Attibute` More life
- [ ] `Hero Will` Heal Someone <=> Kill Villain
- [ ] `Hero Action` Hurt (damage in area); Some kind of a laser
- [ ] `Hero Action` Heal someone; only from clos distance an heals not so much
- [ ] `Villain Atribute` More Life
- [ ] `Villain Will` Hurt Someone X Avoid Hero
- [ ] `Villain Action` Hurt (damage in area); Some kind of an auria
- [ ] `Villain Action` Teleport

# Bomberman Idea (in another project for while)

- [x] Start with n bombermen
- [x] `Bomberman Will`: desire to plant a bomb
- [x] `Bomberman Action`: Plant a bomb
- [x] `Bomb Action`: Explode; Aply damage on every bomberman on the range

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
