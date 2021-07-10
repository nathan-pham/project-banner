const { registerFont, createCanvas, loadImage } = require("canvas")
const path = require("path")
const fs = require("fs")

const DIMENSIONS = [1200, 600]
const ALLOWED_STACK = fs.readdirSync(path.join(__dirname, "images")).map(v => v.replace(/\.png/gi, ''))
registerFont(path.join(__dirname, "fonts/sf-pro.otf"), { family: "SF Pro" })
registerFont(path.join(__dirname, "fonts/sf-pro-medium.otf"), { family: "SF Pro Medium" })

module.exports = class Badge {
    constructor(title="Untitled Project", stack=["js"], description="Created by Nathan Pham") {
        this.canvas = createCanvas(...DIMENSIONS)
        this.ctx = this.canvas.getContext("2d")

        this.title = title
        this.description = description

        this.stack = stack
            .filter(i => ALLOWED_STACK.includes(i))
            .map(i => `${i}.png`)
    }

    background(width, height) {
        const ctx = this.ctx

        const gradient = ctx.createLinearGradient(0, 0, width, height)
        gradient.addColorStop(0, "#F4C700")
        gradient.addColorStop(1, "#AB57CA")
    
        ctx.fillStyle = gradient
        ctx.clearRect(0, 0, width, height)
        ctx.fillRect(0, 0, width, height)
    }

    h1(string, x, y, { fillStyle="#FFF", strokeStyle="#000" }={} ) {
        const ctx = this.ctx

        ctx.fillStyle = fillStyle
        ctx.strokeStyle = strokeStyle
        ctx.lineWidth = 12
        ctx.font = '72px "SF Pro"'
        ctx.strokeText(string, x, y)
        ctx.fillText(string, x, y)
    }

    p(string, x, y) {
        const ctx = this.ctx

        ctx.fillStyle = "#FFF"
        ctx.font = '32px "SF Pro Medium"'
        ctx.fillText(string, x, y)
    }

    async logo(filename, x, y) {
        const ctx = this.ctx

        const image = await loadImage(path.join(__dirname, filename))
        const ratio = Math.min(60 / image.width, 60 / image.height)
        
        ctx.drawImage(image, x, y, image.width * ratio, image.height * ratio)
        return image.width * ratio
    }

    async update() {
        const ctx = this.ctx
        const [width, height] = DIMENSIONS

        this.background(width, height)

        this.h1(this.title, 200, 205, { fillStyle: "#000", strokeStyle: "#000" })
        this.h1(this.title, 200, 200)
        
        this.p(this.description, 200, 270)

        await this.logo("images/nathan-pham.png", 200, 290)

        let margin = 20
        let prevX = 255 + margin
        for(let i = 0; i < this.stack.length; i++) {
            const logo = this.stack[i]

            let imageWidth = await this.logo(`images/${logo}`, prevX, 290)
            prevX += imageWidth + margin
        }
    }

    render(res) {
        res.setHeader("Content-Type", "image/png")
        this.canvas.pngStream().pipe(res)
    }
}