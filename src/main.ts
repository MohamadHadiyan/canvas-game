import {Player} from './player'
import {Projectile} from './projectile'
import './style.css'

function init() {
  const app = document.querySelector('#app') as HTMLDivElement

  const canvas = document.createElement('canvas')
  canvas.height = window.innerHeight - 10
  canvas.width = window.innerWidth
  app.appendChild(canvas)

  const ctx = canvas.getContext('2d')
  const player = new Player(ctx, {
    position: {x: canvas.width / 2, y: canvas.height / 2, angle: 0},
    radius: 30,
    color: 'green',
    speed: 10,
  })

  const projectiles: Projectile[] = []

  function animate() {
    ctx?.clearRect(0, 0, canvas.width, canvas.height)
    player.draw(ctx)
    requestAnimationFrame(animate)

    projectiles.map(projectile => {
      projectile.update(ctx)
    })
  }
  animate()

  addEventListener('click', e => {
    const angle = Math.atan2(
      e.clientY - player.position.y - 15,
      e.clientX - player.position.x - 15
    )
    const velocity = {
      x: Math.cos(angle),
      y: Math.sin(angle),
    }
    const projectile = new Projectile(
      ctx,
      player.position.x + 15,
      player.position.y + 15,
      5,
      'red',
      velocity
    )
    projectiles.push(projectile)
  })
}

init()
