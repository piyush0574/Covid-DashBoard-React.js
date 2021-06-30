import React from "react";
import styles from "../design/box.module.css";
import className from "classnames";
import "../design/marque.css";
function BoxData(props) {
  const card_class = className(styles.card, styles.flexbox);
  var total_days = props.data.array.cases_time_series.length;

  var DailyConfirmed =
    props.data.array.cases_time_series[total_days - 1].dailyconfirmed;
  var DailyRecovered =
    props.data.array.cases_time_series[total_days - 1].dailyrecovered;
  var DailyDeceased =
    props.data.array.cases_time_series[total_days - 1].dailydeceased;
  var TotalConfirmed =
    props.data.array.cases_time_series[total_days - 1].totalconfirmed;
  var TotalDeceased =
    props.data.array.cases_time_series[total_days - 1].totaldeceased;
  var TotalRecovered =
    props.data.array.cases_time_series[total_days - 1].totalrecovered;
  var recoveryRate = Math.round((TotalRecovered / TotalConfirmed) * 100);
  var DeathRate = (TotalDeceased / TotalConfirmed) * 100;
  DeathRate = DeathRate.toFixed(2);

  return (
    <React.Fragment>
      <h1 className={styles.text}>India (COVID-19) Dashboard</h1>
      <div className={className(card_class, styles.cbox)}>
        <h3 className={styles.boxTitle}>Confirmed Cases</h3>
        <h1 className={styles.confirmed}>{TotalConfirmed} </h1>
      </div>
      <div className={className(card_class, styles.rbox)}>
        <h3 className={styles.boxTitle}>Recovered Cases</h3>
        <h1 className={styles.recovered}>{TotalRecovered} </h1>
      </div>

      <div className={className(card_class, styles.dbox)}>
        <h3 className={styles.boxTitle}> Deceased </h3>
        <h1 className={styles.deceased}>{TotalDeceased} </h1>
      </div>
      <div className={className(card_class, styles.rbox)}>
        <h3 className={styles.boxTitle}>Recovery Rate</h3>
        <h1 className={styles.recovered}>{recoveryRate}% </h1>
      </div>
      <br />
      <div className={className(card_class, styles.cbox)}>
        <h3 className={styles.boxTitle}>Dialy Confirmed</h3>
        <h1 className={styles.confirmed}>{DailyConfirmed} </h1>
      </div>
      <div className={className(card_class, styles.rbox)}>
        <h3 className={styles.boxTitle}>Daily Recovered </h3>
        <h1 className={styles.recovered}>{DailyRecovered} </h1>
      </div>
      <div className={className(card_class, styles.dbox)}>
        <h3 className={styles.boxTitle}>Daily Deceased </h3>
        <h1 className={styles.deceased}>{DailyDeceased} </h1>
      </div>
      <div className={className(card_class, styles.dbox)}>
        <h3 className={styles.boxTitle}>Death Rate </h3>
        <h1 className={styles.deceased}>{DeathRate}% </h1>
      </div>
    </React.Fragment>
  );
}

export default BoxData;
