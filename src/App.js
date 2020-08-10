import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { Switch, Route, useHistory } from "react-router-dom";
import AddLocation from "./components/AddLocation";
import LocationList from "./components/LocationList";
import { useIndexedDB } from "react-indexed-db";
import { LocationProvider } from "./contexts/locations";
import "./App.css";

function App() {
  const db = useIndexedDB("location");
  console.log("db object", JSON.stringify(db));
  let history = useHistory();
  console.log("hstory----->", history);
  const addLocation = () => {
    history.push("/location");
  };

  const [locations, setLocations] = useState([]);
  return (
    <LocationProvider value={{ locations, setLocations }}>
      <div className="App">
        <div className="header">
          <Button
            variant="contained"
            style={{ borderRadius: "25px", marginRight: "20px" }}
            onClick={addLocation}
          >
            + Add Location
          </Button>
        </div>
        <Switch>
          <Route exact path="/">
            <LocationList />
          </Route>
          <Route exact path="/location/:locationId?">
            <AddLocation />
          </Route>
        </Switch>
      </div>
    </LocationProvider>
  );
}

export default App;
