const cityReliability = {
    "MAP_BY_CITY": 100,
    "MAP_BY_AREA": 80,
    "MAP_BY_ROAD": 15,
    "NOT_FOUND": 0
}

const areaReliability = {
    "MAP_BY_AREA": 100,
    "MAP_BY_ROAD_AND_CITY": 30,
    "MAP_BY_ROAD_WITHOUT_CITY": 15,
    "NOT_FOUND": 0
}

const cityStatus = {
    mapByCity: "MAP_BY_CITY",
    mapByArea: "MAP_BY_AREA",
    mapByRoad: "MAP_BY_ROAD",
    notFound: "NOT_FOUND"
}

const areaStatus = {
    mapByArea: "MAP_BY_AREA",
    mapByRoadAndCity: "MAP_BY_ROAD_AND_CITY",
    mapByRoadWithoutCity: "MAP_BY_ROAD_WITHOUT_CITY",
    notFound: "NOT_FOUND"
}

Object.freeze(cityReliability);
Object.freeze(areaReliability);
Object.freeze(cityStatus);
Object.freeze(areaStatus);

const fullwidthNumber = {
    "０": {
        number: "0",
        chinese: "零"
    },
    "１": {
        number: "1",
        chinese: "一"
    },
    "２": {
        number: "2",
        chinese: "二"
    },
    "３": {
        number: "3",
        chinese: "三"
    },
    "４": {
        number: "4",
        chinese: "四"
    },
    "５": {
        number: "5",
        chinese: "五"
    },
    "６": {
        number: "6",
        chinese: "六"
    },
    "７": {
        number: "7",
        chinese: "七"
    },
    "８": {
        number: "8",
        chinese: "八"
    },
    "９": {
        number: "9",
        chinese: "九"
    },
}

Object.freeze(fullwidthNumber);

module.exports = { cityReliability, areaReliability, cityStatus, areaStatus, fullwidthNumber }