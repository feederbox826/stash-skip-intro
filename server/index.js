const fastify = require('fastify')
const cors = require('@fastify/cors')
const app = fastify()
const db = require('./db')

function getType(type) {
    // check if it's in the array
    const types = ["studio", "network"]
    if (!types.includes(type)) {
        return false
    }
    // return studio or network
    return type === "studio" ? 1 : 2
}

// module imports
async function main() {
    app.register(cors, {
        origin: '*',
        methods: ['GET', 'POST']
    })
    app.get("/all", async (req, res) => {
        const introless = await db.getAllIntroless()
        const intros = await db.getIntros()
        res.send({ intros, introless })
    })
    app.get("/id/:id", async (req, res) => {
        const data = await db.getId(id)
        if (!data) return res.status(404).send('not found')
        res.send(data)
    })
    app.post("/introless", async (req, res) => {
        const { type, id, site, reason } = req.query
        const idType = getType(type)
        db.insertIntroless({ id, type: idType, site, reason })
        res.send('inserted')
    })
    app.post("/insert", async (req, res) => {
        const { type, id, seconds, site } = req.query
        const idType = getType(type)
        if (!idType) return res.status(400).send('invalid type')
        if (!id || !seconds || !site) {
            res.status(400).send('invalid data')
        }
        // check if exists
        const exists = await db.getId(idType, id)
        if (exists) {
            console.log(exists)
            if (exists.seconds == seconds) return res.status(409).send('already exists')
            // update if new
            await db.updateInto({ id, type: idType, seconds, site})
            return res.send('updated')
        }
        await db.insertInto({ id, type: idType, seconds, site})
        res.send('inserted')
    })

    // setup db
    await db.setupDb()
    app.listen({ port: 3000 }, () => {
        console.log(`server listening on ${app.server.address().port}`)
    })
}
main()