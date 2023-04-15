import {Enemy} from './enemy'
import {Player} from './player'
import {Projectile} from './projectile'
import './style.css'

function init() {
  const app = document.querySelector('#app') as HTMLDivElement

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

  if (!ctx) return

  let animationId = 0

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

  // ONCLICK
  player.shoot(options => {
    projectiles.push(
      Projectile.generate({
        ...options,
        boundary: {width: canvas.width, height: canvas.height},
        ctx,
      })
    )
  })

  function animate() {
    animationId = requestAnimationFrame(animate)
    ctx.fillStyle = 'rgba(0,0,0,0.1)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    player.draw()

    projectiles.forEach((projectile, index) => {
      // Remove from edges of screen
      projectile.update(null, () => projectiles.splice(index, 1))
    })

    enemies.forEach((enemy, enemyIndex) => {
      enemy.update(player.position)

      const {x, y} = player.position
      const distance = Math.hypot(x - enemy.position.x, y - enemy.position.y)
      const dimension = player.dimension.width / 2 + enemy.dimension.radius

      // End Game
      if (distance - dimension < 1) {
        cancelAnimationFrame(animationId)
      }

      projectiles.forEach((projectile, projectileIndex) => {
        const {x, y} = projectile.position
        const distance = Math.hypot(x - enemy.position.x, y - enemy.position.y)
        const dimension = projectile.dimension.radius + enemy.dimension.radius

        // Check hit
        if (distance - dimension < 1) {
          // wait until the next frame
          if (enemy.dimension.radius - 10 > 5) {
            enemy.dimension.radius -= 10
            setTimeout(() => {
              projectiles.splice(projectileIndex, 1)
            })
          } else {
            setTimeout(() => {
              enemies.splice(enemyIndex, 1)
              projectiles.splice(projectileIndex, 1)
            })
          }
        }
      })
    })
  }

  function spawnEnemies() {
    setInterval(() => {
      enemies.push(
        Enemy.generate({
          boundary: {width: canvas.width, height: canvas.height},
          destinationPosition: player.position,
          radius: {min: 10, max: 30},
          ctx,
        })
      )
    }, 2000)
  }

  animate()
  spawnEnemies()
}

init()
