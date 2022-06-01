import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Header } from "components";
import { AllRoutes } from "AllRoutes";

function App() {
  return (
    <div className="App" >
      <Router>
        <Header />
        <AllRoutes />
      </Router>
    </div>
  );
}

export default App;
