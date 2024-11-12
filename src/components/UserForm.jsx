import { useState, useContext } from 'react';
import { UserContext } from './UserContext';

export default function UserForm() {
  const [inputName, setInputName] = useState('');
  const { setName } = useContext(UserContext);

  function handleSubmit(e) {
    e.preventDefault();
    setName(inputName); 
    window.history.pushState({}, '', '/quiz'); 
    const navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent); 
  }

  return (
    <form onSubmit={handleSubmit}>
        <label>Name: </label>
        <input type="text" id="inputName" value={inputName} onChange={(e)=>setInputName(e.target.value)}/>
        <button type="submit" >Submit</button>
    </form>
  );
}