import React from "react";
import { useParams } from "react-router-dom";
// To make paramas of routes aware of params at endpoints

import PlaceList from "../components/PlaceList";

const DUMMY_PLACES = [
  {
    id: "id-1",
    title: "Pont Des Arts",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Pont_des_Arts%2C_6e_Arrondissement%2C_Paris_%28HDR%29_20140320_1.jpg/1024px-Pont_des_Arts%2C_6e_Arrondissement%2C_Paris_%28HDR%29_20140320_1.jpg",
    description:
      "Conecta el Quai Malaquais y el Quai Conti a la altura del Instituto de Francia, en el distrito VI, con el Quai François-Mitterrand y el Quai du Louvre a la altura del Cour Carrée del Palacio del Louvre (que se llamaba «Palais des Arts» durante el Primer Imperio), en el distrito I. ",
    address: "Pont des Arts, 75006 Paris, Francia",
    location: {
      lat: 48.8583424,
      lng: 2.3353197,
    },
    creator: "usr-1",
  },
  {
    id: "id-2",
    title: "Pont Neuf",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Pont_des_Arts%2C_6e_Arrondissement%2C_Paris_%28HDR%29_20140320_1.jpg/1024px-Pont_des_Arts%2C_6e_Arrondissement%2C_Paris_%28HDR%29_20140320_1.jpg",
    description:
      "Conecta el Quai Malaquais y el Quai Conti a la altura del Instituto de Francia, en el distrito VI, con el Quai François-Mitterrand y el Quai du Louvre a la altura del Cour Carrée del Palacio del Louvre (que se llamaba «Palais des Arts» durante el Primer Imperio), en el distrito I. ",
    address: "Pont des Arts, 75006 Paris, Francia",
    location: {
      lat: 48.8583424,
      lng: 2.3353197,
    },
    creator: "usr-2",
  },
];
const UserPlaces = () => {
  // Get acces to the userId at this route (see App.js)
  const userId = useParams().userId;
  //   Filter the userId and show filtered
  const loadedPlaces = DUMMY_PLACES.filter((place) => place.creator === userId);
  return <PlaceList items={loadedPlaces}></PlaceList>;
};

export default UserPlaces;
