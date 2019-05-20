
const data = require('./data/AllData.json');

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
        for (let i in data) {
            let cityData = data[i];
            let city = {};

            city.cityName = cityData.CityName;
            city.cityEngName = cityData.CityEngName;
            city.areas = {};

            this.citys[cityData.CityName] = city;

            for (let j in cityData.AreaList) {
                let areaData = cityData.AreaList[j];
                let area = {};

                area.zipCode = areaData.ZipCode;
                area.areaName = areaData.AreaName;
                area.areaEngName = areaData.AreaEngName;
                area.roads = {};

                city.areas[areaData.AreaName] = area;

                for (let k in areaData.RoadList) {
                    let roadData = areaData.RoadList[k];
                    let road = {};

                    road.roadName = roadData.RoadName;
                    road.roadEngName = roadData.RoadEngName;

                    area.roads[roadData.RoadName] = road;
                }
            }
        }
    }

    transfer(address) {
        return this.analyze(address);
    }

    analyze(address) {
        let result = {};
        let foundCity;
        let status = 0;

        for (let city in this.citys) {
            if (address.includes(city)) {
                result.city = city;
                foundCity = this.citys[city];
                status = 100;
                break;
            }
        }

        if (status === 100) {
            for (let area in foundCity.areas) {
                if (address.includes(area)) {
                    result.area = area;
                    result.status = 200;
                    
                    return result;
                }
            }
        }

        //recursive all the road and choose first one
        if (status === 100) {
            for (let area in foundCity.areas) {

                for (let road in foundCity.areas[area].roads) {
                    if (address.includes(road)) {
                        result.area = area;
                        result.status = 300;
                        
                        return result;
                    }
                }
            }
        }

        if (status === 100) {
            result.area = "not found";
            result.status = 400;
            
            return result;
        }

        //mean city is not found
        if (status === 0) {
            for (let city in this.citys) {
                for (let area in this.citys[city].areas) {
                    if (address.includes(area)) {
                        result.city = city;
                        result.area = area;
                        result.status = 500;

                        return result;
                    }
                }
            }
        }

        if (status === 0) {
            for (let city in this.citys) {
                for (let area in this.citys[city].areas) {
                    for (let road in this.citys[city].areas[area].roads){

                        if (address.includes(road)) {
                            result.city = city;
                            result.area = area;
                            result.status = 600;

                            return result;
                        }
                    }
                }
            }
        }

        if(status === 0){
            result.city = "not found";
            result.area = "not found";
            result.status = 0;

            return result;
        }
    }


}
const instance = new CitySearch();

module.exports = instance;