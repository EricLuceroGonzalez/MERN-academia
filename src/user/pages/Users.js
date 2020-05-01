import React from "react";
import UsersList from "../components/UsersList";

const Users = () => {
  const USERS = [
    {
      id: "id-1",
      image: "https://via.placeholder.com/150",
      name: "Eric Lucero",
      places: 3,
    }
  ];
  return <UsersList items={USERS}></UsersList>;
};

export default Users;
 