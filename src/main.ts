import {Player} from './player'
import './style.css'

function init() {
  const app = document.querySelector('#app') as HTMLDivElement

  const canvas = document.createElement('canvas')
  canvas.height = window.innerHeight - 10
  canvas.width = window.innerWidth
  app.appendChild(canvas)

  const ctx = canvas.getContext('2d')
  new Player(ctx, {
    position: {x: canvas.width / 2, y: canvas.height / 2, angle: 0},
    radius: 20,
    color: 'green',
    speed: 25,
  })
}

init()
