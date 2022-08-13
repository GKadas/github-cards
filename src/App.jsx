import React from 'react';
import { useState } from 'react'
import './App.css'
import axios from 'axios';

// const testData = [
//   {name: "Dan Abramov", avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4", company: "@facebook"},
//   {name: "Sophie Alpert", avatar_url: "https://avatars2.githubusercontent.com/u/6820?v=4", company: "Humu"},
//   {name: "Sebastian Markbåge", avatar_url: "https://avatars2.githubusercontent.com/u/63648?v=4", company: "Facebook"},
// ];

/* TO DO -- IMPROVEMENTS
Add handle error logic
Add network error logic
Add logic to do something if the request takes too long
*/

const CardList = (props) => (
<div>
  {props.profiles.map(profile => <Card key={profile.id} {...profile}/>)}
</div>
);

function Form (props) {
  // const userNameInput = React.createRef();  and on the input line:  ref={userNameInput}
  const [userName, setUsername] = useState('') 
  const handleSubmit = async (event) => {
    event.preventDefault();
    const resp = await axios.get(`https://api.github.com/users/${userName}`);
    props.onSubmit(resp.data);
    setUsername('')
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder='GitHub Username'
        value={userName}
        onChange={event => setUsername(event.target.value)}
      />
      <button>Add card</button>
    </form>
  )
}

function Card ({...profile}) {
  return (
    <div className="github-profile">
      <img src={profile.avatar_url} />
      <div className="info">
        <div className="name">{profile.name}</div>
        <div className="company">{profile.company}</div>
      </div>
    </div>
  );
}

function App() {
  const [profiles, setProfiles] = useState([])

  const addNewProfile = (profileData) => {
    setProfiles(prevState => (
      [...prevState, profileData]
    ))
  }

  return (
    <div>
      <div className="header">GitHub Cards</div>
      <Form onSubmit={addNewProfile}/>
      <CardList profiles={profiles}/>
    </div>
  )
}

export default App
