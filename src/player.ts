import {Entity, EntityInput} from './entity'

export class Player extends Entity {
  private angle = 0

  constructor(input: EntityInput) {
    super(input)
    this.init()
  }

  private init(): void {
    this.move()
    this.draw()
    this.rotate()
  }

  override draw(): void {
    if (!this.ctx) return

    const {width, height} = this.dimension
    const {x, y} = this.position
    const ctx = this.ctx

    const tx = x + 0.5 * width - width / 2
    const ty = y + 0.5 * height - height / 2

    ctx.beginPath()
    ctx.save()
    ctx.translate(tx, ty)
    ctx.rotate(this.angle)
    ctx.translate(-tx, -ty)
    ctx.fillStyle = this.color
    ctx.fillRect(x - width / 2, y - height / 2, width, height)
    ctx.restore()
    ctx.closePath()
  }

  private move(): void {
    const keys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
    document.addEventListener('keydown', e => {
      if (!keys.includes(e.key)) return

      if (!this.ctx) return

      const {x, y} = this.velocity

      let nx = this.position.x
      let ny = this.position.y

      switch (e.key) {
        case 'ArrowUp': {
          ny += y
          nx += x
          break
        }
        case 'ArrowDown': {
          ny -= y
          nx -= x
          break
        }
        case 'ArrowLeft': {
          nx += y
          ny -= x
          break
        }
        case 'ArrowRight': {
          nx -= y
          ny += x
          break
        }
      }

      this.position.x = nx
      this.position.y = ny
    })
  }

  rotate() {
    addEventListener('mousemove', e => {
      const {x, y} = this.position
      const nextAngle = Math.atan2(e.clientY - y, e.clientX - x)

      this.angle = nextAngle
      this.velocity = {
        x: Math.cos(nextAngle) * 5,
        y: Math.sin(nextAngle) * 5,
      }
    })
  }
}
