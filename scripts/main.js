const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const w = canvas.width
const h = canvas.height
const playerSpeed = 5
const fallSpeed = 0.5
const gravity = .1
const background = new Image()

const sync = new Player({ x: 30, y: 0, currentSprite: mainHero.right })
const enemy = new Enemy({ x: 1000, y: 0, currentSprite: enemyHero.left })

const keyPressed = {
    'keyD': false,
    'keyA': false,
    'keyW': false,
}

function animate() {
    background.src = 'images/bg.png'
    ctx.drawImage(background, 0, 0, w, h)
    if (keyPressed.keyD) {
        sync.x += playerSpeed
        sync.currentSprite = mainHero.right
    }
    if (keyPressed.keyA) {
        sync.x -= playerSpeed
        sync.currentSprite = mainHero.left
    }
    if (keyPressed.keyW) sync.jump()
    sync.render()
    enemy.render()

    requestAnimationFrame(animate)
}

function rederBullet() {
    return new Bullet({ x: sync.x, y: sync.y })
}

document.addEventListener('keydown', function (e) {
    if (e.code === 'KeyD') keyPressed.keyD = true
    if (e.code === 'KeyA') keyPressed.keyA = true
    if (e.code === 'KeyW') keyPressed.keyW = true
    if (e.code === 'Space') sync.shoot()
    console.log(e.code);
})

document.addEventListener('keyup', function (e) {
    if (e.code === 'KeyD') keyPressed.keyD = false
    if (e.code === 'KeyA') keyPressed.keyA = false
    if (e.code === 'KeyW') keyPressed.keyW = false
})

animate()