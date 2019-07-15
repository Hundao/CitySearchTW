const data = require('./data/AllData.json');
const { cityReliability, areaReliability, cityStatus, areaStatus, fullwidthNumber } = require('./config.js');


class CitySearch {

    constructor() {

        if (!CitySearch.instance) {
            this.citys = {};

            CitySearch.instance = this;
            this.arrange();
        }

        return CitySearch.instance;

    }

    arrange() {
        this.handleJsonData();
        this.supplementCity();
        this.supplementNumberInRoad();
    }

    //let Row Data(Array) arrange into key value pair(Object)
    handleJsonData() {
        for (let i in data) {
            let cityData = data[i];
            let city = {};

            city.cityName = cityData.CityName;
            city.cityEngName = cityData.CityEngName;
            city.areas = {};

            this.citys[cityData.CityName] = city;
            this.citys[cityData.CityEngName] = city;

            for (let j in cityData.AreaList) {
                let areaData = cityData.AreaList[j];
                let area = {};

                area.zipCode = areaData.ZipCode;
                area.areaName = areaData.AreaName;
                area.areaEngName = areaData.AreaEngName;
                area.roads = {};

                city.areas[areaData.AreaName] = area;
                city.areas[areaData.AreaEngName.replace('.','')] = area;

                for (let k in areaData.RoadList) {
                    let roadData = areaData.RoadList[k];
                    let road = {};

                    road.roadName = roadData.RoadName;
                    road.roadEngName = roadData.RoadEngName;

                    area.roads[roadData.RoadName] = road;
                    area.roads[roadData.RoadEngName.replace('.','')] = road;
                }
            }
        }
    }

    //map "臺" and "台" into same solution in city name
    //add English to key
    supplementCity() {
        for (let city in this.citys) {
            if (city.includes("臺")) {
                let newCity = city.replace("臺", "台");
                this.citys[newCity] = this.citys[city];
            }
        }
    }

    supplementNumberInRoad() {
        for (let city in this.citys) {
            for (let area in this.citys[city].areas) {
                for (let road in this.citys[city].areas[area].roads) {
                    for (let number in fullwidthNumber) {
                        if (road.includes(number)) {
                            let newRoad1 = road.replace(number, fullwidthNumber[number].number);
                            let newRoad2 = road.replace(number, fullwidthNumber[number].chinese);

                            this.citys[city].areas[area].roads[newRoad1] = this.citys[city].areas[area].roads[road];
                            this.citys[city].areas[area].roads[newRoad2] = this.citys[city].areas[area].roads[road];
                        }
                    }
                }
            }
        }
    }



    transfer(address, locale = "zh-TW") {
        let result = this.analyze(address, locale);
        this.calculateReliability(result);
        return result;
    }

    //Try to analyze address to map data
    analyze(address, locale) {
        let result = {
            city: {},
            area: {},
            address
        };

        let foundCity;
        let isFoundCity = false;

        for (let city in this.citys) {
            if (address.includes(city)) {
                
                if(locale === 'zh-TW'){
                    result.city.name = this.citys[city].cityName;
                }
                else{
                    result.city.name = this.citys[city].cityEngName;
                }

                result.city.status = cityStatus.mapByCity;

                foundCity = this.citys[city];
                isFoundCity = true;
                break;
            }
        }

        if (isFoundCity) {
            for (let area in foundCity.areas) {
                if (address.includes(area)) {
                    if(locale === 'zh-TW'){
                        result.area.name = foundCity.areas[area].areaName;
                    }else{
                        result.area.name = foundCity.areas[area].areaEngName;
                    }
                    result.area.status = areaStatus.mapByArea;

                    return result;
                }
            }
        }

        //recursive all the road and choose first one
        if (isFoundCity) {
            for (let area in foundCity.areas) {

                for (let road in foundCity.areas[area].roads) {
                    if (address.includes(road)) {
                        if(locale === 'zh-TW'){
                            result.area.name = foundCity.areas[area].areaName;
                        }
                        else{
                            result.area.name = foundCity.areas[area].areaEngName;
                        }
                        result.area.status = areaStatus.mapByRoadAndCity;

                        return result;
                    }
                }
            }
        }

        if (isFoundCity) {
            result.area.name = "not found";
            result.area.status = areaStatus.notFound;

            return result;
        }

        //mean city is not found
        if (!isFoundCity) {
            for (let city in this.citys) {
                for (let area in this.citys[city].areas) {
                    if (address.includes(area)) {

                        if(locale === 'zh-TW'){
                            result.city.name = this.citys[city].cityName;
                            result.area.name = this.citys[city].areas[area].areaName;
                        }
                        else{
                            result.city.name = this.citys[city].cityEngName;
                            result.area.name = this.citys[city].areas[area].areaEngName;
                        }

                        result.city.status = cityStatus.mapByArea;
                        result.area.status = areaStatus.mapByArea;

                        return result;
                    }
                }
            }
        }

        if (!isFoundCity) {
            for (let city in this.citys) {
                for (let area in this.citys[city].areas) {
                    for (let road in this.citys[city].areas[area].roads) {
                        if (address.includes(road)) {

                            if(locale === 'zh-TW'){
                                result.city.name = this.citys[city].cityName;
                                result.area.name = this.citys[city].areas[area].areaName;
                            }
                            else{
                                result.city.name = this.citys[city].cityEngName;
                                result.area.name = this.citys[city].areas[area].areaEngName;
                            }

                            result.city.status = cityStatus.mapByRoad;
                            result.area.status = areaStatus.mapByRoadWithoutCity;

                            return result;
                        }
                    }
                }
            }
        }

        if (!isFoundCity) {
            result.city.name = "not found";
            result.city.engName = "not found";
            result.city.status = cityStatus.notFound;

            result.area.name = "not found";
            result.area.engName = "not found";
            result.area.status = areaStatus.notFound;

            return result;
        }
    }

    calculateReliability(result) {
        let city = result.city;
        city.reliability = cityReliability[city.status];

        let area = result.area;
        area.reliability = areaReliability[area.status];

        result.reliability = (city.reliability + area.reliability) * 0.5
    }

    getAreasFromCity(city, language = "zh-TW") {
        let result = [];
        if (this.citys.hasOwnProperty(city)) {

            if (language === "zh-TW") {
                for (let area in this.citys[city].areas) {
                    result.push(this.citys[city].areas[area].areaName);
                }
            }
            else if (language === "en-US") {
                for (let area in this.citys[city].areas) {
                    result.push(this.citys[city].areas[area].areaEngName);
                }
            }

        }
        return result;
    }
}

const instance = new CitySearch();

module.exports = instance;