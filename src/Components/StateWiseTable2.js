import React, { useState, useEffect, useReducer } from "react";
import "../design/state_table.css";
import styles from "../design/box.module.css";
import cName from "classnames";
const initialState = {
  ascendFlag: false,
  stateWiseArray: [],
};
const reducer = (currentState, action) => {
  console.log(action);
  console.log(currentState);
  switch (action.type) {
    case "ascending":
      return {
        ascendFlag: true,
        stateWiseArray: action.stateWiseArray.sort(compare_asc),
      };
    case "descending":
      return {
        ascendFlag: false,
        stateWiseArray: action.stateWiseArray.sort(compare_desc),
      };
    default:
      return currentState;
  }
};
function compare_desc(a, b) {
  return b.confirmed - a.confirmed;
}
function compare_asc(a, b) {
  return b.confirmed - a.confirmed;
}

function StateWiseTable2(props) {
  const [currentState, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    dispatch({ type: "descending", paylaod: props.stateWiseArray });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentState.ascendFlag]);
  return (
    <div>
      <table>
        <tr>
          <th className={cName(styles.boxTitle)}> State</th>
          <th className={cName(styles.boxTitle)}> Confirmed Cases</th>
          <th className={cName(styles.boxTitle)}>Active Cases</th>
          <th className={cName(styles.boxTitle)}>Deaths</th>
          <th className={cName(styles.boxTitle)}>Recovered</th>
          <th className={cName(styles.boxTitle)}>Death Rate</th>
          <th className={cName(styles.boxTitle)}>Recovery Rate</th>
        </tr>
        {currentState.stateWiseArray.map((data) => (
          <tr>
            <td>{data.state}</td>
            <td className={styles.confirmed}>{data.confirmed}</td>
            <td>{data.active}</td>
            <td className={styles.deceased}>{data.deaths}</td>
            <td className={styles.recovered}>{data.recovered}</td>
            <td s>{((data.deaths / data.confirmed) * 100).toFixed(2)}%</td>
            <td>{Math.round((data.recovered / data.confirmed) * 100)}%</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default StateWiseTable2;
