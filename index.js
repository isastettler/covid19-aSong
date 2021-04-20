const React = require('react')
const ReactDOM = require('react-dom')
import  Virus  from './virus'
import { OrganizedVirus } from './organizedVirus'

class TestComponent extends React.Component {
    
    render() {
        return (
        <div>
            {/* <Virus /> */}
            <OrganizedVirus /> 
        </div>)
    }
}


ReactDOM.render(<TestComponent />, document.getElementById("app"));