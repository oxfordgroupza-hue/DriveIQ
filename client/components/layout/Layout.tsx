import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Banner from "./Banner";
import BottomNav from "./BottomNav";

export default function Layout() {
  return (
    <div className="min-h-dvh flex flex-col">
      <Header />
      <Banner />
      <main className="flex-1 pt-20 pb-20 lg:pb-0">
        {/* header + banner + bottom nav height */}
        <Outlet />
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}
