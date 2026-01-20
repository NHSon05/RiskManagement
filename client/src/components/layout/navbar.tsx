// import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

import logo from '../../assets/imgs/logo.svg'


import { Button } from "@/components/ui";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faBars, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useLogout } from "@/hooks/useAuth";
// import ScrollToTop from "../../../hooks/ScrollToTop";
// import './NavBar.css'

interface Links{
    label:string;
    to: string
}
interface NavBarProps{
    isLogin?:boolean;
}


function NavBar({isLogin = true}: NavBarProps){
    
    const [isLoggedIn, setIsLoggedIn] = useState(isLogin);
    const navigate = useNavigate();
    const { logout } = useLogout()

    const links:Links[] = [
        { label: "Trang chủ", to: "/home" },
        { label: "Dự án", to: "/projects" },
        { label: "Báo cáo", to: "/reports" },
        { label: "Hỗ trợ", to: "/support" },
    ];
    return (
        <div className="w-full border-b border-(--border) bg-(--white) sticky z-99 top-0">
            <nav className="flex justify-between items-center px-2 sm:px-12">
                <Link to='/home'>
                    <img src={logo} alt="Logo" className="h-12"/>
                </Link>
                <div className="flex items-center py-2 gap-2">
                    <ul className={`hidden ${isLoggedIn ? 'lg:block' : 'lg:hidden'}`}>
                        {links.map((link)=>(
                            <li key={link.to} className="inline-flex hover:text-gray-500 cursor-pointer mx-2.5 my-0">
                                <NavLink to={link.to}><span>{link.label}</span></NavLink>
                            </li>
                        ))} 
                    </ul>
                    <div>
                        {isLoggedIn ? (
                            <div className="flex gap-2">
                                <Button variant="primary" 
                                    icon={<FontAwesomeIcon icon={faPlus}/>}
                                    onClick={() => {navigate('projects/info')}}
                                >
                                  Thêm dự án
                                </Button>
                                <Button variant="red"
                                    className="hidden sm:inline-flex"
                                    onClick={logout}
                                    icon={<FontAwesomeIcon icon={faArrowRightFromBracket}/>}
                                    iconPosition="right"
                                >
                                  Đăng xuất
                                </Button>
                            </div>
                        ) : (
                            <div className="flex gap-2">
                                <Button variant="primary"
                                    onClick={() => {
                                        setIsLoggedIn(true);
                                        navigate('login')
                                }}>
                                  Đăng nhập
                                </Button>
                                <Button 
                                    variant="outline" 
                                    onClick={() => {
                                        setIsLoggedIn(true);
                                        navigate('register')
                                }}>
                                  Đăng ký
                                </Button>
                            </div>
                        )}
                    </div>
                    <div className="sm:hidden">
                        <FontAwesomeIcon icon={faBars}/>
                    </div>
                </div>
            </nav>
        </div>  
    );
}

export default NavBar;