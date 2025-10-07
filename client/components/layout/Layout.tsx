import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Banner from "./Banner";

export default function Layout() {
  return (
    <div className="min-h-dvh flex flex-col">
      <Header />
      <Banner />
      <main className="flex-1 pt-20">{/* header + banner height */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
