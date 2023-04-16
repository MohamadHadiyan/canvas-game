import {Enemy} from './enemy'
import {Particle} from './particle'
import {Player} from './player'
import {Projectile} from './projectile'
import {Score} from './score'
import './style.css'

function init() {
  const app = document.querySelector('#app') as HTMLDivElement
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

  if (!ctx) return

  const score = new Score(app)

  let animationId = 0

  canvas.height = window.innerHeight - 10
  canvas.width = window.innerWidth
  app.appendChild(canvas)

  const projectiles: Projectile[] = []
  const particles: Particle[] = []
  const enemies: Enemy[] = []
  let player: Player = null as unknown as Player

  function run() {
    projectiles.length = 0
    particles.length = 0
    enemies.length = 0

    player = new Player({
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

    animate()
    spawnEnemies()
  }

  function animate() {
    animationId = requestAnimationFrame(animate)
    ctx.fillStyle = 'rgba(0,0,0,0.1)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    player.draw()

    projectiles.forEach((projectile, index) => {
      // Remove from edges of screen
      projectile.update(null, () => projectiles.splice(index, 1))
    })

    particles.forEach((particle, index) => {
      if (particle.alpha <= 0.05) {
        particles.splice(index, 1)
      } else {
        particle.update()
      }
    })

    enemies.forEach((enemy, enemyIndex) => {
      enemy.update(player.position)

      const {x, y} = player.position
      const distance = Math.hypot(x - enemy.position.x, y - enemy.position.y)
      const dimension = player.dimension.width / 2 + enemy.dimension.radius

      // End Game
      if (distance - dimension < 1) {
        cancelAnimationFrame(animationId)
        score.gameOver(app, () =>
          setTimeout(() => {
            player.destroy()
            run()
          })
        )
      }

      projectiles.forEach((projectile, projectileIndex) => {
        const {x, y} = projectile.position
        const distance = Math.hypot(x - enemy.position.x, y - enemy.position.y)
        const dimension = projectile.dimension.radius + enemy.dimension.radius

        // Check hit
        if (distance - dimension < 1) {
          for (let count = 0; count < enemy.dimension.radius; count++) {
            particles.push(
              new Particle({
                position: enemy.position,
                boundary: {width: canvas.width, height: canvas.height},
                velocity: {
                  x: (Math.random() - 0.5) * (Math.random() * 5),
                  y: (Math.random() - 0.5) * (Math.random() * 5),
                },
                destinationPosition: {
                  x: enemy.position.x + 100,
                  y: enemy.position.y + 100,
                },
                alpha: 1,
                friction: 0.99,
                color: enemy.color,
                radius: Math.random() * 2 + 1,
                ctx,
              })
            )
          }

          // wait until the next frame
          if (enemy.dimension.radius - 10 > 5) {
            setTimeout(() => {
              score.update(10)
              enemy.dimension.radius -= 10
              projectiles.splice(projectileIndex, 1)
            })
          } else {
            setTimeout(() => {
              score.update(25)
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
    }, 1000)
  }

  run()
}

init()
