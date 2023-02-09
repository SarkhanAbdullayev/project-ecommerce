import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { RiUserLine } from "react-icons/ri";
import { GrLocation } from "react-icons/gr";
import { FiLogOut } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { logout } from "../../Redux/reducer/authReducer";
import { display } from "@mui/system";

const Sidebar = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    let activeStyle = {
        filter: "invert(66%) sepia(95%) saturate(369%) hue-rotate(86deg) brightness(87%) contrast(91%)",
    };

    return (
        <div className="sidebar flex flex-col gap-3 w-64 bg-white rounded-3">
            <h2 className="font-medium text-xl">Profilim</h2>
            <NavLink
                to="/profile/orders"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                className="tabTitle orders flex gap-4 items-center"
            >
                <FiShoppingCart />
                <p>Sifarişlərim</p>
            </NavLink>
            <NavLink
                to="/profile/favorites"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                className="tabTitle favorites flex gap-4 items-center"
            >
                <MdOutlineFavoriteBorder />
                <p>Favorilərim</p>
            </NavLink>
            <NavLink
                to="/profile/info"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                className="tabTitle info flex gap-4 items-center"
            >
                <RiUserLine />
                <p>Şəxsi məlumatlar</p>
            </NavLink>
            <NavLink
                to="/profile/address"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                className="tabTitle address flex gap-4 items-center"
            >
                <GrLocation />
                <p>Çatdırılma ünvanı</p>
            </NavLink>
            <div
                className=" tabTitle logout flex gap-4 items-center"
                onClick={() => {
                    dispatch(logout());
                    navigate("/login");
                }}
            >
                <FiLogOut />
                <p>Çıxış</p>
            </div>
        </div>
    );
};

export default Sidebar;
