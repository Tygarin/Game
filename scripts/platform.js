class Platform {
    constructor({ x = 0, y = 0, w = 200, h = 200, img = 'images/platform.png', inaccuracy = 5 }) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.img = new Image()
        this.img.src = img
        this.inaccuracy = inaccuracy
    }
    render() {
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
    }
}