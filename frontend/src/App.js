// import logo from './logo.svg';
import './App.css';
import Header from "./components/Header";
import LandingPage from './components/LandingPage';
import VideoPage from './components/VideoPage';
import {
  Switch,
  Route,
} from "react-router-dom";

export const config = {API_URL: `http://localhost:8082`};

function App() {
  return (

   <Switch>
    <Route exact path="/">
      <LandingPage />
    </Route>
    <Route path="/video/:id">
      <LandingPage onVideoPage />
    </Route>
  </Switch>
  );
}

export default App;
