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
  private options = {speed: 3, radius: 20, color: 'black'}
  private context: CanvasRenderingContext2D | null = null
  position = {x: 20, y: 20, angle: 0}

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
    this.update()
  }

  private draw(): void {
    if (!this.context) return

    const {color} = this.options
    const {x, y, angle} = this.position
    const ctx = this.context
    const ro = (Math.PI / 8) * angle
    const tx = x + 0.5 * 50
    const ty = y + 0.5 * 50

    ctx.save()
    ctx.translate(tx, ty)
    ctx.rotate(ro)
    ctx.translate(-tx, -ty)

    ctx.fillStyle = color
    ctx.fillRect(x, y, 50, 50)
    ctx.restore()
  }

  private update(): void {
    // this.clear()
    this.draw()
    this.move()
  }

  private move(): void {
    const keys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
    document.addEventListener('keydown', e => {
      if (!keys.includes(e.key)) return

      if (!this.context) return

      const {speed} = this.options
      const {x, y, angle} = this.position
      let nx = x
      let ny = y
      this.clear()

      switch (e.key) {
        case 'ArrowUp': {
          ny -= speed
          break
        }
        case 'ArrowDown': {
          ny += speed
          break
        }
        case 'ArrowLeft': {
          nx -= speed
          break
        }
        case 'ArrowRight': {
          nx += speed
          break
        }
      }

      this.position.x = nx
      this.position.y = ny
      this.position.angle = angle + 1 >= 4 ? 0 : angle + 1

      this.draw()
    })
  }

  private clear() {
    if (!this.context) return

    const ctx = this.context
    const {x, y, angle} = this.position
    const ro = (Math.PI / 8) * angle

    ctx.save()
    ctx.rotate(ro)
    ctx.clearRect(x, y, 50, 50)
    ctx.restore()
  }
}
