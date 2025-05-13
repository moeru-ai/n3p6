import type { ArriveBehavior } from 'yuka'

import { State } from 'yuka'

import type { OrcustAutomaton } from '../entities/orcust-automaton'

export class WalkState extends State<OrcustAutomaton> {
  enter(owner: OrcustAutomaton) {
    if (owner.currentTarget == null)
      return

    const arriveBehavior = owner.steering.behaviors.at(0) as ArriveBehavior
    arriveBehavior.target = owner.currentTarget.position
    owner.toggleArriveBehavior(true)
  }

  execute(owner: OrcustAutomaton) {
    if (!owner.currentTarget)
      return

    const squaredDistance = owner.position.squaredDistanceTo(owner.currentTarget.position)

    if (squaredDistance < 1)
      owner.stateMachine.changeTo('idle')
  }

  exit(owner: OrcustAutomaton) {
    owner.toggleArriveBehavior(false)
    owner.velocity.set(0, 0, 0)
  }
}
