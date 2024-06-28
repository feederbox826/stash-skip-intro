const fs = require("fs")
const axios = require("axios")

const introfile = "../intros.js"
const fileContents = fs.readFileSync(introfile)

const lines = fileContents.toString().split("\n")
lines.forEach(line => {
    console.log(line)
    // trim
    line = line.trim()
    // extract the id
    const id = line.split('"')[1]
    const seconds = line.split(": ")[1].split(",")[0]
    const site = line.split("// ")[1]
    //console.log(id, seconds, site)
    // insert into db
    axios({
        url: "http://localhost:3000/insert",
        method: "POST",
        data: "",
        headers: { "Content-Type": "application/json" },
        params: {
            type: "network",
            id,
            seconds,
            site,
        },
    })
})