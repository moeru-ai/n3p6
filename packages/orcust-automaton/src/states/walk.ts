import { State } from 'yuka'

import type { OrcustAutomatonFSM } from '../entities/orcust-automaton-fsm'

export class WalkState extends State<OrcustAutomatonFSM> {
  private timeout?: number

  enter(owner: OrcustAutomatonFSM) {
    owner
      .actions
      .walk!
      .reset()
      .crossFadeFrom(owner.actions.idle!, owner.crossFadeDuration)
      .play()
  }

  execute(owner: OrcustAutomatonFSM) {
    if (this.timeout == null)
      // eslint-disable-next-line @masknet/no-timer
      this.timeout = setTimeout(() => owner.stateMachine.changeTo('walk'), 5000)
  }
}
