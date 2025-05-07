import { CompositeGoal } from 'yuka'

import type { Galatea } from '../entities/galatea'

import { SeekToPlayerGoal } from './seek-to-player'

export class FollowGoal extends CompositeGoal<Galatea> {
  constructor(owner: Galatea) {
    super(owner)
  }

  activate() {
    this.clearSubgoals()

    // this.addSubgoal(new FindNextCollectibleGoal(owner))
    // this.addSubgoal(new SeekToCollectibleGoal(owner))
    // this.addSubgoal(new PickUpCollectibleGoal(owner))
    this.addSubgoal(new SeekToPlayerGoal(this.owner!))

    this.owner!.actions.idle?.fadeOut(0.5).stop()
  }

  execute() {
    this.status = this.executeSubgoals()

    this.replanIfFailed()
  }
}
