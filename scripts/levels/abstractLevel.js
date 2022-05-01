class AbstractLevel {
    constructor({
        bgImage = 'images/bg.png',
        mainHeroSettings = {},
        enemySettings = [],
        platforms = [],
        keyPressed = {
            'keyD': false,
            'keyA': false,
            'keyW': false,
            'space': false
        }
    }) {
        this.background = new Image()
        this.mainHero = new Player(mainHeroSettings)
        this.enemies = enemySettings.map(enemySetting => new Enemy(enemySetting))
        this.background.src = bgImage
        this.keyPressed = keyPressed
        this.platforms = platforms.map(platform => new Platform(platform))

        const main = this.mainHero
        document.addEventListener('keydown', function (e) {
            if (e.code === 'KeyD') keyPressed.keyD = true
            if (e.code === 'KeyA') keyPressed.keyA = true
            if (e.code === 'KeyW') keyPressed.keyW = true
            if (e.code === 'Space' && !keyPressed.space) {
                keyPressed.space = true
                main.shoot()
                setTimeout(() => keyPressed.space = false, 700)
            }
        })

        document.addEventListener('keyup', function (e) {
            if (e.code === 'KeyD') keyPressed.keyD = false
            if (e.code === 'KeyA') keyPressed.keyA = false
            if (e.code === 'KeyW') keyPressed.keyW = false
        })
    }

    animate() {
        ctx.drawImage(this.background, 0, 0, w, h)
        this.setControls()
        this.enemies?.map(enemy => this.mainHero.hitCondion(enemy) && enemy.death())
        this.mainHero.render({ platforms: this.platforms })
        this.enemies.map(enemy => enemy.render({ target: this.mainHero, platforms: this.platforms }))
        this.platforms.map(platform => platform.render())
        requestAnimationFrame(() => this.animate())
    }

    setControls() {
        const leftPlatformSideCondition = this.platforms.some(platform =>
            ((platform.x - (this.mainHero.x + this.mainHero.w - 30) === 0)) &&
            ((this.mainHero.y + this.mainHero.h) - platform.y >= 0) &&
            (this.mainHero.y - (platform.y + platform.h) <= 0))
        const rightPlatformSideCondition = this.platforms.some(platform =>
            ((this.mainHero.x - (platform.x + platform.w - 30)) === 0) &&
            ((this.mainHero.y + this.mainHero.h) - platform.y >= 0) &&
            (this.mainHero.y - (platform.y + platform.h) <= 0))
        if (this.keyPressed.keyD) {
            if (!leftPlatformSideCondition) this.mainHero.x += playerSpeed
            this.mainHero.pos = 'right'
            this.mainHero.condition = 'run'
        }
        if (this.keyPressed.keyA) {
            if (!rightPlatformSideCondition) this.mainHero.x -= playerSpeed
            this.mainHero.pos = 'left'
            this.mainHero.condition = 'run'
        }
        if (!this.keyPressed.keyD && !this.keyPressed.keyA && !this.keyPressed.space) this.mainHero.condition = 'idle'
        if (this.keyPressed.keyW) this.mainHero.jump()
    }
}