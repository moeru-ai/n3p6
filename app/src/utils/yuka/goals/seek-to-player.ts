import type { ArriveBehavior } from 'yuka'

import { Goal } from 'yuka'

import type { Galatea } from '../entities/galatea'

export class SeekToPlayerGoal extends Goal<Galatea> {
  constructor(owner: Galatea) {
    super(owner)
  }

  activate() {
    if (this.owner!.currentTarget !== null) {
      const arriveBehavior = this.owner!.steering.behaviors.at(0) as ArriveBehavior
      arriveBehavior.target = this.owner!.currentTarget.position
      arriveBehavior.active = true
    }
    else {
      this.status = Goal.STATUS.FAILED
    }

    this.owner!.vrm?.humanoid.resetNormalizedPose()
    this.owner!.actions.walk?.reset().fadeIn(0.5).play()
  }

  execute() {
    if (!(this.active()))
      return
    // const owner = this.owner

    const squaredDistance = this.owner!.position.squaredDistanceTo(this.owner!.currentTarget!.position)

    if (squaredDistance < 0.25) {
      this.status = Goal.STATUS.COMPLETED
    }

    // adjust animation speed based on the actual velocity
    this.owner!.actions.walk!.timeScale = Math.min(0.75, this.owner!.getSpeed() / this.owner!.maxSpeed)
  }

  terminate() {
    const arriveBehavior = this.owner!.steering.behaviors.at(0) as ArriveBehavior
    arriveBehavior.active = false
    this.owner!.velocity.set(0, 0, 0)

    this.owner!.vrm?.humanoid.resetNormalizedPose()
    this.owner!.actions.walk?.fadeOut(0.5).stop()
  }
}
