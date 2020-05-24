import React, { useEffect, useState } from "react";

import UsersList from "../components/UsersList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const Users = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    // a SUB-argumet is an async function:
    const sendRequest = async () => {
      // Handle if there is error:
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:3001/api/users/");
        const responseData = await response.json();
        // Check if response on error is not for 400's or 500's
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setLoadedUsers(responseData.users);
      } catch (err) {
        setIsLoading(false);
        setError(err.message);
      }
      setIsLoading(false);
    };
    // EXECUTE THIS ---->
    sendRequest();
  }, []);

  const errorHandler = () => {
    setError(null);
  };
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      {isLoading && (
        <div className="center">
          {" "}
          <LoadingSpinner />
        </div>
      )}

      {!isLoading && loadedUsers && <UsersList items={loadedUsers}></UsersList>}
    </React.Fragment>
  );
};

export default Users;
