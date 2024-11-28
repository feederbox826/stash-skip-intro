const queue = require("../queue.json")
const studios = queue.data.findStudios.studios
const fs = require("fs")
const db = require('./db')

async function main() {
  await db.setupDb()
  const exportQueue = []
  for (const studio of studios) {
    // check studio
    const sdbID = studio.stash_ids.find(id => id.endpoint == "https://stashdb.org/graphql")
    const introMatch = await db.getId(sdbID.stash_id)
    if (introMatch) {
      continue
    }
    const introlessMatch = await db.getIntroless(sdbID.stash_id)
    if (introlessMatch) {
      continue
    }
    // check parent
    if (studio.parent_studio) {
      const pdbID = studio.parent_studio.stash_ids.find(id => id.endpoint == "https://stashdb.org/graphql")
      const introMatch = await db.getId(pdbID.stash_id)
      if (introMatch) {
        continue
      }
      const introlessMatch = await db.getIntroless(pdbID.stash_id)
      if (introlessMatch) {
        continue
      }
    }
    // if just parent network
    if (studio.scene_count == 0) continue
    exportQueue.push(studio)
  }
  // list it
  fs.writeFileSync("queue-filtered.json", JSON.stringify(exportQueue, null, 2))
  console.log(exportQueue.length)
}
main()