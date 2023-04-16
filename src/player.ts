import {Entity, EntityInput} from './entity'

type ShootResult = {
  currentPosition: {x: number; y: number}
  destinationPosition: {x: number; y: number}
}

export class Player extends Entity {
  private angle = 0
  private shootHandler: (e: MouseEvent) => void = () => null
  private rotateHandler: (e: MouseEvent) => void = () => null
  private moveHandler: (e: KeyboardEvent) => void = () => null

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
    this.moveHandler = (e: KeyboardEvent) => {
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
          nx -= y
          ny += x
          break
        }
        case 'ArrowRight': {
          nx += y
          ny -= x
          break
        }
      }

      this.position.x = nx
      this.position.y = ny
    }

    document.addEventListener('keydown', this.moveHandler)
  }

  private rotate(): void {
    this.rotateHandler = (e: MouseEvent) => {
      const {x, y} = this.position
      const nextAngle = Math.atan2(e.clientY - y, e.clientX - x)

      this.angle = nextAngle
      this.velocity = {
        x: Math.cos(nextAngle) * 5,
        y: Math.sin(nextAngle) * 5,
      }
    }

    document.addEventListener('mousemove', this.rotateHandler)
  }

  shoot(callback: (values: ShootResult) => void) {
    this.shootHandler = (e: MouseEvent) => {
      callback({
        currentPosition: this.position,
        destinationPosition: {y: e.clientY, x: e.clientX},
      })
    }

    document.addEventListener('click', this.shootHandler)
  }

  destroy() {
    document.removeEventListener('keydown', this.moveHandler)
    document.removeEventListener('click', this.shootHandler)
    document.removeEventListener('mousemove', this.rotateHandler)
  }
}
