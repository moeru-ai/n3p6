import { GoalEvaluator } from 'yuka'

import type { Galatea } from '~/utils/yuka/entities/galatea'

import { RestGoal } from '~/utils/yuka/goals/rest'

export class RestEvaluator extends GoalEvaluator<Galatea> {
  calculateDesirability(owner: Galatea): number {
    return (owner.tired() === true) ? 1 : 0
  }

  setGoal(owner: Galatea): void {
    if (owner.brain.currentSubgoal() instanceof RestGoal)
      return

    owner.brain.clearSubgoals()
    owner.brain.addSubgoal(new RestGoal(owner))
  }
}
