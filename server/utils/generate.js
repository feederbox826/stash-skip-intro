const axios = require("axios")
const fs = require("fs")
const filepath = "../intros.js"

axios({
    url: "http://localhost:3000/all",
    method: "GET",
}).then(res => {
    const intros = res.data
    const studios = {}
    intros.studios.forEach(studio => {
        studios[studio.id] = studio.seconds
    })
    const networks = {}
    intros.networks.forEach(network => {
        networks[network.id] = network.seconds
    })
    const fileContents = `const studios = ${JSON.stringify(studios)}\nconst networks = ${JSON.stringify(networks)}`
    fs.writeFileSync(filepath, fileContents)
})