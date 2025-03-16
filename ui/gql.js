function gqlClient(instance, query, variables) {
  const options = {
      method: "POST",
      headers: { "ApiKey": instance.apikey, "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables })
  };
  return fetch(`${instance.host}/graphql`, options)
      .then(response => response.json())
      .then(data => data.data);
}