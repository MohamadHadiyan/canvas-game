export type EntityInput = {
  ctx?: CanvasRenderingContext2D | null
  position?: {x: number; y: number}
  velocity?: {x: number; y: number}
  radius?: number
  color?: string
  width?: number
  height?: number
}

export class Entity {
  position = {x: 0, y: 0}
  velocity = {x: 0, y: 0}
  dimension = {radius: 0, width: 0, height: 0}
  color = '#fff'
  ctx

  constructor({
    position = {x: 0, y: 0},
    velocity = {x: 0, y: 0},
    color = '#fff',
    radius = 0,
    height = 0,
    width = 0,
    ctx,
  }: EntityInput) {
    this.ctx = ctx
    this.position = position
    this.velocity = velocity
    this.color = color
    this.velocity = velocity
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

  update() {
    const {x, y} = this.position
    const {x: vx, y: vy} = this.velocity

    this.draw()
    this.position = {x: x + vx, y: y + vy}
  }
}
