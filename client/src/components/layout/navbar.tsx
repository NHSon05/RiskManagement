// import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import logo from '../../assets/imgs/logo.svg'


import {
  Button,
  Input,
} from "@/components/ui";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { cn } from "@/lib/utils";
import { Bell } from "lucide-react";
interface NavBarProps{
    isLogin?:boolean;
    className?: string;
}


function NavBar({
  isLogin = true,
  className,
}: NavBarProps){
    
    const [isLoggedIn, setIsLoggedIn] = useState(isLogin);
    const navigate = useNavigate();
    return (
        <div className={cn("w-full z-98 top-0", className)}>
            <nav className="flex justify-between items-center px-4">
              <div className="flex items-center">
                {/* <SidebarTrigger className="-ml-1" />
                <Separator
                  orientation="vertical"
                  className="mx-2 data-[orientation=vertical]:h-4"
                /> */}
                <Link to='/home'>
                    <img src={logo} alt="Logo" className="h-12"/>
                </Link>
              </div>
                <div className="flex items-center py-2 gap-2">
                    <div className={`hidden ${isLoggedIn ? 'lg:block' : 'lg:hidden'} w-72`}>
                      <Input type="search" placeholder="Tìm kiếm..."/>  
                    </div>
                    <div>
                        {isLoggedIn ? (
                          <div className="flex gap-2">
                            {/* <Button variant="primary" 
                                icon={<FontAwesomeIcon icon={faPlus}/>}
                                onClick={() => {navigate('projects/info')}}
                            >
                              Thêm dự án
                            </Button> */}
                            <button
                              className="p-1.5 rounded-lg"
                            >
                              <Bell className="text-(--description)"/>
                            </button>
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