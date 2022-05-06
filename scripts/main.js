const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const w = canvas.width
const h = canvas.height
const playerSpeed = 5
const fallSpeed = 3
const gravity = .2
const background = new Image()
const bulletSize = 15
const bulletSpeed = 15

const mainHero = new Player({ x: 30, y: 0, pos: 'right', health: 5 })
const enemy = new Enemy({ x: 1000, y: 0, botsCondition: 'shooting' })
const enemy2 = new Enemy({ x: 1200, y: 0, botsCondition: 'shooting' })
mainHero.init()
enemy.init()
enemy2.init()
const keyPressed = {
    'keyD': false,
    'keyA': false,
    'keyW': false,
    'space': false
}
function animate() {
    // background.src = 'images/bg.png'
    // ctx.drawImage(background, 0, 0, w, h)
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, w, h)
    if (keyPressed.keyD) {
        mainHero.x += playerSpeed
        mainHero.pos = 'right'
        mainHero.condition = 'run'
    }
    if (keyPressed.keyA) {
        mainHero.x -= playerSpeed
        mainHero.pos = 'left'
        mainHero.condition = 'run'
    }
    if (!keyPressed.keyD && !keyPressed.keyA && !keyPressed.space) mainHero.condition = 'idle'
    if (keyPressed.keyW) mainHero.jump()
    if (mainHero.hitCondion(enemy)) enemy.death()
    if (mainHero.hitCondion(enemy2)) enemy2.death()
    mainHero.render()
    enemy.render(mainHero)
    enemy2.render(mainHero)
    requestAnimationFrame(animate)
}

document.addEventListener('keydown', function (e) {
    if (e.code === 'KeyD') keyPressed.keyD = true
    if (e.code === 'KeyA') keyPressed.keyA = true
    if (e.code === 'KeyW') keyPressed.keyW = true
    if (e.code === 'Space' && !keyPressed.space) {
        keyPressed.space = true
        mainHero.shoot()
        setTimeout(() => keyPressed.space = false, 700)
    }
})

document.addEventListener('keyup', function (e) {
    if (e.code === 'KeyD') keyPressed.keyD = false
    if (e.code === 'KeyA') keyPressed.keyA = false
    if (e.code === 'KeyW') keyPressed.keyW = false
})

animate()