const findStashID = (stashids) => stashids.find(id => id.endpoint == "https://stashdb.org/graphql").stash_id

const allStudios = findCandidateStudios()
  .then(studios => studios.filter(s => s.scene_count > 2))
  .then(studios => studios.map(s => ({
    id: s.id,
    name: s.name,
    stashid: findStashID(s.stash_ids),
    parentstashid: s?.parent_studio ? findStashID(s.parent_studio.stash_ids) : null,
    url: s.url,
    scene_count: s.scene_count,
  })))

const existingStudios = fetch("http://localhost:3000/all")
  .then(res => res.json())

async function missingStudios() {
  const candidateStudios = await allStudios
  const existingIntros = await existingStudios
  const introless = existingIntros.introless.map(i => i.id)
  const skipIntros = existingIntros.intros.map(i => i.id)
  const allIntros = [...introless, ...skipIntros]
  return candidateStudios.filter(s => !(allIntros.includes(s.stashid) || allIntros.includes(s.parentstashid)))
}

async function createIntroless(studio) {
  const elem = document.createElement("a")
  elem.href = `${stashapp.host}/studios/${studio.id}`
  elem.textContent = `${studio.name} - ${studio.scene_count}`
  document.body.appendChild(elem)
  document.body.appendChild(document.createElement("br"))
}

async function main() {
  const introless = await missingStudios()
  const count = introless.length
  const countElem = document.createElement("h2")
  countElem.textContent = `Found ${count} introless studios`
  document.body.appendChild(countElem)
  for (const studio of introless) {
    await createIntroless(studio)
  }
}

main()