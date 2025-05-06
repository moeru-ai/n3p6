import { GoalEvaluator } from 'yuka'

import type { Galatea } from '../entities/galatea'

import { FollowGoal } from '../goals/follow'

export class FollowEvaluator extends GoalEvaluator<Galatea> {
  calculateDesirability() {
    return 0.5
  }

  setGoal(owner: Galatea) {
    const currentSubgoal = owner.brain.currentSubgoal()

    if ((currentSubgoal instanceof FollowGoal) === false) {
      owner.brain.clearSubgoals()

      owner.brain.addSubgoal(new FollowGoal(owner))
    }
  }
}
