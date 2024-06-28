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
        res.send({ studios, networks })
    })
    app.get("/:type", async (req, res) => {
        const idType = getType(req.params.type)
        if (!idType) return res.status(400).send('invalid type')
        const data = await db.getIntroType(req.params.type)
        res.send(data)
    })
    app.get("/:type/:id", async (req, res) => {
        const idType = getType(req.params.type)
        if (!idType) return res.status(400).send('invalid type')
        const data = await db.getId(idType, id)
        if (!data) return res.status(404).send('not found')
        res.send(data)
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
    const studios = await db.getIntroType(1)
    const networks = await db.getIntroType(2)
    app.listen({ port: 3000 }, () => {
        console.log(`server listening on ${app.server.address().port}`)
    })
}
main()