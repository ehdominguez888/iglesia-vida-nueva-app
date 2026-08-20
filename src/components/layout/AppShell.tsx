import { Outlet } from "react-router-dom";
import Header from "./Header";
import TabBar from "./TabBar";

const AppShell = () => {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 pb-32 pt-6 sm:pb-16 sm:pt-10">
        <Outlet />
      </main>
      <TabBar />
    </div>
  );
};

export default AppShell;