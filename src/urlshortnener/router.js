const {Router} = require("express")
const dns = require("dns");
const Memory = require("../memory/Memory");

const urlShortnenerRouter = Router();
const memory = new Memory();

function checkUrl(url) {
    const hostname = new URL(url).hostname;

    return new Promise((resolve, reject) => {
        dns.lookup(hostname, (error, addresses) => {
            if (error) {
                reject(new Error("Invalid url"));
            } else {
                resolve(addresses);
            }
        });
    });
}

urlShortnenerRouter.post('/', async (req, res) => {
    const url = req.body.url;

    try {
        await checkUrl(url)
        const id = memory.save(url);

        return res.json({
            original_url: url,
            short_url: id
        })
    } catch(e) {
        return res.json({error: "Invalid URL"})
    }
})

urlShortnenerRouter.get('/:id', (req, res) => {
    try {
        const urlId = req.params.id;
        const url = memory.get(urlId)

        if(!url) {
            throw new Error()
        }

        res.redirect(url)
    } catch (e) {
        return res.json({error: "Invalid URL"})
    }
})

module.exports = urlShortnenerRouter