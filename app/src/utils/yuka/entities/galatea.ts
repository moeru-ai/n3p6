import type { AnimationAction } from 'three'
import type { GameEntity } from 'yuka'

import { ArriveBehavior, Think, Vehicle } from 'yuka'

import { FollowEvaluator } from '~/utils/yuka/evaluators/follow'
import { RestEvaluator } from '~/utils/yuka/evaluators/rest'

export class Galatea extends Vehicle {
  public actions: Record<string, AnimationAction | null> = {}
  public brain: Think<Galatea>
  // this.pickUpDuration = 6 //  duration of a pick phase in seconds
  // this.crossFadeDuration = 0.5 // duration of a crossfade in seconds
  public currentTarget: GameEntity | null = null // player entity
  public currentTime = 0 // tracks the current time of an action
  public deltaTime: number = 0 // the current time delta value
  public fatigueLevel = 0 // current level of fatigue

  public restDuration = 5 // duration of a rest phase in seconds

  private MAX_FATIGUE = 3 // the girl needs to rest if this amount of fatigue is reached

  constructor() {
    super()

    this.maxTurnRate = Math.PI * 0.5
    this.maxSpeed = 1.5

    // goal-driven agent design
    this.brain = new Think(this)
    this.brain.addEvaluator(new FollowEvaluator())
    this.brain.addEvaluator(new RestEvaluator())

    // steering
    const arriveBehavior = new ArriveBehavior()
    arriveBehavior.deceleration = 1.5
    this.steering.add(arriveBehavior)
  }

  public setActions(actions: Record<string, AnimationAction | null>) {
    this.actions = actions

    this.actions.idle!.enabled = true
  }

  public setCurrentTarget(target: GameEntity) {
    this.currentTarget = target
  }

  tired() {
    return (this.fatigueLevel >= this.MAX_FATIGUE)
  }

  update(delta: number) {
    super.update(delta)

    this.deltaTime = delta

    this.brain.execute()
    this.brain.arbitrate()

    return this
  }
}
