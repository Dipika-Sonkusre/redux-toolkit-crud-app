import { Outlet } from "react-router";
import "./App.css";
import { useAppSelector } from "./store/hooks";
import GlobalLoader from "./commonComponents/GlobalLoader";

function App() {
  const { loading } = useAppSelector((state) => state.user);
  return (
    <div className="container">
      <GlobalLoader loading={loading} />
      <Outlet />
    </div>
  );
}

export default App;
