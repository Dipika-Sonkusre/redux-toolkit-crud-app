import Header from "./Header";
import Users from "./Users";
import classes from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={classes["home-container"]}>
      <Header />
      <Users />
    </div>
  );
}
