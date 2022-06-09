import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

export function Toast(){
  return(
  <ToastContainer
    position={"bottom-right"}
    autoClose={1000}
    theme={"dark"}
    draggable
  />)
}