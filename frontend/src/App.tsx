import './App.css'
import {Navbar} from "./components/Navbar"
import { Route, Routes} from "react-router-dom";
import Workouts from "./pages/Workouts"
import Exercises from "./pages/Exercises"

function App() {

  return <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Workouts />}></Route>
        <Route path="/exercises" element={<Exercises />}></Route>
      </Routes>
      </>

}

export default App
