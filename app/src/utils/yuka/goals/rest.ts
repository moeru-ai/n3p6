// import { CompositeGoal, Goal, Matrix4, Vector3 } from '../../../build/yuka.module.js'

import { Goal } from 'yuka'

import type { Galatea } from '~/utils/yuka/entities/galatea'

// const REST = 'REST'
// const GATHER = 'GATHER'
// const FIND_NEXT = 'FIND NEXT'
// const SEEK = 'SEEK'
// const PICK_UP = 'PICK UP'
// const PLACEHOLDER = '-'

// const WALK = 'WALK'
// const RIGHT_TURN = 'RIGHT_TURN'
// const LEFT_TURN = 'LEFT_TURN'
// const IDLE = 'IDLE'

// const inverseMatrix = new Matrix4()
// const localPosition = new Vector3()

export class RestGoal extends Goal<Galatea> {
  constructor(owner: Galatea) {
    super(owner)
  }

  activate() {
    this.owner!.vrm?.humanoid.resetNormalizedPose()
    this.owner!.actions.idle?.reset().fadeIn(0.5).play()
  }

  execute() {
    const owner = this.owner

    this.owner!.currentTime += this.owner!.deltaTime

    if (owner!.currentTime >= owner!.restDuration) {
      this.status = Goal.STATUS.COMPLETED
    }
  }

  terminate() {
    this.owner!.currentTime = 0
    this.owner!.fatigueLevel = 0

    this.owner!.vrm?.humanoid.resetNormalizedPose()
    this.owner!.actions.idle?.fadeOut(0.5).stop()
  }
}
