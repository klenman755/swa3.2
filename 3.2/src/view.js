import React, { Component } from 'react'
import Select from 'react-select'



const options = [
    { value: 'Aarhus', label: 'Aarhus' },
    { value: 'Copenhagen', label: 'Copenhagen' },
    { value: 'Horsens', label: 'Horsens' }
 
  ]

  const MyComponent = ({model, dispatcher})  => (
    
   
    <Select id ='myoptions' options={options} defaultValue={options.filter(option => option.label === 'Aarhus')}
    onChange = {(e) => dispatcher()({type:'changeLocation', city:e.value})}/>
   
  )


const WeatherData = ({weather, dispatcher}) => [
  
    <td key='place'>{weather.place}</td>,
    <td key='type'>{weather.type}</td>,
    <td key='value'>{weather.value}</td>,
    <td key='unit'>{weather.unit}</td>,
    <td key='time'>{weather.time}</td>,
   

] 

const WeatherRow = (props) => (
 
    
    <tr>
        <WeatherData {...props}/>
    </tr>
    
)



const WeatherDataBody = ({model, dispatcher}) => (
   
    
    <tbody>
        {
            model.getLatestEntries().map(weather => <WeatherRow  {...{weather, dispatcher}}/>)
        }
    </tbody>

    
)

const WeatherInterval = ({model, dispatcher}) => (
   
    
    <tbody>
        {
            model.dataIntervalData().map(weather => <WeatherRow  {...{weather, dispatcher}}/>)
        }
    </tbody>

    
)


export default dispatcher => model => (
 
    <div id='base'>
        <h1>Historical weather data and predictions</h1>
      
        <MyComponent  {...{model, dispatcher}} />
        
          
           <h3>information from last five days</h3>
           <p>local maximum: {model.AddHighestTemperatureInLastFiveDays().toFixed(2)}</p> 
           <p>local minimum: {model.AddLowestTemperatureInLastFiveDays().toFixed(2)}</p> 
           <p>total precipitation: {model.sumOfPrecipitation().toFixed(2)}</p> 
           <p>average wind speed: {model.averageWindSpeed().toFixed(2)}</p> 
           <p>average cloud coverage: {model.averageCloudCoverage().toFixed(2)}</p> 
           <p>dominant wind: {model.dominantWindDirection()}</p> 
           <h3>current weather</h3>
           <table id='employees'>
            <thead><tr><td>place</td><td>type</td><td>value</td><td>unit</td><td>time</td></tr></thead>
           
              <WeatherDataBody {...{model, dispatcher}}/>
              </table>
              
              <h3>post object</h3>
            <div><p>
            <label for="input_value">{'Value'}</label>       
            <input id="input_value"  type="text"  /> 
            </p><p>
            <label for="input_type">{'Type'}</label>       
            <input id="input_type"  type="text"  /> 
            </p> <p>   
            <label for="input_unit">{'Unit'}</label>    
            <input id="input_unit"  type="text"  />
            </p>  <p>
            <label for="input_place">{'Place'}</label>       
            <input id="input_place"  type="text"  /> 
            </p>  <p>
            <label for="input_time">{'Time'}</label>       
            <input id="input_time"  type="text"  />   </p>
            <button  onClick= {() => dispatcher()({type:'postDataToWebService', 
            value:document.getElementById("input_value").value,
             entry_type: document.getElementById("input_type").value,
             unit:document.getElementById("input_unit").value,
             time: document.getElementById("input_time").value,
             place:document.getElementById("input_place").value
             })}>
               Post data to web service
               
            </button>
            </div>
            
            <h3>weather data in interval</h3>
            <div>
                <div>
               
                <p></p>  
            <label for="dateFrom">{'Date interval from'}</label>       
            <input id="dateFrom" defaultValue = '2019-11-09T16:00:00.000Z'  type="text"  />
            </div>
            <div>
            <label for="dateTo">{'Date interval to'}</label>       
            <input id="dateTo" defaultValue = '2019-11-09T22:00:00.000Z' type="text"  />
            </div>  
            <div>
            <button  onClick= {() => dispatcher()({type:'changeTimeInterval', startDate:document.getElementById("dateFrom"), endDate: document.getElementById("dateTo")})}>
                Show data in interval
               
            </button>
            <button  onClick= {() =>
            
            dispatcher()({type:'updateAll', startDate:document.getElementById("dateFrom").value, endDate: document.getElementById("dateTo").value,
           city:model.getLocation()
             })
       }>
                Update data for given city
               
            </button>
            </div> 
            <WeatherInterval {...{model, dispatcher}}/>
            
            </div>              
												
                                
          
       
    </div>
)