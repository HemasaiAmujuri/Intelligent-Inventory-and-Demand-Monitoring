import Header from "./header";
import Footer from "./FOOTER.JSX";
import { Outlet } from "react-router-dom";
import App from "../app";

export default function Layout() {
  return (
    <>
               {/* // follows this layout across all pages in the application except login and signUp */}
      <Header />       
      <main>
        <Outlet>
          <App />
        </Outlet>
      </main>
      <Footer />
    </>
  );
}
