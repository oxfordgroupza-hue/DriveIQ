import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="min-h-dvh flex flex-col">
      <Header />
      <main className="flex-1 pt-16">{/* header height */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
