import React, { useEffect, useState } from "react";
import LocationForm from "./LocationForm";
import { useIndexedDB } from "react-indexed-db";
import { useParams } from "react-router-dom";

function AddLocation(props) {
  const { getByID } = useIndexedDB("locations");
  const { locationId } = useParams();
  const [locatioDetail, setLocationDetail] = useState({});

  useEffect(() => {
    if (locationId) {
      getByID(locationId).then((res) => {
        setLocationDetail(res);
        console.log(res);
      });
    }
    setLocationDetail({});
  }, [locationId]);

  return (
    <div>
      <LocationForm initialValues={locatioDetail} />
    </div>
  );
}

export default AddLocation;
