# Creature Population
A generic environment built with genetic algorithm for experiments on colony (population) of individuals (creatures)

**TODO**
---

**Core POC**
* [x] Decide program lang
* [x] Create project
* [x] Create repo on github
* [x] Add readme
* [ ] World class
* [ ] Creature class
* [ ] Engine class
* [ ] Setup automated tests
* [ ] Setup DB
* [ ] Setup Genetic Algorithm
* [x] Deny commits directly to main branch
* [ ] Deny not signed commits

**Bomberman POC**
* [ ] `Every turn` all creatures get old
* [ ] `Every turn`: all creatures move
  * [ ] Implement natural movment simulation
* [ ] `Every turn`: Fit explode ou heal will based on how much damage or healing the creature got
* [ ] `Every turn`: Calculate the average will of explode or heal of all creatures and save it on the World
* [ ] `On Born`: Gets a strength from its father `genetic algorithm`
* [ ] `On Born`: Gets a range from its father `genetic algorithm`
* [ ] `On Born`: Gets a speed from its father `genetic algorithm`
* [ ] `On Born`: Gets age = 0
* [ ] `On Explode`: Deals X damage, based on its strength, to near creatures
* [ ] `On Explode`: Deals damage on X, based on its range, creatures
* [ ] `On Heal`: Heals X amount of life, based on its strength, to near creatures
* [ ] `On Heal`: Heals X, based on its range, creatures
* [ ] `On Die`: A new creature is generated based on its self `genetic algorithm`
