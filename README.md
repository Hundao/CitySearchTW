# CitySearchTW

## Introduction

This project for analysis of the address and transfer it into City and  Administration Area.

It support fuzzy search, by administration area or road.


## Insall


## Use

```
const CitySearch = require('../city_search');

result = CitySearch.transfer("106臺北市大安區基隆路四段43號");

//result = { city: '臺北市', area: '大安區', status: 200 }
```


### Status :

| Status   |      Mean      
|----------|:-------------
| 200 | Find City + Area 
| 300 | Find City + Area(by road)   
| 400 | Find City but Area not found 
| 500 | By finding the area to figure out the city
| 600 | By finding the road to figure out the city and area
| 0   | Not found anything

## Source
[TaiwanAddressCityAreaRoadChineseEnglishJSON](https://github.com/donma/TaiwanAddressCityAreaRoadChineseEnglishJSON?fbclid=IwAR28FmMJLzD0CYGJsI168nLeQM7gAPBTpuwBZNcpTv7VvWJmhfGHg7uJwew)

