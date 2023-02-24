import { Divider } from "antd";
import { Login } from "./Login";

export const Home = () => {
  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "auto",
        padding: "32px",
        border: "1px solid black",
        borderRadius: "12px",
        marginTop: "50px",
      }}
    >
      <h1>Project Tracker</h1>
      <Divider style={{ marginBottom: "50px" }} />
      <Login />
    </div>
  );
};
