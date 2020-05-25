import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// To make paramas of routes aware of params at endpoints

import PlaceList from "../components/PlaceList";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";

const UserPlaces = () => {
  const [loadedPlaces, setLoadedPlaces] = useState();
  // Bring the http-hook variables
  const {isLoading, error, sendRequest, clearError} = useHttpClient();

  // Get acces to the userId at this route (see App.js)
  const userId = useParams().userId;

  // Send the Request when render (once)
  useEffect(() => {
    const fectchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:3001/api/places/user/${userId}`
        );
        setLoadedPlaces(responseData.places);
      } catch (err) {
        console.log(`Some error: ${err}`);
        
      }
    };
    fectchPlaces();
  }, [sendRequest, userId]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPlaces && (
        <PlaceList items={loadedPlaces}></PlaceList>
      )}
    </React.Fragment>
  );
};

export default UserPlaces;
