
var pcbsData = require('./pcbs.json')

exports.handler = async (event) => {

    if (event.httpMethod === 'GET') {
        // return {
        //     statusCode: 200,
        //     body: JSON.stringify(event)
        // }
             
        return getPCBData(event)

    }
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
function getPCBData(event) {
    var data = {
        "pcbs": pcbsData.pcbs,
        "total": pcbsData.pcbs.length,
        "count": pcbsData.pcbs.length
    }
    var dataArray = [];

    if (event.queryStringParameters != undefined) {

        //Size and Manufacturer
        if(event.queryStringParameters.size != null && event.queryStringParameters.manufacturer != null
        && Object.keys(event.queryStringParameters).length == 2){
            let items = searchSizeManufacturer(event.queryStringParameters)
                for(var i = 0; i < items.length; i++){
                    dataArray.push(items[i])
                }
        }
        //Size and Hotswap
        else if(event.queryStringParameters.size != null && event.queryStringParameters.hotswappable != null
        && Object.keys(event.queryStringParameters).length == 2){
            let items = searchSizeHotswap(event.queryStringParameters)
                for(var i = 0; i < items.length; i++){
                    dataArray.push(items[i])
                }
        }
        //Size and RGB switch
        else if(event.queryStringParameters.size != null && event.queryStringParameters.rgbswitch != null 
        && Object.keys(event.queryStringParameters).length == 2){
            let items = searchSizeRGBSwitch(event.queryStringParameters)
                for(var i = 0; i < items.length; i++){
                    dataArray.push(items[i])
                }
        }
        //Size and RGB Underglow
        else if(event.queryStringParameters.size != null && event.queryStringParameters.rgbunderglow != null 
        && Object.keys(event.queryStringParameters).length == 2){
            let items = searchSizeRGBUnderglow(event.queryStringParameters)
                for(var i = 0; i < items.length; i++){
                    dataArray.push(items[i])
                }
        }
        //RGB switch and RGB underglow 
        else if(event.queryStringParameters.rgbswitch != null && event.queryStringParameters.rgbunderglow != null
        && Object.keys(event.queryStringParameters).length == 2 ){
            let items = searchRGBSwitchRGBUnderglow(event.queryStringParameters)
                for(var i = 0; i < items.length; i++){
                    dataArray.push(items[i])
                }
        }
        //ID
        else if (event.queryStringParameters.id != null && Object.keys(event.queryStringParameters).length == 1) {
            data.pcbs.find(element => {
                if (element.id == event.queryStringParameters.id) {
                    dataArray.push(element)
                }
            })
        }
        //Manufacturer
       else if (event.queryStringParameters.manufacturer != null && Object.keys(event.queryStringParameters).length == 1) {
            data.pcbs.find(element => {
                if (element.manufacturer === event.queryStringParameters.manufacturer) {
                    dataArray.push(element)
                }
            })

        }
        //Size
        else if (event.queryStringParameters.size != null && Object.keys(event.queryStringParameters).length == 1) {
            data.pcbs.find(element => {
                if (element.size === event.queryStringParameters.size) {
                    dataArray.push(element)
                }
            })

        }
        //Hotswappable
        else if (event.queryStringParameters.hotswappable != null && Object.keys(event.queryStringParameters).length == 1) {
            console.log(event.queryStringParameters.hotswappable)
            data.pcbs.find(element => {
                console.log(element.hotswappable)
                if (String(element.hotswappable) === event.queryStringParameters.hotswappable) {

                    dataArray.push(element)
                }
            })

        }
        //RGB Switch
        else if (event.queryStringParameters.rgbswitch != null && Object.keys(event.queryStringParameters).length == 1) {
            data.pcbs.find(element => {
                if (String(element.rgbswitch) === event.queryStringParameters.rgbswitch) {
                    dataArray.push(element)
                }
            })

        }
        //RGBUnder
        else if (event.queryStringParameters.rgbunderglow != null && Object.keys(event.queryStringParameters).length == 1) {
            data.pcbs.find(element => {
                if (String(element.rgbunderglow) === event.queryStringParameters.rgbunderglow) {
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
