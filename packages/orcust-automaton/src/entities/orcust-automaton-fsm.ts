import type { GameEntity } from 'yuka'

import { ArriveBehavior, StateMachine, Vehicle } from 'yuka'

import { IdleState } from '../states/idle'
import { WalkState } from '../states/walk'

export class OrcustAutomatonFSM extends Vehicle {
  public currentTarget: GameEntity | null = null // player entity
  public currentTime = 0 // tracks the current time of an action
  public stateMachine: StateMachine<OrcustAutomatonFSM>

  constructor() {
    super()

    this.maxTurnRate = Math.PI * 0.5
    this.maxSpeed = 1.5

    // this.smoother = new Smoother(20)

    // steering
    // const obstacleAvoidanceBehavior = new ObstacleAvoidanceBehavior()
    // obstacleAvoidanceBehavior.active = false
    // obstacleAvoidanceBehavior.weight = 10
    // obstacleAvoidanceBehavior.brakingWeight = 1
    // this.steering.add(obstacleAvoidanceBehavior)

    const arriveBehavior = new ArriveBehavior()
    arriveBehavior.active = false
    // arriveBehavior.deceleration = 1.5
    this.steering.add(arriveBehavior)

    // state-driven agent design
    this.stateMachine = new StateMachine(this)
    this.stateMachine.add('idle', new IdleState())
    this.stateMachine.add('walk', new WalkState())
    this.stateMachine.changeTo('idle')
  }

  public setCurrentTarget(target: GameEntity) {
    this.currentTarget = target
    this.stateMachine.changeTo('walk')
  }

  update(delta: number) {
    super.update(delta)

    this.stateMachine.update()

    return this
  }
}
