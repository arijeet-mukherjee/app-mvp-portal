'use client';
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./SidebarItem.module.css";
import { useAppSelector, useAppDispatch } from "@store/store";
import { setRoute } from "@store/routeVisitedSlice";


const SidebarItem = ({ item, pageName, setPageName, sidebarOpen}: any) => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  
  const routeVisited = useAppSelector((state) => {
    state.routeVisitedConfig.routeVisited
    const routes = state.routeVisitedConfig.routeVisited;
    return routes[routes.length - 1];
  });

  const handleClick = () => {
    if(routeVisited !== pathname){
      dispatch(setRoute(pathname));
    }
    const updatedPageName =
      pageName !== item.label.toLowerCase() ? item.label.toLowerCase() : "";
    return setPageName(updatedPageName);
  };


  const isActive = (item: any) => {
    if (item.route === pathname) return true;
    if (item.children) {
      return item.children.some((child: any) => isActive(child));
    }
    return false;
  };

  const isItemActive = isActive(item);

  return (
    <>
      <li className={styles.sidebaritem} style={sidebarOpen ? {justifyItems :'center'} : {}}>
        <Link
          href={item.route}
          onClick={handleClick}
          style={sidebarOpen ? {gridTemplateColumns:'auto'} : {} }
          className={`${isItemActive ? styles.sidebaritemActive : ""} ${styles.sidebaritemLink}`}
        >
        <span className={styles.imageIcon}>
            {item.icon}
          </span>

          {!sidebarOpen && 
          <span>
          {item.label}
          </span> }
          
          {item.children && (
            <svg
              className={`${
                pageName === item.label.toLowerCase() && "rotate-180"
              }`}
              width="27.5"
              height="22"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                fill=""
              />
            </svg>
          )}
        </Link>
      </li>
    </>
  );
};

export default SidebarItem;
