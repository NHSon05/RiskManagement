// <-- Layout cho Landing Page
import { Outlet } from "react-router-dom";
import NavBar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import ScrollToTop from "../hooks/ScrollToTop";

// import './MainLayout.css'

function PublicLayout() {
    return (  
        <div>
            <NavBar isLogin={false} className="absolute top-0 left-0 right-0 bg-transparent z-50 text-white py-4 px-6 md:px-12 lg:px-16"/>
            <ScrollToTop/>
            <div className="wrapper text-center items-center">
                <Outlet/>
            </div>
            <Footer/>
        </div>
    );
}

export default PublicLayout;