"use client";
import Link from "next/link";
import DarkModeSwitcher from "./DarkModeSwitcher";
import DropdownUser from "./DropdownUser";
import Image from "next/image";
import styles from "./header.module.css";

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  return (
    <header className="sticky top-0 z-999 flex w-full drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className={styles.headerDefaultCss}>
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className={styles.backBuuton}
          >
            <Image
              src="/arrowrightblack.svg"
              alt="back"
              width={24}
              height={24}
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
