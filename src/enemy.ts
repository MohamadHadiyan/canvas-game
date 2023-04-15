import {Entity} from './entity'

type GenerateOptions = {
  boundary: {width: number; height: number}
  destinationPosition: {x: number; y: number}
  ctx: CanvasRenderingContext2D | null
  radius?: {min: number; max: number}
}

export class Enemy extends Entity {
  static generate({radius = {min: 20, max: 20}, ...rest}: GenerateOptions) {
    const rndRadius = Math.random() * (radius.max - radius.min) + radius.min
    const {x: dx, y: dy} = rest.destinationPosition
    const {width, height} = rest.boundary
    const position = {x: 0, y: 0}

    if (Math.random() < 0.5) {
      position.x = Math.random() < 0.5 ? 0 - rndRadius : width + rndRadius
      position.y = Math.random() * height
    } else {
      position.x = Math.random() * width
      position.y = Math.random() < 0.5 ? 0 - rndRadius : height + rndRadius
    }

    const angle = Math.atan2(dy - position.y, dx - position.x)

    const velocity = {
      x: Math.cos(angle),
      y: Math.sin(angle),
    }

    const options = {
      position,
      velocity,
      color: `hsl(${Math.round(Math.random() * 300 + 60)}, ${Math.round(
        Math.random() * 50 + 10
      )}%, ${Math.round(Math.random() * 50 + 10)}%)`,
      radius: rndRadius,
      boundary: rest.boundary,
      ctx: rest.ctx,
    }

    return new Enemy(options)
  }
}
