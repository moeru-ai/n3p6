import { State } from 'yuka'

import type { OrcustAutomatonFSM } from '../entities/orcust-automaton-fsm'

export class WalkState extends State<OrcustAutomatonFSM> {
  enter(_owner: OrcustAutomatonFSM) {
    // if (owner.actions.idle && owner.actions.walk) {
    //   owner
    //     .actions
    //     .walk
    //     .reset()
    //     .crossFadeFrom(owner.actions.idle, owner.crossFadeDuration)
    //     .play()
    // }
  }
}
