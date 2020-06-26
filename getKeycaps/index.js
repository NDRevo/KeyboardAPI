var keycapsData = require('./keycaps.json')

exports.handler = async (event) => {

    if (event.httpMethod === 'GET') {
        // return {
        //     statusCode: 200,
        //     body: JSON.stringify(event)
        // }
        return getKeycapsData(event)

    }
};

function getKeycapsData(event) {
    var data = {
        "keycaps": keycapsData.keycaps,
        "total": keycapsData.keycaps.length,
        "count": keycapsData.keycaps.length
    }
    var dataArray = [];

    if (event.queryStringParameters != undefined) {

        if (event.queryStringParameters.id != null) {
            data.keycaps.find(element => {
                if (element.id == event.queryStringParameters.id) {
                    dataArray.push(element)
                }
            })
        }

        if (event.queryStringParameters.manufacturer != null) {
            data.keycaps.find(element => {
                if (element.manufacturer === event.queryStringParameters.manufacturer) {
                    dataArray.push(element)
                }
            })

        }
        if (event.queryStringParameters.profile != null) {
            data.keycaps.find(element => {
                if (element.profile === event.queryStringParameters.profile) {
                    dataArray.push(element)
                }
            })

        }


        if (dataArray.length > 0) {
            var Obj = {
                "keycaps": dataArray,
                "total": keycapsData.keycaps.length,
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