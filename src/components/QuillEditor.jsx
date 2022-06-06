import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css';

export function Quill({text, changeHandler}){
  return(
    <ReactQuill value={text} onChange={changeHandler}/>
  )
}