const React = require('react')
const ReactDOM = require('react-dom')
import  FunctionVirus  from './FunctionVirus'
import ClassVirus from './ClassVirus'

class TestComponent extends React.Component {
    
    render() {
        return (
        <div>
        <h1>Covid-19 in 2020</h1>
        <h3>a song by the bored and pained</h3>
            {/* <FunctionVirus /> */}
            <ClassVirus /> 
        </div>)
    }
}


ReactDOM.render(<TestComponent />, document.querySelector("body"));