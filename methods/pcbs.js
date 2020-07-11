var pcbsData = require('/home/ubuntu/Documents/keyboardapi/data/pcbs.json')
module.exports = {

	execute(router) {      
        router.get('/pcbs', function (req, res) {
			//console.log(req.query.id);
			getPCBData(req,res)
		});
		router.post('/pcbs', function (req, res) {
			postPCBsData(req,res)
		});
	},
};


function searchSizeHotswap(term) {
    return pcbsData.pcbs.filter(({size,hotswappable}) => {
        return (size === term.size &&  String(hotswappable) === term.hotswappable)

    })
}
function searchSizeRGBSwitch(term) {
    return pcbsData.pcbs.filter(({size,rgbswitch}) => {
        return (size === term.size &&  String(rgbswitch) === term.rgbswitch)

    })
}
function searchSizeRGBUnderglow(term) {
    return pcbsData.pcbs.filter(({size,rgbunderglow}) => {
        return (size === term.size &&  String(rgbunderglow) === term.rgbunderglow)

    })
}
function searchRGBSwitchRGBUnderglow(term) {
    return pcbsData.pcbs.filter(({rgbswitch,rgbunderglow}) => {
        return (String(rgbswitch) === term.rgbswitch &&  String(rgbunderglow) === term.rgbunderglow)

    })
}
function searchSizeManufacturer(term) {
    return pcbsData.pcbs.filter(({size,manufacturer}) => {
        return (size === term.size &&  manufacturer === term.manufacturer)

    })
}
function getPCBData(req,res) {
    var data = {
        "pcbs": pcbsData.pcbs,
        "total": pcbsData.pcbs.length,
        "count": pcbsData.pcbs.length
    }
    var dataArray = [];

    if (req.query != undefined) {

        //Size and Manufacturer
        if(req.query.size != null && req.query.manufacturer != null
        && Object.keys(req.query).length == 2){
            let items = searchSizeManufacturer(req.query)
                for(var i = 0; i < items.length; i++){
                    dataArray.push(items[i])
                }
        }
        //Size and Hotswap
        else if(req.query.size != null && req.query.hotswappable != null
        && Object.keys(req.query).length == 2){
            let items = searchSizeHotswap(req.query)
                for(var i = 0; i < items.length; i++){
                    dataArray.push(items[i])
                }
        }
        //Size and RGB switch
        else if(req.query.size != null && req.query.rgbswitch != null 
        && Object.keys(req.query).length == 2){
            let items = searchSizeRGBSwitch(req.query)
                for(var i = 0; i < items.length; i++){
                    dataArray.push(items[i])
                }
        }
        //Size and RGB Underglow
        else if(req.query.size != null && req.query.rgbunderglow != null 
        && Object.keys(req.query).length == 2){
            let items = searchSizeRGBUnderglow(req.query)
                for(var i = 0; i < items.length; i++){
                    dataArray.push(items[i])
                }
        }
        //RGB switch and RGB underglow 
        else if(req.query.rgbswitch != null && req.query.rgbunderglow != null
        && Object.keys(req.query).length == 2 ){
            let items = searchRGBSwitchRGBUnderglow(req.query)
                for(var i = 0; i < items.length; i++){
                    dataArray.push(items[i])
                }
        }
        //ID
        else if (req.query.id != null && Object.keys(req.query).length == 1) {
            data.pcbs.find(element => {
                if (element.id == req.query.id) {
                    dataArray.push(element)
                }
            })
        }
        //Manufacturer
       else if (req.query.manufacturer != null && Object.keys(req.query).length == 1) {
            data.pcbs.find(element => {
                if (element.manufacturer === req.query.manufacturer) {
                    dataArray.push(element)
                }
            })

        }
        //Size
        else if (req.query.size != null && Object.keys(req.query).length == 1) {
            data.pcbs.find(element => {
                if (element.size === req.query.size) {
                    dataArray.push(element)
                }
            })

        }
        //Hotswappable
        else if (req.query.hotswappable != null && Object.keys(req.query).length == 1) {
            console.log(req.query.hotswappable)
            data.pcbs.find(element => {
                console.log(element.hotswappable)
                if (String(element.hotswappable) === req.query.hotswappable) {

                    dataArray.push(element)
                }
            })

        }
        //RGB Switch
        else if (req.query.rgbswitch != null && Object.keys(req.query).length == 1) {
            data.pcbs.find(element => {
                if (String(element.rgbswitch) === req.query.rgbswitch) {
                    dataArray.push(element)
                }
            })

        }
        //RGBUnder
        else if (req.query.rgbunderglow != null && Object.keys(req.query).length == 1) {
            data.pcbs.find(element => {
                if (String(element.rgbunderglow) === req.query.rgbunderglow) {
                    dataArray.push(element)
                }
            })

        }
        
        if (dataArray.length > 0) {
            var Obj = {
                "pcbs": dataArray,
                "total": pcbsData.pcbs.length,
                "count": dataArray.length

            }
			res.json(Obj)
			return;
        }
    }

	res.json(data)
	return;
}


function postPCBsData(req, res) {
    fs.readFile('./data/pcbs.json', 'utf8', function (err, data) {
        if (err) {
            console.log(err)
        } else {
            const file = JSON.parse(data);
            for (var i = 0; i < file.pcbs.length; i++) {
                if (file.pcbs[i].id == req.body.id) {
                    console.log("ID already exist: " + req.body.id + " " + i);
                    return res.send("ID ALREADY EXIST");
                }
                if (file.pcbs[i].name == req.body.name && file.pcbs[i].material == req.body.material && file.pcbs[i].manufacturer == req.body.manufacturer) {
                    console.log("PCB already exist: " + file.pcbs[i]);
                    return res.send("ID ALREADY EXIST");
                }
            }

            file.pcbs.push(req.body)


            const json = JSON.stringify(file);

            fs.writeFile('./data/pcbs.json', json, 'utf8', function (err) {
                if (err) console.log(err);

            });
            return res.send("PCB Inputted");
        }

    });
}