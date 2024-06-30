"use client";
import Link from "next/link";
import DarkModeSwitcher from "./DarkModeSwitcher";
import DropdownUser from "./DropdownUser";
import Image from "next/image";
import styles from "./header.module.css";
import { useAppSelector, useAppDispatch } from "@store/store";
import { removeLastRoute } from "@store/routeVisitedSlice";
import { useEffect } from "react";

const Header = (props: {
  // sidebarOpen: string | boolean | undefined;
  // setSidebarOpen: (arg0: boolean) => void;
}) => {
  const routeVisited = useAppSelector(state => state.routeVisitedConfig.routeVisited);

  const dispatch = useAppDispatch();

  useEffect(()=>{
    console.log(routeVisited);
  })

  return (
    <header className="sticky top-0 z-999 flex w-full drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className={styles.headerDefaultCss}>
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              dispatch(removeLastRoute());
              // console.log(routeVisited);                            
              // props.setSidebarOpen(!props.sidebarOpen);
            }}
            className={styles.backBuuton}
          >
            <Image
              src="/arrowrightblack.svg"
              alt="back"
              width={24}
              height={24}
              style={{transform: 'rotate(180deg)'}}
            />
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}
        </div>

        <div className={styles.headerText}>
          <ul style={{height:"32px", width:"32px"}}>
            {/* <!-- Dark Mode Toggler --> */}
            <DarkModeSwitcher />
            {/* <!-- Dark Mode Toggler --> */}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
