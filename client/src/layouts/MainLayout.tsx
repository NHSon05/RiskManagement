// <-- Layout chính (Sidebar + Header)
import { Outlet } from "react-router-dom";
import NavBar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import ScrollToTop from "../hooks/ScrollToTop";
import { SidebarInset, SidebarProvider } from "@/components/ui";
import { AppSidebar } from "@/components/layout/sidebar";
// import './MainLayout.css'

function MainLayout() {
    return (  
        <div>
          <SidebarProvider
            style={
              {
                "--sidebar-width": "calc(var(--spacing) * 72)",
                "--header-height": "calc(var(--spacing) * 12)",
              } as React.CSSProperties
            }
          >
            <AppSidebar variant="inset"/>
            <SidebarInset>
              <NavBar isLogin={true} className="bg-(--white) border-b border-(--border) sticky"/>
              <ScrollToTop/>
              <div className="mx-4 text-center items-center my-8">
                  <Outlet/>
              </div>
            </SidebarInset>
          </SidebarProvider>
          <Footer/>
        </div>
    );
}

export default MainLayout;