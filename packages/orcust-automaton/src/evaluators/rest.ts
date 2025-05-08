import { GoalEvaluator } from 'yuka'

import type { OrcustAutomaton } from '../entities/orcust-automaton'

import { RestGoal } from '../goals/rest'

export class RestEvaluator extends GoalEvaluator<OrcustAutomaton> {
  calculateDesirability(owner: OrcustAutomaton): number {
    return (owner.tired() === true) ? 1 : 0
  }

  setGoal(owner:OrcustAutomaton): void {
    if (owner.brain.currentSubgoal() instanceof RestGoal)
      return

    owner.brain.clearSubgoals()
    owner.brain.addSubgoal(new RestGoal(owner))
  }
}
