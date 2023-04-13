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

  // ONCLICK
  player.shoot(options => {
    projectiles.push(Projectile.generate({...options, ctx}))
  })

  function animate() {
    requestAnimationFrame(animate)
    ctx?.clearRect(0, 0, canvas.width, canvas.height)
    player.draw()

    projectiles.forEach(projectile => {
      projectile.update()
    })

    enemies.forEach((enemy, enemyIndex) => {
      enemy.update()

      projectiles.forEach((projectile, projectileIndex) => {
        const {x, y} = projectile.position
        const distance = Math.hypot(x - enemy.position.x, y - enemy.position.y)
        const dimension = projectile.dimension.radius + enemy.dimension.radius

        // Check hit
        if (distance - dimension < 1) {
          // wait until the next frame
          setTimeout(() => {
            enemies.splice(enemyIndex, 1)
            projectiles.splice(projectileIndex, 1)
          })
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
          radius: {min: 7, max: 30},
          ctx,
        })
      )
    }, 2000)
  }

  animate()
  spawnEnemies()
}

init()
