import { State } from 'yuka'

import type { OrcustAutomaton } from '../entities/orcust-automaton'

export class IdleState extends State<OrcustAutomaton> {
  execute(owner: OrcustAutomaton) {
    if (!owner.currentTarget)
      return

    const squaredDistance = owner.position.squaredDistanceTo(owner.currentTarget.position)

    if (squaredDistance > 2)
      owner.stateMachine.changeTo('walk')
  }
}
