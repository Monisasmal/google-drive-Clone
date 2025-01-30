import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';
import Data from './Components/Data';
import { auth, provider } from './firebase';
import styled from 'styled-components';
import {signInWithPopup} from 'firebase/auth';
// import { signOut } from "firebase/auth";




const LoginWrapper = styled.div`
  // background: lightgrey;
  padding: 20px;
  width: 400px;
  margin: 0px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  img {
    width: 100px;
  }
  button {
    width: 100%;
    background: darkmagenta;
    padding: 10px 20px;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 5px;
    font-size: 16px;
    border: 0;
    outline: 0;
    border-radius: 5px;
    cursor: pointer;
    margin-top:20px
  }
`


function App() {

  const [user, setUser] = useState(null);

  

  const signIn = () => {
    signInWithPopup(auth, provider)
            .then(({ user }) => setUser(user))
            .catch(err => alert(err))
  }
 
  return (
    <>
     {user ? (
      <>
        <Header photoURL={user.photoURL} />
        <div className="App">
          <Sidebar />
          <Data />
        </div>
      </>
    ) : (
      <>
    
          <LoginWrapper>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Google_Drive_icon_%282020%29.svg/2295px-Google_Drive_icon_%282020%29.svg.png" alt="gdrive" />
            <button onClick={signIn}>Login to Google Drive</button>
            <img src ="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0_9Jm4bBbBdLI2XsOXDQo8jua5jWXblI-NG4AHr1_N6bsS4EXMccsZDCSXOa1KrvlKXA&usqp=CAU"/>
          </LoginWrapper>
          
          </>
    )
    }
    </>
  )
}

export default App
