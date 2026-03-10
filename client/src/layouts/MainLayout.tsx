// <-- Layout chính (Sidebar + Header)
import { Outlet } from "react-router-dom";
import NavBar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import ScrollToTop from "../hooks/ScrollToTop";
// import './MainLayout.css'

function MainLayout() {
    return (  
        <div>
            <NavBar isLogin={true} className="bg-(--white) border-b border-(--border) sticky"/>
            <ScrollToTop/>
            <div className="wrapper text-center items-center my-8">
                <Outlet/>
            </div>
            <Footer/>
        </div>
    );
}

export default MainLayout;