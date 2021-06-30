import React, { useEffect, useReducer } from "react";
import "../design/state_table.css";
import styles from "../design/box.module.css";
import cName from "classnames";
const initialState = {
  ascendFlag: false,
  stateWiseArray: [0],
};
var firstTimeEntryFlag = true;
const reducer = (currentState, action) => {
  switch (action.type) {
    case "ascending":
      return {
        ascendFlag: false,
        stateWiseArray: action.paylaod.sort(compare_asc),
      };
    case "descending":
      return {
        ascendFlag: true,
        stateWiseArray: action.paylaod.sort(compare_desc),
      };
    default:
      return currentState;
  }
};

function compare_desc(a, b) {
  return b.confirmed - a.confirmed;
}
function compare_asc(a, b) {
  return a.confirmed - b.confirmed;
}

function StateWiseTable(props) {
  const [currentState, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    if (firstTimeEntryFlag) {
      dispatch({ type: "descending", paylaod: props.stateWiseArray });
      firstTimeEntryFlag = false;
    }
    console.log(currentState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentState.ascendFlag]);
  return (
    <div>
      <table>
        <tr>
          <th className={cName(styles.boxTitle)}> State</th>
          {currentState.ascendFlag && (
            <th className={cName(styles.boxTitle)}>
              Confirmed Cases
              <button
                className={styles.asc_desc_btn}
                onClick={() =>
                  dispatch({
                    type: "ascending",
                    paylaod: props.stateWiseArray,
                  })
                }
              >
                <img
                  src={require("../Resource/down_arrow.png").default}
                  alt="Desc"
                />
              </button>
            </th>
          )}
          {!currentState.ascendFlag && (
            <th className={cName(styles.boxTitle)}>
              {" "}
              Confirmed Cases
              <button
                className={styles.asc_desc_btn}
                onClick={() =>
                  dispatch({
                    type: "descending",
                    paylaod: props.stateWiseArray,
                  })
                }
              >
                {" "}
                <img
                  alt="Asc"
                  src={require("../Resource/up_arrow.png").default}
                />
              </button>
            </th>
          )}
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

export default StateWiseTable;
