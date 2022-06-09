import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Header, Toast } from "components";
import { AllRoutes } from "AllRoutes";

function App() {
  return (
    <div className="App" >
        <Header />
        <AllRoutes />
        <Toast/>
    </div>
  );
}

export default App;
