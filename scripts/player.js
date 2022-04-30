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
    }
    _render() {
        ctx.drawImage(this.image, this.x, this.y, this.w, this.h)
        if (h - this.y >= this.h) {
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
        this.isShooting = true

        if (this.pos === 'right') this.bulletPosX = this.x + this.w - 40
        else this.bulletPosX = this.x

        this.bulletPosY = this.y + 110
        this.shootPos = this.pos
    }
    renderBullet() {
        ctx.fillStyle = 'black'
        ctx.fillRect(this.bulletPosX, this.bulletPosY, bulletSize, bulletSize)
        if (this.shootPos === 'left') this.bulletPosX -= bulletSpeed
        if (this.shootPos === 'right') this.bulletPosX += bulletSpeed
        if (this.bulletPosX >= w || this.bulletPosX < 0) this.isShooting = false
    }
    hitCondion(current) {
        if (this.bulletPosX - current.x <= bulletSize &&
            this.bulletPosX - current.x > 0 &&
            this.bulletPosY - current.y <= current.h &&
            this.bulletPosY - current.y > 0 &&
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
        this.conditionState = 0
        this.animationCount = 0
    }
    init() {
        this.updateHealthBar()
        console.log(this.conditionState);
        setInterval(() => {
            if (this.animationCount < this.conditionState) this.animationCount++
            else this.animationCount = 0
        }, 100)
    }
    shoot() {
        this.condition = 'shot'
        this.animationCount = 0
        super.shoot()
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
    render() {
        this.conditionState = mainHeroSprites[this.pos + '_' + this.condition]?.length - 1
        // console.log(this.conditionState);
        if (this.health === 0) console.log('death');
        const currentImg = mainHeroSprites[this.pos + '_' + this.condition][this.animationCount]
        this.image = currentImg || mainHeroSprites[this.pos + '_' + this.condition][0]
        if (this.isJumped) this.y -= 10
        this._render()
    }
}

class Enemy extends Human {
    constructor(props) {
        super(props)
        this.condition = props.botsCondition
        this.interval
    }
    init() {
        if (this.condition === 'shooting')
            this.interval = setInterval(() => this.shoot(), 1000)
    }
    render(target) {
        if (this.condition === 'shooting' && this.hitCondion(target)) {
            console.log(target.health);
            target.health -= 1
            target.updateHealthBar()
        }
        this.image.src = enemyHero[this.pos]
        this._render()
    }
    death() {
        clearInterval(this.interval)
        this.w = 0
        this.h = 0
    }
}