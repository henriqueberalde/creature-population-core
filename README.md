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
- [x] Create class Event
- [x] Create class Orchestrator
- [x] Refactor log messages
- [x] Show all entity`s information somehow
- [x] Run one turn at time
- [x] Terminal interface to interact (yargs)
- [x] Implement the first application of the concept with a simple creature population
- [x] Remove unused packages
- [x] Export as a module
- [ ] Remove cartesian helper (Stering behavior)
- [ ] Run lint and test on PR
- [ ] Better names for services
- [ ] Add some kind of persistence

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

- [ ] `Every turn`: all creatures get old
- [ ] `Every turn`: all creatures move
- [ ] Natural movement simulation
- [ ] `Every turn`: Fit explode ou heal will based on how much damage or healing the creature got
- [ ] `Every turn`: Calculate the average will of explode or heal of all creatures and save it on the World
- [ ] `On Born`: Gets a strength from its father `genetic algorithm`
- [ ] `On Born`: Gets a range from its father `genetic algorithm`
- [ ] `On Born`: Gets a speed from its father `genetic algorithm`
- [ ] `On Born`: Gets age = 0
- [ ] `On Explode`: Deals X damage, based on its strength, to near creatures
- [ ] `On Explode`: Deals damage on X, based on its range, creatures
- [ ] `On Heal`: Heals X amount of life, based on its strength, to near creatures
- [ ] `On Heal`: Heals X, based on its range, creatures
- [ ] `On Die`: A new creature is generated based on its self `genetic algorithm`
