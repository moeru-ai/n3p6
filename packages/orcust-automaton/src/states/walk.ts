import { State } from 'yuka'

import type { OrcustAutomatonFSM } from '../entities/orcust-automaton-fsm'

export class WalkState extends State<OrcustAutomatonFSM> {
  enter(owner: OrcustAutomatonFSM) {
    owner
      .actions
      .walk!
      .reset()
      .crossFadeFrom(owner.actions.idle!, owner.crossFadeDuration)
      .play()
  }

  execute(owner: OrcustAutomatonFSM) {
    // eslint-disable-next-line @masknet/no-timer, @masknet/prefer-timer-id
    setTimeout(() => owner.stateMachine.changeTo('idle'), 5000)
  }
}
