const express = require("express")
const Badge = require("./badge")

const app = express()
const port = 8080

app.get('/', async (req, res) => {
    const badge = new Badge(req.query.title, (req.query.stack || 'js').split(','), req.query.description)
    await badge.update()
    badge.render(res)
})

app.listen(port, () => {
    console.log(`app hosted on http://localhost:${port}`)
})