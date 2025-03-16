const sqlite = require('sqlite')
const sqlite3 = require('sqlite3')

const type = {
    STUDIO: 1,
    NETWORK: 2
}

let db

const getIntros = async () => db.all(`SELECT id, seconds FROM intros ORDER BY id ASC`)

const getId = async (id) => db.get(`SELECT id, seconds FROM intros WHERE id = ?`, id)

const insertInto = async ({ id, type, seconds, site }) => db.run(`INSERT INTO intros (id, type, seconds, site) VALUES (?, ?, ?, ?)`, id, type, seconds, site)

const updateInto = async ({ id, type, seconds, site }) => db.run(`UPDATE intros SET seconds = ?, site = ? WHERE id = ? AND type = ?`, seconds, site, id, type)

const insertIntroless = async ({ id, type, site, reason }) => db.run(`INSERT INTO introless (id, type, site, reason) VALUES (?, ?, ?, ?)`, id, type, site, reason)

const getAllIntroless = async () => db.all(`SELECT id FROM introless ORDER BY id ASC`)

const getIntroless = async (id) => db.get(`SELECT id, reason FROM introless WHERE id = ?`, id)

async function setupDb() {
    db = await sqlite.open({
        filename: './db.sqlite',
        driver: sqlite3.Database
    })
    console.log("db opened")
    // create tables
    await db.run('CREATE TABLE IF NOT EXISTS intros (id TEXT UNIQUE NOT NULL, type INT, seconds REAL, site TEXT)')
    await db.run('CREATE TABLE IF NOT EXISTS introless (id TEXT UNIQUE NOT NULL, type INT, site TEXT, reason TEXT)')
    // create indicies
    await db.run('CREATE UNIQUE INDEX IF NOT EXISTS introless_id ON introless (id)')
    await db.run('CREATE UNIQUE INDEX IF NOT EXISTS intros_id ON intros (id)')
    await db.run('CREATE UNIQUE INDEX IF NOT EXISTS intros_id_type ON intros (id, type)')
}

module.exports = {
    getIntros,
    getId,
    getIntroless,
    getAllIntroless,
    insertInto,
    updateInto,
    insertIntroless,
    setupDb,
}