import React, { useState } from "react"
import ProfileEdit from './ProfileEdit';
import './App.css';

function App() {
const [userID, setUserID] = useState(1)

const userIds = [1,2,3,4]

  return (
    <div className="App">
      {userIds.map((id) => (
        <button key={id} onClick={() => setUserID(id)}>
          User ID {id}
        </button>
      ))}
      <h2>User ID {userID}</h2>
      <ProfileEdit userID={userID} />
    </div>
  );
}

export default App;
