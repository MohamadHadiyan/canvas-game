import {Enemy} from './enemy'
import {Player} from './player'
import {Projectile} from './projectile'
import './style.css'

function init() {
  const app = document.querySelector('#app') as HTMLDivElement

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  canvas.height = window.innerHeight - 10
  canvas.width = window.innerWidth
  app.appendChild(canvas)

  const projectiles: Projectile[] = []
  const enemies: Enemy[] = []
  const player = new Player({
    ctx,
    radius: 30,
    color: 'green',
    width: 30,
    height: 30,
    velocity: {x: 10, y: 10},
    position: {x: canvas.width / 2, y: canvas.height / 2},
  })

  function animate() {
    ctx?.clearRect(0, 0, canvas.width, canvas.height)
    player.draw()
    requestAnimationFrame(animate)

    projectiles.forEach(projectile => {
      projectile.update()
    })

    enemies.forEach(enemy => {
      enemy.update()
    })
  }

  function spawnEnemies() {
    setInterval(() => {
      const radius = Math.random() * (30 - 10) + 10
      const position = {x: 0, y: 0}

      if (Math.random() < 0.5) {
        position.x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius
        position.y = Math.random() * canvas.height
      } else {
        position.x = Math.random() * canvas.width
        position.y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius
      }

      const angle = Math.atan2(
        player.position.y - position.y,
        player.position.x - position.x
      )

      const velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle),
      }

      const options = {
        position,
        velocity,
        color: 'yellow',
        radius,
        ctx,
      }

      enemies.push(new Enemy(options))
    }, 2000)
  }

  addEventListener('click', e => {
    const angle = Math.atan2(
      e.clientY - player.position.y,
      e.clientX - player.position.x
    )
    const velocity = {
      x: Math.cos(angle),
      y: Math.sin(angle),
    }
    const position = {
      x: player.position.x,
      y: player.position.y,
    }

    const projectile = new Projectile({
      ctx,
      position,
      radius: 5,
      color: 'red',
      velocity,
    })
    projectiles.push(projectile)
  })

  animate()
  spawnEnemies()
}

init()
