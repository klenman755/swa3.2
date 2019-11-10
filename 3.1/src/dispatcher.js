export default store => async ({type, ...params}) =>  {
  switch(type) {
   
      case 'changeLocation':
        const newLocation = params.city
        const pastWeather_res = await fetch('http://localhost:8080/data/'+ newLocation)
        const pastWeather = await pastWeather_res.json()
        const futureWeather_res = await fetch('http://localhost:8080/forecast/'+ newLocation)
        const futureWeather = await futureWeather_res.json()
        store({type, ...params, pastWeather ,futureWeather, newLocation})
        break
        case  'changeTimeInterval':
          const startDate = params.startDate.value
          const endDate = params.endDate.value
          store({type, ...params, startDate, endDate})
          break
        case 'updateAll':
           const newLocationU = params.city
            const pastWeather_resU = await fetch('http://localhost:8080/data/'+ newLocationU)
            const pastWeatherU = await pastWeather_resU.json()
            const futureWeather_resU = await fetch('http://localhost:8080/forecast/'+ newLocationU)
            const futureWeatherU = await futureWeather_resU.json()
            store({type:'changeLocation', ...params,  pastWeather:pastWeatherU,futureWeather:futureWeatherU, newLocation:newLocationU}) 
            const startDateu = params.startDate.value
            const endDateu = params.endDate.value
            store({type:'changeTimeInterval', ...params, startDateu, endDateu})
            break
        case 'postDataToWebService': 
            const a =params.value
            const b=params.entry_type
            const c = params.unit
            const d =params.time
            const e =params.place
            const postRequest = {value:a, type:b, unit:c, time:d, place:e,precipitation_type:null, direction:null, }
            const headers = { 'Content-Type': 'application/json', Accept: 'application/json' }
            const stringigfiedJSON =  JSON.stringify( {value:a, type:b, unit:c, time:d, place:e})
            try {
              
           // i keep getting internal error on the server here
            const response = await fetch('http://localhost:8080/data/',
              { method: 'POST', 
                body:stringigfiedJSON, 
                headers}).then(res => res.json())
             
              
            } catch (error) {
              console.log(error)
            }
           
          
              
           break;   
    default:
  }
}
