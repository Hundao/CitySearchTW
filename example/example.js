const CitySearch = require('../city_search');

// var result = CitySearch.transfer("106基隆路四段43號");
// console.log(result);

const addresses = [
    "員水路一段416號",
    "苗栗縣銅鑼鄉中正路17之8號",
    "新北市烏來區瀑布路16號",
    "高雄市小港區明聖街135巷10弄12號",
    "屏東縣琉球鄉中正路79-1號",
    "花蓮縣花蓮市中山路549之6號",
    "彰化縣大饒路803巷21號",
    "彰化縣打簾村民生路一段451號",
    "雲林縣民生路32號",
    "雲林縣水林路327號",
    "臺北市三元街",
    "彰化縣芬草路一段93巷124號",
    "彰化縣彰南路二段36號號",
    "草屯鎮碧興路二段1367號",
    "台北市大安區基隆路四段43號",
    "台北市大安區和平東路三段410號",
    "台中市清水區鰲海路70號",
    "台東縣長濱鄉東13鄉道",
    "台東縣池上鄉新興路",
    "台東縣蘭嶼鄉紅頭村31-7號",
    "台東縣蘭嶼鄉東清村23-3號",
    "台東縣綠島鄉南寮1-80號",
    "文復路6號",
    "No.10, Sec. 5, Zhongxiao E. Rd., Xinyi Dist,Taipei City"
]


for(let ad in addresses){
    let rst = CitySearch.transfer(addresses[ad], 'en-US')
    console.log(rst.city.name, rst.area.name, rst.reliability);
}


// var result = CitySearch.transfer("No.10, Sec. 5, Zhongxiao E. Rd., Xinyi Dist,Taipei City");
// console.log(result);
