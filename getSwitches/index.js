var switchesData = require('./switches.json')

exports.handler = async (event) => {

    if (event.httpMethod === 'GET') {
        // return {
        //     statusCode: 200,
        //     body: JSON.stringify(event)
        // }
        return getSwitchData(event)
    }
};

function search(term) {
    return switchesData.switches.filter(({manufacturer, type}) => {
        return (manufacturer === term.manufacturer && type === term.type)

    })
}

function getSwitchData(event) {
    var data = {
        "switches": switchesData.switches,
        "total": switchesData.switches.length,
        "count": switchesData.switches.length
    }
    var dataArray = [];

    if (event.queryStringParameters != undefined) {
        if (event.queryStringParameters.id != null && Object.keys(event.queryStringParameters).length == 1) {
            data.switches.find(element => {
                if (element.id == event.queryStringParameters.id) {
                    dataArray.push(element)
                }
            })
        } else if (event.queryStringParameters.manufacturer != null && event.queryStringParameters.type != null
            && Object.keys(event.queryStringParameters).length == 2) {
            let items = search(event.queryStringParameters)
            for (var i = 0; i < items.length; i++) {
                dataArray.push(items[i])
            }
        } else if (event.queryStringParameters.manufacturer != null && Object.keys(event.queryStringParameters).length == 1) {
            data.switches.find(element => {
                if (element.manufacturer === event.queryStringParameters.manufacturer) {
                    dataArray.push(element)
                }
            })

        } else if (event.queryStringParameters.type != null && Object.keys(event.queryStringParameters).length == 1) {
            data.switches.find(element => {
                if (element.type === event.queryStringParameters.type) {
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
            return {
                statusCode: 200,
                body: JSON.stringify(Obj)
            }
        }
    }

    return {
        statusCode: 200,
        body: JSON.stringify(data)
    }
}

