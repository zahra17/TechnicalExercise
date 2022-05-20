import React  from 'react';
import Home from './home'
import { useDispatch , useSelector } from 'react-redux';



const App: any = ({
}) => {
  // const counter = useSelector((state :any ) => state.serviceDatas)
  // console.log("counter",counter)
  return (
    <div className="App">
    <Home/>
    </div>
  );
}

export default App;
