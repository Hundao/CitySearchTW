# CitySearchTW

## Introduction

這是一個用來分析台灣縣市與行政區的服務，可以依照一串地址的縣市名稱、區域與路名，去推測出地址所在的縣市、行政區。且不需要透過任何的網路服務！

This is a service for analyzing cities and administrative areas in Taiwan. It can guess the city and administrative area by the context in the address. According city, administrative area and road to figure out the location. The important thing is that do not have any internet serivce!

推測出來的結果包含了縣市、行政區以及其可靠度和找到的方法。

The results are presumed to include the county, the administrative district, and its reliability and methods of finding.
## Install

```
npm install https://github.com/Hundao/CitySearchTW.git
```

## Use
只要將require "city_search.js"，即可使用其服務。

Just use require "city_search.js" to use its services.
```
const CitySearch = require('../city_search');
```

## Example

```
const CitySearch = require('../city_search');

CitySearch.transfer("106臺北市大安區基隆路四段43號");

//result = 
//{ 
//    city: { name: '臺北市', status: 'MAP_BY_CITY', reliability: 100 },
//    area: { name: '大安區', status: 'MAP_BY_AREA', reliability: 100 },
//    address: '臺北市大安區基隆路四段43號',
//    reliability: 100 
//}


CitySearch.transfer("大安區基隆路四段43號");

//result = 
//{
//    city: { name: '臺北市', status: 'MAP_BY_AREA', reliability: 80 },
//    area: { name: '大安區', status: 'MAP_BY_AREA', reliability: 100 },
//    address: '大安區基隆路四段43號',
//    reliability: 90
//}

CitySearch.transfer("基隆路四段43號");

//result =
//{ 
//    city: { name: '臺北市', status: 'MAP_BY_ROAD', reliability: 15 },
//    area: { name: '大安區', status: 'MAP_BY_ROAD_WITHOUT_CITY',reliability: 15 },
//    address: '106基隆路四段43號',
//    reliability: 15 
//}

CitySearch.transfer("106臺北市大安區基隆路四段43號", "en-US");

//result = 
//{ 
//    city: { name: 'Taipei City', status: 'MAP_BY_CITY', reliability: 100 },
//    area: { name: 'Da’an Dist', status: 'MAP_BY_AREA', reliability: 100 },
//    address: '臺北市大安區基隆路四段43號',
//    reliability: 100 
//}

```
更多的範例可以在example.js看到

Can read more example in the example.js

### Reliability :

由於地址的解析並不一定是百分之百確定，全台灣有許多重複的路名甚至行政區(最有名的[中永和之歌](https://www.ptt.cc/bbs/MIS_Gbasket/M.1328894407.A.57D.html))，會依照分析的結果給予縣市和行政區可靠度一值，來表示分析結果的相信程度。

Since the resolution of the address is not necessarily 100% certain, there are many duplicate road names and even administrative districts in Taiwan. This method will give the county and city and the administrative district a reliability value according to the analysis results, to indicate the degree of confidence in the analysis result

## Source
[TaiwanAddressCityAreaRoadChineseEnglishJSON](https://github.com/donma/TaiwanAddressCityAreaRoadChineseEnglishJSON?fbclid=IwAR28FmMJLzD0CYGJsI168nLeQM7gAPBTpuwBZNcpTv7VvWJmhfGHg7uJwew)

