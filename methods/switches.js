var switchesData = require('/home/ubuntu/Documents/keyboardapi/data/switches.json')
let fs = require('fs');

module.exports = {

    execute(router) {
        router.get('/switches', function (req, res) {
            getSwitchData(req, res);

        });
        router.post('/switches', function (req, res) {

            postSwitchData(req, res)
            return;
        });
    },
};

function search(term) {
    return switchesData.switches.filter(({ manufacturer, type }) => {
        return (manufacturer === term.manufacturer && type === term.type)

    })
}

function getSwitchData(req, res) {
    var data = {
        "switches": switchesData.switches,
        "total": switchesData.switches.length,
        "count": switchesData.switches.length
    }
    var dataArray = [];

    if (req.query != undefined || req.query != {}) {
        if (req.query.id != null && Object.keys(req.query).length == 1) {
            data.switches.find(element => {
                if (element.id == req.query.id) {
                    dataArray.push(element)
                }
            })
        } else if (req.query.manufacturer != null && req.query.type != null
            && Object.keys(req.query).length == 2) {
            let items = search(req.query)
            for (var i = 0; i < items.length; i++) {
                dataArray.push(items[i])
            }
        } else if (req.query.manufacturer != null && Object.keys(req.query).length == 1) {
            data.switches.find(element => {
                if (element.manufacturer === req.query.manufacturer) {
                    dataArray.push(element)
                }
            })

        } else if (req.query.type != null && Object.keys(req.query).length == 1) {
            data.switches.find(element => {
                if (element.type === req.query.type) {
                    dataArray.push(element)
                }
            })

        }

        if (dataArray.length > 0) {
            var Obj = {
                "switches": dataArray,
                "total": switchesData.switches.length,
                "count": dataArray.length
            }

            res.json(Obj);
            return;

        }
    }

    res.json(data);
    return;

}

function postSwitchData(req, res) {
    fs.readFile('./data/switches.json', 'utf8', function (err, data) {
        if (err) {
            console.log(err)
        } else {
            const file = JSON.parse(data);
            for (var i = 0; i < file.switches.length; i++) {
                if (file.switches[i].id == req.body.id) {
                    console.log("ID already exist: " + req.body.id + " " + i);
                    return res.send("ID ALREADY EXIST");
                }
                if (file.switches[i].name == req.body.name && file.switches[i].type == req.body.type && file.switches[i].manufacturer == req.body.manufacturer) {
                    console.log("Switch already exist: " + file.switches[i]);
                    return res.send("ID ALREADY EXIST");
                }
            }

            file.switches.push(req.body)


            const json = JSON.stringify(file);

            fs.writeFile('./data/switches.json', json, 'utf8', function (err) {
                if (err) console.log(err);

            });
            return res.send("Switch Inputted");
        }

    });
}

