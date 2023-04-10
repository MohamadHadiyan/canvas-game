type Position = {
  x: number
  y: number
  angle: number
}

type PlayerOptions = {
  position: Position
  speed: number
  radius: number
  color: string
}

export class Player {
  private options = {speed: 5, radius: 20, color: 'black'}
  private context: CanvasRenderingContext2D | null = null
  position = {x: 0, y: 0, angle: 0}

  constructor(
    ctx: CanvasRenderingContext2D | null,
    {position, ...rest}: PlayerOptions
  ) {
    this.position = position
    this.options = rest
    this.context = ctx
    this.init()
  }

  private init(): void {
    this.move()
  }

  draw(ctx: CanvasRenderingContext2D | null): void {
    if (!ctx) return

    const {color, radius} = this.options
    const {x, y, angle} = this.position
    const ro = (Math.PI / 8) * angle
    const tx = x + 0.5 * radius
    const ty = y + 0.5 * radius

    ctx.beginPath()
    ctx.save()
    ctx.translate(tx, ty)
    ctx.rotate(ro)
    ctx.translate(-tx, -ty)

    ctx.fillStyle = color
    ctx.fillRect(x, y, radius, radius)
    ctx.restore()
    ctx.closePath()
  }

  private move(): void {
    const keys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
    document.addEventListener('keydown', e => {
      if (!keys.includes(e.key)) return

      if (!this.context) return

      const {speed} = this.options
      const {x, y, angle} = this.position
      // const ro = (Math.PI / 8) * angle
      let nx = x
      let ny = y

      switch (e.key) {
        case 'ArrowUp': {
          this.position.angle = angle + 1 >= 4 ? 0 : angle + 1
          ny -= speed
          break
        }
        case 'ArrowDown': {
          this.position.angle = angle - 1 < 0 ? 4 : angle - 1
          ny += speed
          break
        }
        case 'ArrowLeft': {
          this.position.angle = angle - 1 < 0 ? 4 : angle - 1
          nx -= speed
          break
        }
        case 'ArrowRight': {
          this.position.angle = angle + 1 >= 4 ? 0 : angle + 1
          nx += speed
          break
        }
      }

      this.position.x = nx
      this.position.y = ny

      this.draw(this.context)
    })
  }
}
