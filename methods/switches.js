var switchesData = require('/home/ubuntu/Documents/keyboardapi/data/switches.json')
module.exports = {

	execute(router) {      
        router.get('/switches', function (req, res) {
			getSwitchData(req, res);
			
		});
		router.post('/switches', function (req, res) {
			res.json({ message: "POSTED!" })
		});
	},
};



function search(term) {
    return switchesData.switches.filter(({manufacturer, type}) => {
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

