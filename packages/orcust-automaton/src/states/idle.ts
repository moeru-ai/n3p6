import { State } from 'yuka'

import type { OrcustAutomatonFSM } from '../entities/orcust-automaton-fsm'

export class IdleState extends State<OrcustAutomatonFSM> {
  enter(owner: OrcustAutomatonFSM) {
    if (owner.actions.idle && owner.actions.walk) {
      owner
        .actions
        .idle
        .reset()
        .crossFadeFrom(owner.actions.walk, owner.crossFadeDuration)
        .play()
    }
  }
}
