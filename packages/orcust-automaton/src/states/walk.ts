import type { ArriveBehavior } from 'yuka'

import { State } from 'yuka'

import type { OrcustAutomatonFSM } from '../entities/orcust-automaton-fsm'

export class WalkState extends State<OrcustAutomatonFSM> {
  enter(owner: OrcustAutomatonFSM) {
    if (owner.currentTarget == null)
      return

    const arriveBehavior = owner.steering.behaviors.at(0) as ArriveBehavior
    arriveBehavior.target = owner.currentTarget.position
    arriveBehavior.active = true
  }

  execute(owner: OrcustAutomatonFSM) {
    if (!owner.currentTarget)
      return

    const squaredDistance = owner.position.squaredDistanceTo(owner.currentTarget.position)

    if (squaredDistance < 1)
      owner.stateMachine.changeTo('idle')
  }

  exit(owner: OrcustAutomatonFSM) {
    const arriveBehavior = owner.steering.behaviors.at(0) as ArriveBehavior
    arriveBehavior.active = false
    owner.velocity.set(0, 0, 0)
  }
}
