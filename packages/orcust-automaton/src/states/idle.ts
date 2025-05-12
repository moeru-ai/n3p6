import { State } from 'yuka'

import type { OrcustAutomatonFSM } from '../entities/orcust-automaton-fsm'

export class IdleState extends State<OrcustAutomatonFSM> {
  private timeout?: number

  enter(owner: OrcustAutomatonFSM) {
    owner
      .actions
      .idle!
      .reset()
      .crossFadeFrom(owner.actions.walk!, owner.crossFadeDuration)
      .play()
  }

  execute(owner: OrcustAutomatonFSM) {
    if (this.timeout == null)
      // eslint-disable-next-line @masknet/no-timer
      this.timeout = setTimeout(() => owner.stateMachine.changeTo('walk'), 5000)
  }
}
