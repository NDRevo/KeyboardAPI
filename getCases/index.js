var casesData = require('./cases.json')



exports.handler = async (event) => {

    if (event.httpMethod === 'GET') {
        // return {
        //     statusCode: 200,
        //     body: JSON.stringify(event)
        // }
   
        return getCaseData(event)

    }
};
//Manufacturer, Size, Material


function searchManufacturerSize(term) {
    return casesData.cases.filter(({manufacturer, size}) => {
        return (manufacturer === term.manufacturer && size === term.size)

    })
}
function searchManufacturerMaterial(term) {
    return casesData.cases.filter(({manufacturer, material}) => {
        return (manufacturer === term.manufacturer && material === term.material)

    })
}
function searchSizeMaterial(term) {
    return casesData.cases.filter(({size, material}) => {
        return (material === term.material && size === term.size)

    })
}
function searchSizeMaterialManufacturer(term) {
    return casesData.cases.filter(({size, material, manufacturer}) => {
        return (material === term.material && size === term.size && manufacturer === term.manufacturer)

    })
}

function getCaseData(event) {
    var data = {
        "cases": casesData.cases,
        "total": casesData.cases.length,
        "count": casesData.cases.length
    }
    var dataArray = [];



    if (event.queryStringParameters != undefined) {

        //ID
        if (event.queryStringParameters.id != null && Object.keys(event.queryStringParameters).length == 1) {
            data.cases.find(element => {
                if (element.id == event.queryStringParameters.id) {
                    dataArray.push(element)
                }
            })
        }
        //Size & Material & Manufacturer
        else if (
            event.queryStringParameters.size != null 
        && event.queryStringParameters.material != null 
        && event.queryStringParameters.manufacturer != null && Object.keys(event.queryStringParameters).length == 3){
            
                let items = searchSizeMaterialManufacturer(event.queryStringParameters)
                for(var i = 0; i < items.length; i++){
                    dataArray.push(items[i])
                }
        }
        //Manufacturer & Size
        else if (event.queryStringParameters.manufacturer != null && event.queryStringParameters.size != null
        && Object.keys(event.queryStringParameters).length == 2) {
            
                let items = searchManufacturerSize(event.queryStringParameters)
                for(var i = 0; i < items.length; i++){
                    dataArray.push(items[i])
                }
        }
        //Manufacturer & Material 
        else if (event.queryStringParameters.manufacturer != null && event.queryStringParameters.material != null
        && Object.keys(event.queryStringParameters).length == 2) {
            
                let items = searchManufacturerMaterial(event.queryStringParameters)
                for(var i = 0; i < items.length; i++){
                    dataArray.push(items[i])
                }
        }
        //Size & Material
        else if (event.queryStringParameters.size != null && event.queryStringParameters.material != null
        && Object.keys(event.queryStringParameters).length == 2) {
            
                let items = searchSizeMaterial(event.queryStringParameters)
                for(var i = 0; i < items.length; i++){
                    dataArray.push(items[i])
                }
        }
        //Manufacturer
        else if (event.queryStringParameters.manufacturer != null && Object.keys(event.queryStringParameters).length == 1) {
            data.cases.find(element => {
                if (element.manufacturer === event.queryStringParameters.manufacturer) {
                    dataArray.push(element)
                }
            })

        }
        //Size
        else if (event.queryStringParameters.size != null && Object.keys(event.queryStringParameters).length == 1) {
            data.cases.find(element => {
                if (element.size === event.queryStringParameters.size) {
                    dataArray.push(element)
                }
            })

        }
        //Material
        else if (event.queryStringParameters.material != null && Object.keys(event.queryStringParameters).length == 1) {
            data.cases.find(element => {
                if (element.material === event.queryStringParameters.material) {
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