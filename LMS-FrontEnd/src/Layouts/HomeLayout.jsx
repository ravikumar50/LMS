import { FiMenu } from "react-icons/fi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Components/footer";
import {useDispatch, useSelector} from 'react-redux';


function HomeLayout({children}){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // for checking use is logged in or not

    const isLoggedIn = useSelector((state)=> state.auth.isLoggedIn);

    // for displaying the options
    const role = useSelector((state)=> state.auth.role);

    function changeWidth(){
        const drawerSide = document.getElementsByClassName("drawer-side");
        drawerSide[0].style.width = 'auto' 
    }

    function hideDrawer(){
        const element = document.getElementsByClassName("drawer-toggle");
        element[0].checked = false; 
        const drawerSide = document.getElementsByClassName("drawer-side");
        drawerSide[0].style.width = '0';
    }

    function handleLogout(e){
        e.preventDefault();
        // const res = await dispatch(logout());
        // if(res?.payload?.sucess)
        navigate("/");
            
    }
    return(
        <div className="min-h-[90vh]">
            <div className="drawer absolute left-0 z-50 w-fit">
                <input className="drawer-toggle" type="checkbox" id="my-drawer"/>
                <div className="drawer-content">
                    <label htmlFor="my-drawer" className="cursor-pointer relative">
                        <FiMenu
                            onClick={changeWidth}
                            size={"32px"} 
                            className=" text-3xl font-bold text-white m-4"
                        />
                    </label>
                </div> 

                <div className="drawer-side w-0">
                    <label htmlFor="my-drawer" className="drawer-overlay">
                    </label>
                    <ul className="menu p-4 w-48 sm:w-80 bg-base-200 text-base-content relative">
                        <li className="w-fit absolute right-2 z-50">
                            <button onClick={hideDrawer}>
                                <AiFillCloseCircle size={24}/>
                            </button>
                        </li>
                        <li>
                            <Link to={"/"}>Home</Link>
                        </li>

                        {isLoggedIn && role==='ADMIN' && (
                            <li>
                               <Link to={"/admin/dashboard"}> Admin Dashboard</Link>
                            </li>
                        )}
                        <li>
                            <Link to={"/courses"}>All Courses</Link>
                        </li>

                        <li>
                            <Link to={"/contact"}>Contact Us</Link> 
                        </li>
                        <li>
                            <Link to={"/about"}>About Us</Link>
                        </li>
                        {!isLoggedIn && (
                            <div className="w-full flex items-center justify-center gap-4 mt-4">
                                <Link to="/login" className="w-full">
                                    <button className="btn btn-primary w-full text-center">Login</button>
                                </Link>
                                <Link to="/signin" className="w-full">
                                    <button className="btn btn-secondary w-full text-center">SignUp</button>
                                </Link>
                            </div>
                        )}

                        {isLoggedIn && (
                            <div className="w-full flex items-center justify-center gap-4 mt-4">
                                <Link to="/user/profile" className="w-full">
                                    <button className="btn btn-primary w-full text-center">Profile</button>
                                </Link>
                                <Link onClick={handleLogout} className="w-full">
                                    <button className="btn btn-primary w-full text-center">Logout</button>
                                </Link>
                            </div>
                        )}
                    </ul>
                </div>
            
            </div>

            

            {children}

            <Footer/>
        </div>
    )
}

export default HomeLayout;