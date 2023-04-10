export class Projectile {
  private x = 0
  private y = 0
  private radius = 0
  private color = 'black'
  private velocity = {x: 0, y: 0}

  constructor(
    ctx: CanvasRenderingContext2D | null,
    x = 0,
    y = 0,
    radius = 0,
    color = 'black',
    velocity = {x: 1, y: 1}
  ) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.velocity = velocity

    this.draw(ctx)
  }

  draw(ctx: CanvasRenderingContext2D | null) {
    if (!ctx) return

    ctx.beginPath()
    ctx.save()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.restore()
  }

  update(ctx: CanvasRenderingContext2D | null) {
    this.draw(ctx)

    this.x = this.x + this.velocity.x
    this.y = this.y + this.velocity.y
  }
}
