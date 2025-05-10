import type { NavMesh, Vehicle, Vector3 as YukaVector3 } from 'yuka'

import { ArriveBehavior, FollowPathBehavior } from 'yuka'

export class NavMeshArriveBehavior extends ArriveBehavior {
  public navMesh?: NavMesh
  private followPathBehavior = new FollowPathBehavior()
  private navMeshInitialized = false

  calculate(vehicle: Vehicle, force: YukaVector3) {
    if (this.navMesh) {
      if (!this.navMeshInitialized || this.followPathBehavior.path.finished()) {
        this.followPathBehavior.path.clear()

        const path = this.navMesh.findPath(vehicle.position, this.target)
        for (const point of path) {
          this.followPathBehavior.path.add(point)
        }
      }

      return this.followPathBehavior.calculate(vehicle, force)
    }
    else {
      return super.calculate(vehicle, force)
    }
  }
}
