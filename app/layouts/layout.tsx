import { NavigationMenuDemo } from "@/HeaderNavigation";
import { Outlet } from "react-router";

export default function Layout() {
    return (
        <div className="min-h-full">
            <NavigationMenuDemo/>
            <header className="aoc bff">
                <div className="fy vy aua aup cwy dwm">
                    <h1 className="aza azr baw">Policy Upload</h1>
                </div>
            </header>
            {/* <main>
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <Outlet/>
                </div>
            </main>     */}
            <Outlet/>
        </div>
    );
  }