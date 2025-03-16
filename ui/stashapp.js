const findStudioQuery = `
query {
  findStudios (
    filter: { per_page: -1 }
    studio_filter: {
      stash_id_endpoint: {
        modifier: NOT_NULL
        endpoint: "https://stashdb.org/graphql"
  }}) {
    studios {
      stash_ids { stash_id endpoint }
      parent_studio {
        id name url
        stash_ids { stash_id endpoint }
      }
      id url name scene_count
  }}}`

const findCandidateStudios = () =>
  gqlClient(stashapp, findStudioQuery, {})
    .then(data => data.findStudios.studios);
