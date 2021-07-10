const { registerFont, createCanvas } = require("canvas")
const path = require("path")
const fs = require("fs")

const DIMENSIONS = [1200, 600]
registerFont(path.join(__dirname, "sf-pro.otf"), { family: "SF Pro" })

const h1 = (ctx, string, x, y, { fillStyle="#FFF", strokeStyle="#000" }={}) => {
    ctx.fillStyle = fillStyle
    ctx.strokeStyle = strokeStyle
    ctx.lineWidth = 12
    ctx.font = '72px "SF Pro"'
    ctx.strokeText(string, x, y)
    ctx.fillText(string, x, y)
}

module.exports = class Badge {
    constructor(title="Untitled Project", stack=[], description="Created by Nathan Pham") {
        this.canvas = createCanvas(...DIMENSIONS)
        this.ctx = this.canvas.getContext("2d")

        this.title = title
        this.stack = stack
        this.description = description

        this.update()
    }

    background(width, height) {
        const ctx = this.ctx

        ctx.clearRect(0, 0, width, height)

        const gradient = ctx.createLinearGradient(0, 0, width, height)
        gradient.addColorStop(0, "#F4C700")
        gradient.addColorStop(1, "#AB57CA")
    
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, width, height)
    }

    update() {
        const ctx = this.ctx
        const [width, height] = DIMENSIONS

        this.background(width, height)

        h1(ctx, this.title, 200, 210, { fillStyle: "#000", strokeStyle: "#000" })
        h1(ctx, this.title, 200, 200)
        
        // // Fill with gradient
// ctx.fillStyle = grd;
// ctx.fillRect(10, 10, 150, 80);

    }

    render(res) {
        res.setHeader("Content-Type", "image/png")
        this.canvas.pngStream().pipe(res)
    }

    // res.setHeader('Content-Type', 'image/png');
    // draw().pngStream().pipe(res)
}