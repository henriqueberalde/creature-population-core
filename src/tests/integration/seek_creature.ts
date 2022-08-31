import { Context } from '../../entities';
import Creature from '../../entities/creature';
import Entity from '../../entities/entity';
import ECreatureActionExecutor from '../../executors/entity/creature_action_executor';
import OCreatureActionExecutor from '../../executors/orchestrator/creature_action_executor';
import Orchestrator from '../../orchestrator';
import VectorHelper from '../../utils/vector_helper';

const cSeeker = new Creature('cSeeker', 0, 0);
cSeeker.getWill('kill_heal').value = 100;
cSeeker.removeAction('updateDesireToKillOrHeal');
cSeeker.removeAction('hurt');
cSeeker.removeAction('heal');

const cTarget = new Creature('cTarget', 900, 900);
cTarget.actions = [];

const entities: Entity[] = [cSeeker, cTarget];

export default function main(): void {
  const context = new Context(entities);
  const o = new Orchestrator(
    entities,
    [],
    context,
    new ECreatureActionExecutor(context),
    new OCreatureActionExecutor(context),
    undefined,
    undefined,
    () => {
      if (context.currentCycle % 3 !== 0) return;

      const table = entities.map((entity) => {
        const creature = entity as Creature;
        let target: Creature | undefined;

        context.entities.forEach((e) => {
          if (e.id === creature.seekingCreatureId) {
            target = e as Creature;
          }
        });

        let dist: number | undefined;

        if (target !== undefined) {
          dist = VectorHelper.dist(creature.position, target.position);
        }

        return {
          id: creature.id,
          age: creature.age,
          kill_heal: creature.getKillHealValue(),
          kill_heal_value: creature.getWill('kill_heal').value,
          position: `${creature.position.values[0]}, ${creature.position.values[1]}`,
          speed: creature.speed,
          target: `${creature.target.values[0]}, ${creature.target.values[1]}`,
          targetCreature: creature.seekingCreatureId,
          target_dist: dist,
          actions: `${creature.actions
            .map((action) => action.name)
            .join(', ')}`,
        };
      });

      // eslint-disable-next-line no-console
      console.table(table);
    },
  );
  o.executeTurnRecursive(300);
}

main();
