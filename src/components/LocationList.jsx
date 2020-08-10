import React, { useEffect, useContext } from "react";
import { useIndexedDB } from "react-indexed-db";
import NoLocation from "../assets/NoLocation.jpg";
import LocationTable from "./LocationTable";
import LocationContext from "../contexts/locations";
import "../App.css";

function LocationList(props) {
  const { getAll } = useIndexedDB("locations");
  const { locations, setLocations } = useContext(LocationContext);
  useEffect(() => {
    getAll().then((res) => {
      console.log("location data", res);
      setLocations(res);
    });
  }, []);

  const renderLocationItems = () => <LocationTable rows={locations} />;

  const renderEmptyScreen = () => {
    return (
      <React.Fragment>
        <div>
          <img src={NoLocation} alt="No Location" />
        </div>
        <h4>Kindly Add your Location First</h4>
        <p style={{ margin: "0px" }}>There is no location added right now</p>
      </React.Fragment>
    );
  };

  return (
    <div className="Location-list-container ">
      {locations && !!locations.length
        ? renderLocationItems()
        : renderEmptyScreen()}
    </div>
  );
}

export default LocationList;
