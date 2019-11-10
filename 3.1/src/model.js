const model = (pastData, futureData,dataInInterval, location,startDate, endDate, filter = () => true) => {
 

  const getpastData = () => pastData

const dataIntervalData = () =>
  dataInInterval
  const getLocation = () => location



  const changeLocation = (pastData, futureData, location) =>
  model(pastData, futureData,[], location, startDate, endDate, filter)



  
   const filterDataByDate = (startDate, endDate) =>
  
   model(pastData,futureData, pastData.concat(futureData).filter(function (element) {
    
    return (new Date(element.time)).getTime()>= new Date(startDate).getTime()&& new Date(element.time).getTime() <=new Date(endDate).getTime()
  }),location, startDate, endDate,filter )

  const filtered = filter => model(pastData, futureData, filter )
  const all = () => model(pastData, futureData)

  function AddHighestTemperatureInLastFiveDays(){
    var lastFiveDaysArray = getLastFiveDays(pastData);
     lastFiveDaysArray = lastFiveDaysArray.filter(function (element) {
      return element.type ==="temperature" && element.place === location
    });
    var max =  lastFiveDaysArray.reduce((max, b) => Math.max(max, b.value), lastFiveDaysArray[0].value);
    return max;
     }

     function AddLowestTemperatureInLastFiveDays(){
      var lastFiveDaysArray = getLastFiveDays(pastData);
      lastFiveDaysArray = lastFiveDaysArray.filter(function (element) {
        return element.type ==="temperature" && element.place === location
      });
      
      var low =  lastFiveDaysArray.reduce((min, b) => Math.min(min, b.value), lastFiveDaysArray[0].value);
      return low;
       }

       function sumOfPrecipitation(){
        var lastFiveDaysArray = getLastFiveDays(pastData);
         lastFiveDaysArray = lastFiveDaysArray.filter(function (element) {
          return element.type ==="precipitation" && element.place === location
        });
        
        var totalPrecipitation = lastFiveDaysArray.reduce(function(prev, cur) {
          return prev + cur.value;
        }, 0);
        return totalPrecipitation;
      }

      function averageWindSpeed(){
        var lastFiveDaysArray = getLastFiveDays(pastData);
         lastFiveDaysArray = lastFiveDaysArray.filter(function (element) {
          return element.type ==="wind speed" && element.place === location
        });
        
        var arrAvg = lastFiveDaysArray.reduce(function(prev, cur) {
            return prev + cur.value;
          }, 0);
        return arrAvg/lastFiveDaysArray.length;
      }

      function averageCloudCoverage(){
        var lastFiveDaysArray = getLastFiveDays(pastData);
         lastFiveDaysArray = lastFiveDaysArray.filter(function (element) {
          return element.type ==="cloud coverage"&& element.place === location
        });
        
        var arrAvg = lastFiveDaysArray.reduce(function(prev, cur) {
            return prev + cur.value;
          }, 0);
        return arrAvg/lastFiveDaysArray.length;
      }

      function dominantWindDirection() {
        const wind_directions = [ ['North', 0], ['Northeast', 0], ['East', 0], ['Southeast', 0],
            ['South', 0], ['Southwest', 0], ['West', 0], ['Northwest', 0]]
    
        for (var i = 0; i < pastData.length; i++) {
            if (Math.round((new Date(pastData[i].time).getTime()) / 1000 / 60) >= minutes5d()) {
                if (pastData[i].type === "wind speed"&&pastData[i].place === location) {
                    for (var j = 0; j < wind_directions.length; j++) {
                        if (pastData[i].direction === wind_directions[j][0]) {
                            wind_directions[j][1]++;
                        }
                    }
                }
            }
        }
        var dom = 0
        var obj
        for (var j = 0; j < wind_directions.length; j++) {
            if (wind_directions[j][1] > dom) {
                dom = wind_directions[j][1]
                obj = wind_directions[j][0]
            }
        }
        return obj
    }

    function getLastFiveDays (){
	
      var filtered = pastData.filter(function (element) {
        return Math.round((new Date(element.time).getTime())/1000/60) >= minutes5d();
      });
      return filtered;
    }
    
    function minutes5d() {
      return Math.round((Date.now())/1000/60) - 1440 * 5;
  }

  function latestEntry(){
    var max =  pastData.reduce((max, b) => Math.max(max, new Date(b.time)), new Date(pastData[0].time));
       return max;
  }
  

  function getLatestEntries(){
    let latestEntryLocal = latestEntry()
   let  latestEntries = pastData.filter(function (element) {
        return new Date(element.time).getTime() ===latestEntryLocal
    });
    return latestEntries
  }

  return { getpastData,  filtered, all, AddHighestTemperatureInLastFiveDays,AddLowestTemperatureInLastFiveDays,sumOfPrecipitation,averageWindSpeed,averageCloudCoverage,
    dominantWindDirection, changeLocation,getLatestEntries,filterDataByDate, dataIntervalData,getLocation }
}

export default model