import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Header, Toast } from "components";
import { AllRoutes } from "AllRoutes";
import { Box } from "@chakra-ui/react"
function App() {
  return (
    <Box overflow="hidden" className="App" >
        <Header />
        <AllRoutes />
        <Toast/>
    </Box>
  );
}

export default App;
