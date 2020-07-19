var casesData = require('/home/ubuntu/Documents/keyboardapi/data/cases.json')
module.exports = {

	execute(router) {      
        router.get('/cases', function (req, res) {
			//console.log(req.query.id);
			getCaseData(req,res)
        });
        router.get('/cases/:id(\\d+)/', function (req, res) {
            req.query = req.params;
            getCaseData(req, res);

        });
        router.get('/cases/:manufacturer(KBDFans)', function (req, res) {
            req.query = req.params;
            getCaseData(req, res);
            
        });
        router.get('/cases/:material(aluminium|wood|bamboo|plastic|acrylic|)', function (req, res) {
            req.query = req.params;
            getCaseData(req, res);
            
        });

        router.get('/cases/:null', function (req, res) {
            var data = {
                "status": "error",
                "msg": "none found",
                "total": casesData.cases.length,
                "count": 0
            }
            res.json(data); 
        });
        

	},
};

//Manufacturer, Size, Material
function searchManufacturerSize(term) {
    return casesData.cases.filter(({manufacturer, size}) => {
        return (manufacturer.toUpperCase() === term.manufacturer.toUpperCase() && size === term.size)

    })
}

function searchManufacturerMaterial(term) {
    return casesData.cases.filter(({manufacturer, material}) => {
        return (manufacturer.toUpperCase() === term.manufacturer.toUpperCase() && material.toUpperCase() === term.material.toUpperCase())

    })
}

function searchSizeMaterial(term) {
    return casesData.cases.filter(({size, material}) => {
        return (material.toUpperCase() === term.material.toUpperCase() && size === term.size)

    })
}

function searchSizeMaterialManufacturer(term) {
    return casesData.cases.filter(({size, material, manufacturer}) => {
        return (material.toUpperCase() === term.material.toUpperCase() && size === term.size && manufacturer.toUpperCase() === term.manufacturer.toUpperCase())

    })
}

function getCaseData(req, res) {
    var data = {
        "cases": casesData.cases,
        "total": casesData.cases.length,
        "count": casesData.cases.length
    }
    var dataArray = [];


    if (req.query != undefined || req.query != {}) {

        //ID
        if (req.query.id != null && Object.keys(req.query).length == 1) {
            data.cases.find(element => {
                if (element.id == req.query.id) {
                    dataArray.push(element)
                }
            })
        }
        //Size & Material & Manufacturer
        else if (
            req.query.size != null
            && req.query.material != null
            && req.query.manufacturer != null && Object.keys(req.query).length == 3) {

            let items = searchSizeMaterialManufacturer(req.query)
            for (var i = 0; i < items.length; i++) {
                dataArray.push(items[i])
            }
        }
        //Manufacturer & Size
        else if (req.query.manufacturer != null && req.query.size != null
            && Object.keys(req.query).length == 2) {

            let items = searchManufacturerSize(req.query)
            for (var i = 0; i < items.length; i++) {
                dataArray.push(items[i])
            }
        }
        //Manufacturer & Material 
        else if (req.query.manufacturer != null && req.query.material != null
            && Object.keys(req.query).length == 2) {

            let items = searchManufacturerMaterial(req.query)
            for (var i = 0; i < items.length; i++) {
                dataArray.push(items[i])
            }
        }
        //Size & Material
        else if (req.query.size != null && req.query.material != null
            && Object.keys(req.query).length == 2) {

            let items = searchSizeMaterial(req.query)
            for (var i = 0; i < items.length; i++) {
                dataArray.push(items[i])
            }
        }
        //Manufacturer
        else if (req.query.manufacturer != null && Object.keys(req.query).length == 1) {
            data.cases.find(element => {
                if (element.manufacturer.toUpperCase() === req.query.manufacturer.toUpperCase()) {
                    dataArray.push(element)
                }
            })

        }
        //Size
        else if (req.query.size != null && Object.keys(req.query).length == 1) {
            data.cases.find(element => {
                if (element.size === req.query.size) {
                    dataArray.push(element)
                }
            })

        }
        //Material
        else if (req.query.material != null && Object.keys(req.query).length == 1) {
            data.cases.find(element => {
                if (element.material.toUpperCase() === req.query.material.toUpperCase()) {
                    dataArray.push(element)
                }
            })

        }

        if (dataArray.length > 0) {
            var Obj = {
                "case": dataArray,
                "total": casesData.cases.length,
                "count": dataArray.length
            }
			
			res.json(Obj);
			return;
        }
    }

    res.json(data);
	return;
}



function postCasesData(req, res) {
    fs.readFile('./data/cases.json', 'utf8', function (err, data) {
        if (err) {
            console.log(err)
        } else {
            const file = JSON.parse(data);
            for (var i = 0; i < file.cases.length; i++) {
                if (file.cases[i].id == req.body.id) {
                    console.log("ID already exist: " + req.body.id + " " + i);
                    return res.send("ID ALREADY EXIST");
                }
                if (file.cases[i].name == req.body.name && file.cases[i].material == req.body.material && file.cases[i].manufacturer == req.body.manufacturer) {
                    console.log("Case already exist: " + file.cases[i]);
                    return res.send("ID ALREADY EXIST");
                }
            }

            file.cases.push(req.body)


            const json = JSON.stringify(file);

            fs.writeFile('./data/cases.json', json, 'utf8', function (err) {
                if (err) console.log(err);

            });
            return res.send("Cases Inputted");
        }

    });
}
