const { registerFont, createCanvas } = require("canvas")
const path = require("path")
const fs = require("fs")

const DIMENSIONS = [1200, 600]
registerFont(path.join(__dirname, "fonts/sf-pro.otf"), { family: "SF Pro" })
registerFont(path.join(__dirname, "fonts/sf-pro-medium.otf"), { family: "SF Pro Medium" })

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

    update() {
        const ctx = this.ctx
        const [width, height] = DIMENSIONS

        this.background(width, height)

        this.h1(this.title, 200, 210, { fillStyle: "#000", strokeStyle: "#000" })
        this.h1(this.title, 200, 200)
        
        this.p(this.description, 200, 285)
    }

    render(res) {
        res.setHeader("Content-Type", "image/png")
        this.canvas.pngStream().pipe(res)
    }

    // res.setHeader('Content-Type', 'image/png');
    // draw().pngStream().pipe(res)
}