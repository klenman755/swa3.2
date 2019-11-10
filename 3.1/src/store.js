export default (init_model, view, renderer) => {
  let model = init_model

  function reducer(action, model) {
    switch(action.type) {
    
      case 'changeLocation':
        const pastData = action.pastWeather
        const futureData = action.futureWeather
        const location = action.newLocation
        return model.changeLocation(pastData, futureData,location)
      case 'changeTimeInterval':
        const start = action.startDate!=''?action.startDate:1573336800000
        const end = action.endDate!=''&&action.endDate!=null?action.endDate:9999999999998
     
        return model.filterDataByDate(start, end)
      
      default:
        return model
      }
  }

  return action => {
    model = reducer(action, model)
    renderer(view(model))
  }
}