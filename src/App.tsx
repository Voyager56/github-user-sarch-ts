import "./App.css";
import User from "./User";
import { useState, useEffect } from "react";

interface UserTemplate {
  login: string;
  avatar_url: string;
  html_url: string;
}

const getGithubUser = async (username: string) => {
  const response = await fetch(`https://api.github.com/users/${username}`);
  const data: Promise<any> = await response.json();
  return data;
};

function App() {
  const [user, setUser] = useState<UserTemplate>({
    login: "",
    avatar_url: "",
    html_url: "",
  });
  const [username, setusername] = useState<string>("");

  useEffect(() => {
    if (username) {
      getGithubUser(username).then((data) => {
        setUser({
          login: data.login,
          avatar_url: data.avatar_url,
          html_url: data.html_url,
        });
      });
    } else {
      setUser({
        login: "",
        avatar_url: "",
        html_url: "",
      });
    }
  }, [username]);

  return (
    <div className="App">
      <div className="App">
        <h1>Github User Search</h1>
        <form>
          <input
            type="text"
            value={username}
            placeholder="Enter Github username"
            onChange={(e) => setusername(e.target.value)}
          />
        </form>
        {username.length === 0 ? (
          <p>Please enter a username</p>
        ) : user ? (
          <User user={user} />
        ) : (
          <p>Please enter valid username</p>
        )}
      </div>
    </div>
  );
}

export default App;
