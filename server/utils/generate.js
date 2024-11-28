const axios = require("axios")
const fs = require("fs")
const filepath = "../intros.json"

axios({
    url: "http://localhost:3000/all",
    method: "GET",
}).then(res => {
    const intros = {}
    res.data.intros.forEach(studio => {
        intros[studio.id] = studio.seconds
    })
    fs.writeFileSync(filepath, JSON.stringify(intros))
    fs.writeFileSync("../intros-pretty.json", JSON.stringify(intros, null, 2))
})