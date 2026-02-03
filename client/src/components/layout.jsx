import Header from "./header";
import { Outlet } from "react-router-dom";
import App from "../app";

export default function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet>
          <App />
        </Outlet>
      </main>
    </>
  );
}
