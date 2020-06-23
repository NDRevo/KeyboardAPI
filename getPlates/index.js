
var platesData = require('./plates.json')


exports.handler = async (event) => {

    if (event.httpMethod === 'GET') {
        // return {
        //     statusCode: 200,
        //     body: JSON.stringify(event)
        // }
    return getPlatesData(event)

    }
};

function searchManufacturerSize(term) {
    return platesData.plates.filter(({manufacturer, size}) => {
        return (manufacturer === term.manufacturer && size === term.size)

    })
}
function searchManufacturerMaterial(term) {
    return platesData.plates.filter(({manufacturer, material}) => {
        return (manufacturer === term.manufacturer && material === term.material)

    })
}
function searchSizeMaterial(term) {
    return platesData.plates.filter(({size, material}) => {
        return (material === term.material && size === term.size)

    })
}
function searchSizeMaterialManufacturer(term) {
    return platesData.plates.filter(({size, material, manufacturer}) => {
        return (material === term.material && size === term.size && manufacturer === term.manufacturer)

    })
}

function getPlatesData(event) {
    var data = {
        "plates": platesData.plates,
        "total": platesData.plates.length,
        "count": platesData.plates.length
    }
    var dataArray = [];


    
    if (event.queryStringParameters != undefined) {

        //ID
        if (event.queryStringParameters.id != null && Object.keys(event.queryStringParameters).length == 1) {
            data.plates.find(element => {
                if (element.id == event.queryStringParameters.id) {
                    dataArray.push(element)
                }
            })
        }
        //Size Material Manufacturer
        else if (
            event.queryStringParameters.size != null 
        && event.queryStringParameters.material != null 
        && event.queryStringParameters.manufacturer != null && Object.keys(event.queryStringParameters).length == 3){
            
                let items = searchSizeMaterialManufacturer(event.queryStringParameters)
                for(var i = 0; i < items.length; i++){
                    dataArray.push(items[i])
                }
        }
        //Manufacturer Size
        else if (event.queryStringParameters.manufacturer != null && event.queryStringParameters.size != null
        && Object.keys(event.queryStringParameters).length == 2) {
            
                let items = searchManufacturerSize(event.queryStringParameters)
                for(var i = 0; i < items.length; i++){
                    dataArray.push(items[i])
                }
        }
        //Manufacturer and Material
        else if (event.queryStringParameters.manufacturer != null && event.queryStringParameters.material != null
        && Object.keys(event.queryStringParameters).length == 2) {
            
                let items = searchManufacturerMaterial(event.queryStringParameters)
                for(var i = 0; i < items.length; i++){
                    dataArray.push(items[i])
                }
        }
        //Size and Material
        else if (event.queryStringParameters.size != null && event.queryStringParameters.material != null
        && Object.keys(event.queryStringParameters).length == 2) {
            
                let items = searchSizeMaterial(event.queryStringParameters)
                for(var i = 0; i < items.length; i++){
                    dataArray.push(items[i])
                }
        }
        //Manufacturer
        else if (event.queryStringParameters.manufacturer != null && Object.keys(event.queryStringParameters).length == 1) {
            data.plates.find(element => {
                if (element.manufacturer === event.queryStringParameters.manufacturer) {
                    dataArray.push(element)
                }
            })

        }
        //Size
        else if (event.queryStringParameters.size != null && Object.keys(event.queryStringParameters).length == 1) {
            data.plates.find(element => {
                if (element.size === event.queryStringParameters.size) {
                    dataArray.push(element)
                }
            })

        }
        //Material
        else if (event.queryStringParameters.material != null && Object.keys(event.queryStringParameters).length == 1) {
            data.plates.find(element => {
                if (element.material === event.queryStringParameters.material) {
                    dataArray.push(element)
                }
            })

        }


        if (dataArray.length > 0) {
            var Obj = {
                "plates": dataArray,
                "total": platesData.plates.length,
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