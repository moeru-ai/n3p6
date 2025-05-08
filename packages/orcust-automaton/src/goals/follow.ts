import { CompositeGoal } from 'yuka'

import type { OrcustAutomaton } from '../entities/orcust-automaton'

import { SeekToPlayerGoal } from './seek-to-player'

export class FollowGoal extends CompositeGoal<OrcustAutomaton> {
  constructor(owner: OrcustAutomaton) {
    super(owner)
  }

  activate() {
    this.clearSubgoals()

    this.addSubgoal(new SeekToPlayerGoal(this.owner!))

    this.owner!.actions.idle?.fadeOut(0.5).stop()
  }

  execute() {
    this.status = this.executeSubgoals()

    this.replanIfFailed()
  }
}
