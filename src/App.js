import { UseState } from './components/UseState';
import { ClassState } from './components/ClassState'
import { UseReducer } from './components/UseReducer';
import './App.css';

function App() {
  return (
    <div className="App">
      <UseState name='Use State'/>
      <ClassState name='Class State'/>
      <UseReducer name='Reducer State'/>

    </div>
  );
}

export default App;
