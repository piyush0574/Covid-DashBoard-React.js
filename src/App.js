import "./App.css";
import styles from "../src/design/box.module.css";
import DashBoard from "./Components/DashBoard";
import Testing from "./Components/Testing";

function App() {
  return (
    <div className={styles.testing}>
      <div>
        <DashBoard />
      </div>
    </div>
  );
}

export default App;
