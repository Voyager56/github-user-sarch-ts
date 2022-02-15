import "./App.css";
import User from "./User";
import { useState, useEffect } from "react";

interface UserTemplate {
  login: string;
  avatar_url: string;
  html_url: string;
  id: number;
}

const getGithubUser = async (username: string) => {
  const response = await fetch(
    `https://api.github.com/search/users?q=${username}+in:user`
  );
  const data = await response.json();
  return data;
};

function App() {
  const [user, setUser] = useState<UserTemplate[]>([
    {
      login: "",
      avatar_url: "",
      html_url: "",
      id: 0,
    },
  ]);
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    if (username) {
      getGithubUser(username).then((data) => {
        setUser(data.items.slice(0, 10));
      });
    } else {
      setUser([{ login: "", avatar_url: "", html_url: "", id: 0 }]);
    }
  }, [username]);

  return (
    <div className="App">
      <h1>Github User Search</h1>
      <form>
        <input
          type="text"
          value={username}
          placeholder="Enter Github Username"
          onChange={(e) => setUsername(e.target.value)}
        />
      </form>
      {username.length === 0 ? (
        <p>Please enter a username</p>
      ) : user ? (
        user.map((user) => <User key={user.id} user={user} />)
      ) : (
        <p>Please enter valid username</p>
      )}
    </div>
  );
}

export default App;
