const studioQuery = `query ($id: ID!) {
  findStudio(id: $id) {
    name
    urls { url }
  }}`

const queryStudio = (studioid) =>
  gqlClient(stashdb, studioQuery, { id: studioid })
    .then(data => data.findStudio)