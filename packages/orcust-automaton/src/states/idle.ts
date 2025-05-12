import { State } from 'yuka'

import type { OrcustAutomatonFSM } from '../entities/orcust-automaton-fsm'

export class IdleState extends State<OrcustAutomatonFSM> {
  enter(owner: OrcustAutomatonFSM) {
    owner
      .actions
      .idle!
      .reset()
      .crossFadeFrom(owner.actions.walk!, owner.crossFadeDuration)
      .play()
  }

  execute(owner: OrcustAutomatonFSM) {
    // eslint-disable-next-line @masknet/no-timer, @masknet/prefer-timer-id
    setTimeout(() => owner.stateMachine.changeTo('walk'), 5000)
  }
}
