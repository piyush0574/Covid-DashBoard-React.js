import BoxData from "./BoxData";
import styles from "../design/dashboard.module.css";
import axios from "axios";
import StateWiseTable from "./StateWiseTable";
import CircularProgress from "@material-ui/core/CircularProgress";
import React, { useState, useEffect } from "react";

const initialState = {
  covidArray: [],
  error: "",
};
const refreshHandler = () => {
  window.location.reload();
};

function DashBoard() {
  const [coviddata, setcoviddata] = useState(initialState);
  const [isLoaded, setLoaded] = useState(false);
  useEffect(() => {
    axios
      .get("https://api.covid19india.org/data.json")
      .then((response) => {
        setcoviddata({
          ...coviddata,
          covidArray: response.data,
        });
        setLoaded(true);
      })
      .catch((error) => {
        setcoviddata({ ...coviddata, error: "SomeThing wrong happens" });

        setLoaded(true);
      }); // eslint-disable-next-line
  }, [isLoaded]);

  // render
  if (isLoaded) {
    return (
      <div className={styles.titleAndCardContainerBox}>
        <div>
          {isLoaded && (
            <BoxData data={{ array: coviddata.covidArray, type: 1 }} />
          )}
        </div>
        <div className={styles.lastUpdatedMessage}>
          Last Updated on{" "}
          {
            coviddata.covidArray.cases_time_series[
              coviddata.covidArray.cases_time_series.length - 1
            ].date
          }
          <button className={styles.refresh_btn} onClick={refreshHandler}>
            <img
              src={require("../Resource/refresh_btn.png").default}
              width={14}
              height={14}
              alt="pk"
            />
          </button>
        </div>
        <div className={styles.statetablemaindiv}>
          <StateWiseTable stateWiseArray={coviddata.covidArray.statewise} />
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.progress_div}>
        <CircularProgress />
        <h1>Loading</h1>
      </div>
    );
  }
}

export default DashBoard;
