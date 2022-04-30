const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const w = canvas.width
const h = canvas.height
const playerSpeed = 5
const fallSpeed = 3
const gravity = .2
const background = new Image()
const bulletSize = 15

const sync = new Player({ x: 30, y: 0, pos: 'right', health: 5 })
const enemy = new Enemy({ x: 1000, y: 0, botsCondition: 'shooting' })
const enemy2 = new Enemy({ x: 1200, y: 0, botsCondition: 'shooting' })
sync.init()
enemy.init()
enemy2.init()
const keyPressed = {
    'keyD': false,
    'keyA': false,
    'keyW': false,
}
function animate() {
    // background.src = 'images/bg.png'
    // ctx.drawImage(background, 0, 0, w, h)
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, w, h)
    if (keyPressed.keyD) {
        sync.x += playerSpeed
        sync.pos = 'right'
    }
    if (keyPressed.keyA) {
        sync.x -= playerSpeed
        sync.pos = 'left'
    }
    if (keyPressed.keyW) sync.jump()
    if (sync.hitCondion(enemy)) enemy.death()
    if (sync.hitCondion(enemy2)) enemy2.death()
    sync.render()
    enemy.render()
    enemy2.render()
    requestAnimationFrame(animate)
}

document.addEventListener('keydown', function (e) {
    if (e.code === 'KeyD') keyPressed.keyD = true
    if (e.code === 'KeyA') keyPressed.keyA = true
    if (e.code === 'KeyW') keyPressed.keyW = true
    if (e.code === 'Space') sync.shoot()
})

document.addEventListener('keyup', function (e) {
    if (e.code === 'KeyD') keyPressed.keyD = false
    if (e.code === 'KeyA') keyPressed.keyA = false
    if (e.code === 'KeyW') keyPressed.keyW = false
})

animate()