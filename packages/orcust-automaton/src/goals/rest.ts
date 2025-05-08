import { Goal } from 'yuka'

import type { OrcustAutomaton } from '../entities/orcust-automaton'

export class RestGoal extends Goal<OrcustAutomaton> {
  constructor(owner: OrcustAutomaton) {
    super(owner)
  }

  activate() {
    this.owner!.actions.idle?.reset().fadeIn(0.5).play()
  }

  execute() {
    const owner = this.owner

    this.owner!.currentTime += this.owner!.deltaTime

    if (owner!.currentTime >= owner!.restDuration) {
      this.status = Goal.STATUS.COMPLETED
    }
  }

  terminate() {
    this.owner!.currentTime = 0
    this.owner!.fatigueLevel = 0

    this.owner!.actions.idle?.fadeOut(0.5).stop()
  }
}
