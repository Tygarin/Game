class Platform {
    constructor({ x = 0, y = 0, w = 200, h = 100, img = 'images/platform.png' }) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.img = new Image()
        this.img.src = img
    }
    render() {
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
    }
}