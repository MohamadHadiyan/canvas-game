export class Score {
  scoreElement: HTMLSpanElement = null as unknown as HTMLSpanElement
  appElement: HTMLDivElement = null as unknown as HTMLDivElement
  scoreValue = 0

  constructor(appElement: HTMLDivElement) {
    this.createScore(appElement)
  }

  createScore(appElement: HTMLDivElement) {
    const scoreContainer = document.createElement('div')
    const scoreText = document.createElement('span')
    const scoreValue = document.createElement('span')

    scoreContainer.className = 'score-container'
    scoreText.textContent = 'Score: '
    scoreValue.textContent = '0'

    scoreContainer.append(scoreText, scoreValue)
    appElement.appendChild(scoreContainer)

    this.scoreElement = scoreValue

    return scoreValue
  }

  gameOver(appElement: HTMLDivElement, onClick: () => void) {
    const container = document.createElement('div')
    const points = document.createElement('span')
    const pointsText = document.createElement('span')
    const startBtn = document.createElement('button')

    points.textContent = this.scoreValue.toString()
    pointsText.textContent = 'Points'
    startBtn.textContent = 'Start Game'
    container.className = 'game-over-container'
    container.append(points, pointsText, startBtn)
    startBtn.onclick = () => {
      appElement.removeChild(container)
      this.scoreElement.textContent = '0'
      this.scoreValue = 0

      onClick()
    }

    appElement.appendChild(container)
  }

  update(score: number) {
    this.scoreValue += score
    this.scoreElement.textContent = this.scoreValue.toString()
  }
}
