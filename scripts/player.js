class Human {
    constructor({ x = 0, y = 0, w = 200, h = 170, pos = 'left' }) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.fallSpeed = fallSpeed
        this.image = new Image()
        this.pos = pos
        this.isJumped = false
        this.isShooting = false
        this.bulletPosX = 0
        this.bulletPosY = 0
        this.shootPos = ''
        this.animationCount = 0
        this.conditionState = 0
        this.bulletImg = new Image()
        this.animationInterval
    }
    init() {
        this.animationInterval = setInterval(() => {
            if (this.animationCount < this.conditionState) this.animationCount++
            else this.animationCount = 0
        }, 100)
    }
    render({ platforms }) {
        ctx.drawImage(this.image, this.x, this.y, this.w, this.h)
        const currentPlatform = platforms.find(platform =>
            this.x + this.w / 1.5 >= platform.x &&
            this.x + this.w / 2.5 <= platform.x + platform.w &&
            this.y + this.h - platform.inaccuracy < platform.y
        )
        const currentTarget = currentPlatform ? h - currentPlatform.y + currentPlatform.inaccuracy : paddingBottom
        if ((h - this.y > this.h + currentTarget)) {
            this.y += this.fallSpeed
            this.fallSpeed += gravity
        } else {
            this.fallSpeed = fallSpeed
            this.isJumped = false
        }

        if (this.isShooting) {
            this.renderBullet()
        }
    }
    shoot() {
        this.condition = 'shot'
        this.animationCount = 0
        this.isShooting = true

        if (this.pos === 'right') this.bulletPosX = this.x + this.w - 40
        else this.bulletPosX = this.x

        this.bulletPosY = this.y + 110
        this.shootPos = this.pos
    }
    renderBullet() {
        this.bulletImg.src = 'images/bullet/bullet_' + this.shootPos + '.png'
        ctx.drawImage(this.bulletImg, this.bulletPosX, this.bulletPosY, bulletSize.w, bulletSize.h)
        ctx.fillStyle = 'black'
        if (this.shootPos === 'left') this.bulletPosX -= bulletSpeed
        if (this.shootPos === 'right') this.bulletPosX += bulletSpeed
        if (this.bulletPosX >= w || this.bulletPosX < 0) this.isShooting = false
    }
    hitCondion(current) {
        if (this.bulletPosX < current.x + current.w &&
            this.bulletPosX + bulletSize.w > current.x &&
            this.bulletPosY < current.y + current.h &&
            this.bulletPosY + bulletSize.h > current.y &&
            this.isShooting) {
            this.isShooting = false
            return true
        }
        return false
    }
}

class Player extends Human {
    constructor(props) {
        super(props)
        this.health = props.health || 3
        this.condition = props.condition || 'idle'
        this.init()
    }
    init() {
        this.updateHealthBar()
        super.init()
    }
    updateHealthBar() {
        let healthBar = document.getElementById('healthBar')
        healthBar.innerHTML = ''
        for (let i = 1; i <= this.health; i++) {
            let health = document.createElement('div')
            health.className = 'healthPoint'
            healthBar.appendChild(health)
        }
    }
    jump() {
        this.isJumped = true
    }
    render(props) {
        this.conditionState = mainHeroSprites[this.pos + '_' + this.condition]?.length - 1
        if (this.health === 0) console.log('death');
        const currentImg = mainHeroSprites[this.pos + '_' + this.condition][this.animationCount]
        this.image = currentImg || mainHeroSprites[this.pos + '_' + this.condition][0]
        if (this.isJumped) this.y -= jumpPower
        super.render(props)
    }
}

class Enemy extends Human {
    constructor(props) {
        super(props)
        this.botsCondition = props.botsCondition
        this.interval
        this.w = props.w || 160
        this.condition = 'idle'
        this.init()
        this.dead = false
    }
    init() {
        if (this.botsCondition === 'shooting')
            this.interval = setInterval(() => this.shoot(), 600)
        super.init()
    }
    shoot() {
        super.shoot()
        setTimeout(() => {
            if(this.condition !== 'dead') this.condition = 'idle'
        }, 500)
    }
    render({ target, platforms }) {
        this.conditionState = enemyHeroSprites[this.pos + '_' + this.condition]?.length - 1
        if (this.botsCondition === 'shooting' && this.hitCondion(target)) {
            target.health -= 1
            target.updateHealthBar()
        }
        this.image = enemyHeroSprites[this.pos + '_' + this.condition][this.animationCount]
        super.render({ platforms })
    }
    death() {
        this.condition = 'dead'
        clearInterval(this.animationInterval)
        this.animationCount = 0
        this.animationInterval = setInterval(() => {
            if (this.animationCount === enemyHeroSprites[this.pos + '_' + this.condition].length - 2) {
                clearInterval(this.animationInterval)
                this.dead = true
                this.w = 0
                this.h = 0
            }
            const currentImg = enemyHeroSprites[this.pos + '_' + this.condition][this.animationCount]
            this.image = currentImg
            this.animationCount++
        }, 100)
        clearInterval(this.interval)
    }
}