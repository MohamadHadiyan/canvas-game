import {Entity} from './entity'

type GenerateOptions = {
  ctx: CanvasRenderingContext2D | null
  currentPosition: {x: number; y: number}
  destinationPosition: {x: number; y: number}
  boundary: {width: number; height: number}
  radius?: number
  speed?: number
  color?: string
}

export class Projectile extends Entity {
  static generate({currentPosition, ctx, ...rest}: GenerateOptions) {
    const {x: dx, y: dy} = rest.destinationPosition
    const {x, y} = currentPosition
    const angle = Math.atan2(dy - y, dx - x)
    const speed = rest.speed ?? 10

    const velocity = {
      x: Math.cos(angle) * speed,
      y: Math.sin(angle) * speed,
    }

    return new Projectile({
      position: currentPosition,
      color: rest.color || 'red',
      radius: rest.radius || 5,
      boundary: rest.boundary,
      velocity,
      ctx,
    })
  }
}
