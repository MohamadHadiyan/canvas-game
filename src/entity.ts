export type EntityInput = {
  ctx?: CanvasRenderingContext2D | null
  position?: {x: number; y: number}
  velocity?: {x: number; y: number}
  boundary?: {width: number; height: number}
  destinationPosition?: {x: number; y: number}
  radius?: number
  color?: string
  width?: number
  height?: number
  speed?: number
}

export class Entity {
  position = {x: 0, y: 0}
  velocity = {x: 0, y: 0}
  boundary = {width: 0, height: 0}
  dimension = {radius: 0, width: 0, height: 0}
  color = '#fff'
  speed = 0
  ctx

  constructor({
    position = {x: 0, y: 0},
    velocity = {x: 0, y: 0},
    boundary = {width: 0, height: 0},
    color = '#fff',
    radius = 0,
    height = 0,
    width = 0,
    speed = 0,
    ctx,
  }: EntityInput) {
    this.ctx = ctx
    this.speed = speed
    this.color = color
    this.position = position
    this.velocity = velocity
    this.velocity = velocity
    this.boundary = boundary
    this.dimension = {radius, width, height}
  }

  draw() {
    if (!this.ctx) return

    const ctx = this.ctx
    const {x, y} = this.position
    const {radius, width, height} = this.dimension

    ctx.beginPath()
    ctx.save()

    if (width && height) {
      ctx.rect(x, y, width, height)
    } else {
      ctx.arc(x, y, radius, 0, Math.PI * 2, false)
    }

    ctx.fillStyle = this.color
    ctx.fill()
    ctx.restore()
  }

  update(
    destinationPosition?: {x: number; y: number} | null,
    onOutBoundary?: () => void
  ) {
    const {x, y} = this.position
    const {width, height} = this.boundary
    const {radius} = this.dimension
    let {x: vx, y: vy} = this.velocity

    if (destinationPosition) {
      const {x: dx, y: dy} = destinationPosition
      const angle = Math.atan2(dy - y, dx - x)
      vx = Math.cos(angle)
      vy = Math.sin(angle)
    }

    if (
      x < -radius ||
      x > width + radius ||
      y < -radius ||
      y > height + radius
    ) {
      onOutBoundary?.()
      return
    }

    this.draw()
    this.position = {x: x + vx, y: y + vy}
  }
}
