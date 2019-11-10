import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import model from './model.js'
import store from './store.js'
import view from './view.js'
import dispatcher from './dispatcher.js'

async function init() {
    try {
        const pastData_res = await fetch('http://localhost:8080/data/Aarhus')
        const pastData = await pastData_res.json()
        const futureData = await fetch('http://localhost:8080/forecast/Aarhus').then(res => res.json())
        const loactaion = 'Aarhus'
        const dataInInterval = pastData.concat(futureData)
        const theModel = model(pastData, futureData,dataInInterval,loactaion)
        let renderer = dom => ReactDOM.render(dom, document.getElementById('root'))
        let theDispatcher
        const theView = view(() => theDispatcher)
        const theStore = store(theModel, theView, renderer)
        theDispatcher = dispatcher(theStore)
        renderer(theView(theModel))
    } catch (err) {
        console.log(err)
    }
}

init()

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();