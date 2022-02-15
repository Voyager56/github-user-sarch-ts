import React from "react";
import "./User.css";

interface UserTemplate {
  login: string;
  avatar_url: string;
  html_url: string;
}

const User = (props: { user: UserTemplate }) => {
  const { html_url, avatar_url, login } = props.user;
  console.log(props.user);

  return (
    <a className="user" target="_blank" href={html_url}>
      <img className="avatar" src={avatar_url} alt="avatar" />
      <h1 className="username">{login}</h1>
    </a>
  );
};

export default User;
