import { GoalEvaluator } from 'yuka'

import type { OrcustAutomaton } from '../entities/orcust-automaton'

import { FollowGoal } from '../goals/follow'

export class FollowEvaluator extends GoalEvaluator<OrcustAutomaton> {
  calculateDesirability() {
    return 0.5
  }

  setGoal(owner: OrcustAutomaton) {
    const currentSubgoal = owner.brain.currentSubgoal()

    if ((currentSubgoal instanceof FollowGoal) === false) {
      owner.brain.clearSubgoals()

      owner.brain.addSubgoal(new FollowGoal(owner))
    }
  }
}
