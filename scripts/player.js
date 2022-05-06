class Human {
    constructor({ x = 0, y = 0, w = 200, h = 170, currentSprite }) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.fallSpeed = fallSpeed
        this.image = new Image()
        this.currentSprite = currentSprite
        this.isJumped = false
    }
    _render() {
        this.image.src = this.currentSprite
        ctx.drawImage(this.image, this.x, this.y, this.w, this.h)
        if (h - this.y >= this.h) {
            this.y += this.fallSpeed
            this.fallSpeed += gravity
        } else {
            this.fallSpeed = fallSpeed
            this.isJumped = false
        }
    }
    shoot() {
        ctx.fillStyle = 'black'
        ctx.fillRect(this.x, this.y, 100, 500)
    }
}

class Player extends Human {
    constructor(props) {
        super(props)
    }
    jump() {
        this.isJumped = true
    }
    render() {
        if (this.isJumped) sync.y -= 7
        this._render()
    }
}

class Enemy extends Human {
    constructor(props) {
        super(props)
    }
    render() {
        this._render()
    }
}