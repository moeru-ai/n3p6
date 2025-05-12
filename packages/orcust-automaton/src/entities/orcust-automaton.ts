import type { AnimationAction } from 'three'
import type { GameEntity } from 'yuka'

import { ArriveBehavior, ObstacleAvoidanceBehavior, Smoother, Think, Vehicle } from 'yuka'

import { FollowEvaluator } from '../evaluators/follow'

export class OrcustAutomaton extends Vehicle {
  public actions: Record<string, AnimationAction | null> = {}
  public brain: Think<OrcustAutomaton>
  // this.pickUpDuration = 6 //  duration of a pick phase in seconds
  // this.crossFadeDuration = 0.5 // duration of a crossfade in seconds
  public currentTarget: GameEntity | null = null // player entity
  public currentTime = 0 // tracks the current time of an action
  public deltaTime: number = 0 // the current time delta value

  constructor() {
    super()

    this.maxTurnRate = Math.PI * 0.5
    this.maxSpeed = 1.5

    this.smoother = new Smoother(20)

    // goal-driven agent design
    this.brain = new Think(this)
    this.brain.addEvaluator(new FollowEvaluator())

    // steering
    const obstacleAvoidanceBehavior = new ObstacleAvoidanceBehavior()
    obstacleAvoidanceBehavior.active = false
    // obstacleAvoidanceBehavior.weight = 10
    // obstacleAvoidanceBehavior.brakingWeight = 1
    this.steering.add(obstacleAvoidanceBehavior)

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

  public setObstacles(obstacles: GameEntity[]) {
    (this.steering.behaviors.at(0) as ObstacleAvoidanceBehavior).obstacles = obstacles
  }

  update(delta: number) {
    super.update(delta)

    this.deltaTime = delta

    this.brain.execute()
    this.brain.arbitrate()

    return this
  }
}
