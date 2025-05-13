import { State } from 'yuka'

import type { OrcustAutomatonFSM } from '../entities/orcust-automaton-fsm'

export class IdleState extends State<OrcustAutomatonFSM> {
  execute(owner: OrcustAutomatonFSM) {
    if (!owner.currentTarget)
      return

    const squaredDistance = owner.position.squaredDistanceTo(owner.currentTarget.position)

    if (squaredDistance > 2)
      owner.stateMachine.changeTo('walk')
  }
}
