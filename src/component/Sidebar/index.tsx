"use client";
'use strict';
import React, { useEffect, useRef, useState } from "react";
import { redirect, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SidebarItem from "@/component/Sidebar/SidebarItem";
import ClickOutside from "@/component/ClickOutside";
import useLocalStorage from "@/hooks/useLocalStorage";
import styles from "./Sidebar.module.css";
import { SidebarItemType } from "@/types/sidebaritem";
import { useAppSelector, useAppDispatch } from "@store/store";
import { setSidebar } from "@store/sidebarOpenSlice";
import { setDashboard } from "@store/dashboardVisitedSlice";
import { setRoute } from "@store/routeVisitedSlice";
import { useRouter } from 'next/navigation'


// interface SidebarProps {
//   sidebarOpen: boolean;
//   setSidebarOpen: (arg: boolean) => void;
// }

const menuGroups: SidebarItemType[] = [
  {
    name: "MENU",
    menuItems: [
      {
        icon: (
          <svg width="27.5" height="22" viewBox="0 0 28 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.5678 8.6675L12.2216 4.6675C12.0623 4.567 11.8771 4.50928 11.6858 4.50052C11.4945 4.49176 11.3043 4.53227 11.1354 4.61774C10.9665 4.70321 10.8254 4.83043 10.727 4.98581C10.6287 5.1412 10.5768 5.31891 10.5769 5.5V13.5C10.5768 13.6811 10.6287 13.8588 10.727 14.0142C10.8254 14.1696 10.9665 14.2968 11.1354 14.3823C11.3043 14.4677 11.4945 14.5082 11.6858 14.4995C11.8771 14.4907 12.0623 14.433 12.2216 14.3325L18.5678 10.3325C18.7129 10.2412 18.8318 10.1175 18.9141 9.97222C18.9964 9.82698 19.0395 9.66477 19.0395 9.5C19.0395 9.33523 18.9964 9.17302 18.9141 9.02778C18.8318 8.88255 18.7129 8.75878 18.5678 8.6675ZM12.6923 11.6313V7.375L16.0743 9.5L12.6923 11.6313ZM25.3846 0.5H2.11538C1.55435 0.5 1.01629 0.710714 0.619582 1.08579C0.22287 1.46086 0 1.96957 0 2.5V16.5C0 17.0304 0.22287 17.5391 0.619582 17.9142C1.01629 18.2893 1.55435 18.5 2.11538 18.5H25.3846C25.9457 18.5 26.4837 18.2893 26.8804 17.9142C27.2771 17.5391 27.5 17.0304 27.5 16.5V2.5C27.5 1.96957 27.2771 1.46086 26.8804 1.08579C26.4837 0.710714 25.9457 0.5 25.3846 0.5ZM25.3846 16.5H2.11538V2.5H25.3846V16.5ZM27.5 21.5C27.5 21.7652 27.3886 22.0196 27.1902 22.2071C26.9919 22.3946 26.7228 22.5 26.4423 22.5H1.05769C0.777175 22.5 0.508147 22.3946 0.309791 22.2071C0.111435 22.0196 0 21.7652 0 21.5C0 21.2348 0.111435 20.9804 0.309791 20.7929C0.508147 20.6054 0.777175 20.5 1.05769 20.5H26.4423C26.7228 20.5 26.9919 20.6054 27.1902 20.7929C27.3886 20.9804 27.5 21.2348 27.5 21.5Z" fill="white" />
          </svg>

        ),
        label: "Training",
        route: "/training",
        isAdmin: true,
        isLocked: false,
      },
      {
        icon: (
          <svg width="27.5" height="22" viewBox="0 0 27 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0.5V12.3519H2.7V9.38889H10.8L13.5 6.42593L10.8 3.46296H2.7V0.5H0ZM24.3 0.5V3.46296H13.5L16.2 6.42593L13.5 9.38889H24.3V12.3519H27V0.5H24.3ZM13.5 12.3519C13.5 12.3519 10.8 15.5667 10.8 17.537C10.8 18.3229 11.0845 19.0765 11.5908 19.6322C12.0972 20.1878 12.7839 20.5 13.5 20.5C14.2161 20.5 14.9028 20.1878 15.4092 19.6322C15.9155 19.0765 16.2 18.3229 16.2 17.537C16.2 15.5667 13.5 12.3519 13.5 12.3519Z" fill="white" />
          </svg>
        ),
        label: "Leaked Credentials",
        route: "/leakded_credentials",
      },
      {
        icon: (
          <svg width="27.5" height="22" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.76923 22.7368V2.84211H12.4615V12.7895H22.1538V14.2105C23.1231 14.2105 24.0508 14.3953 24.9231 14.7079V8.52632L16.6154 0H2.76923C1.23231 0 0 1.26474 0 2.84211V22.7368C0 23.4906 0.291757 24.2135 0.811089 24.7465C1.33042 25.2795 2.03479 25.5789 2.76923 25.5789H14.3308C14.0262 24.6837 13.8462 23.7316 13.8462 22.7368H2.76923ZM15.2308 2.13158L22.8462 9.94737H15.2308V2.13158ZM27 20.25L20.4231 27L16.6154 22.7368L18.2215 21.0884L20.4231 23.3479L25.3938 18.2463L27 20.25Z" fill="white" />
          </svg>
        ),
        label: "Terms & Conditions",
        route: "/terms_conditions",
      },
      {
        icon: (
          <svg width="27.5" height="22" viewBox="0 0 27 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0.5V20.5H2.7V3.83333H16.2V20.5H18.9V17.1667H24.3V20.5H27V0.5H0ZM24.3 3.83333V7.16667H18.9V3.83333H24.3ZM18.9 13.8333V10.5H24.3V13.8333H18.9Z" fill="white" />
          </svg>
        ),
        label: "Helpdesk",
        route: "/helpdesk",
      },
      {
        icon: (
          <svg width="27.5" height="22" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 0C11.7272 0 9.97167 0.349188 8.33377 1.02763C6.69588 1.70606 5.20765 2.70047 3.95406 3.95406C1.42232 6.4858 0 9.91958 0 13.5C0 17.0804 1.42232 20.5142 3.95406 23.0459C5.20765 24.2995 6.69588 25.2939 8.33377 25.9724C9.97167 26.6508 11.7272 27 13.5 27C17.0804 27 20.5142 25.5777 23.0459 23.0459C25.5777 20.5142 27 17.0804 27 13.5C27 11.7272 26.6508 9.97167 25.9724 8.33377C25.2939 6.69588 24.2995 5.20765 23.0459 3.95406C21.7924 2.70047 20.3041 1.70606 18.6662 1.02763C17.0283 0.349188 15.2728 0 13.5 0ZM6.8445 21.978C7.425 20.763 10.962 19.575 13.5 19.575C16.038 19.575 19.575 20.763 20.1555 21.978C18.2643 23.484 15.9176 24.3027 13.5 24.3C10.989 24.3 8.6805 23.436 6.8445 21.978ZM22.086 20.0205C20.1555 17.6715 15.471 16.875 13.5 16.875C11.529 16.875 6.8445 17.6715 4.914 20.0205C3.47803 18.1501 2.69975 15.858 2.7 13.5C2.7 7.5465 7.5465 2.7 13.5 2.7C19.4535 2.7 24.3 7.5465 24.3 13.5C24.3 15.957 23.463 18.225 22.086 20.0205ZM13.5 5.4C10.881 5.4 8.775 7.506 8.775 10.125C8.775 12.744 10.881 14.85 13.5 14.85C16.119 14.85 18.225 12.744 18.225 10.125C18.225 7.506 16.119 5.4 13.5 5.4ZM13.5 12.15C12.9629 12.15 12.4479 11.9367 12.0681 11.5569C11.6883 11.1771 11.475 10.6621 11.475 10.125C11.475 9.58794 11.6883 9.07287 12.0681 8.69311C12.4479 8.31335 12.9629 8.1 13.5 8.1C14.0371 8.1 14.5521 8.31335 14.9319 8.69311C15.3117 9.07287 15.525 9.58794 15.525 10.125C15.525 10.6621 15.3117 11.1771 14.9319 11.5569C14.5521 11.9367 14.0371 12.15 13.5 12.15Z" fill="white" />
          </svg>
        ),
        label: "Profile",
        route: "/profile",
      },
      {
        icon: (
          <svg width="27.5" height="22" viewBox="0 0 28 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.5678 8.6675L12.2216 4.6675C12.0623 4.567 11.8771 4.50928 11.6858 4.50052C11.4945 4.49176 11.3043 4.53227 11.1354 4.61774C10.9665 4.70321 10.8254 4.83043 10.727 4.98581C10.6287 5.1412 10.5768 5.31891 10.5769 5.5V13.5C10.5768 13.6811 10.6287 13.8588 10.727 14.0142C10.8254 14.1696 10.9665 14.2968 11.1354 14.3823C11.3043 14.4677 11.4945 14.5082 11.6858 14.4995C11.8771 14.4907 12.0623 14.433 12.2216 14.3325L18.5678 10.3325C18.7129 10.2412 18.8318 10.1175 18.9141 9.97222C18.9964 9.82698 19.0395 9.66477 19.0395 9.5C19.0395 9.33523 18.9964 9.17302 18.9141 9.02778C18.8318 8.88255 18.7129 8.75878 18.5678 8.6675ZM12.6923 11.6313V7.375L16.0743 9.5L12.6923 11.6313ZM25.3846 0.5H2.11538C1.55435 0.5 1.01629 0.710714 0.619582 1.08579C0.22287 1.46086 0 1.96957 0 2.5V16.5C0 17.0304 0.22287 17.5391 0.619582 17.9142C1.01629 18.2893 1.55435 18.5 2.11538 18.5H25.3846C25.9457 18.5 26.4837 18.2893 26.8804 17.9142C27.2771 17.5391 27.5 17.0304 27.5 16.5V2.5C27.5 1.96957 27.2771 1.46086 26.8804 1.08579C26.4837 0.710714 25.9457 0.5 25.3846 0.5ZM25.3846 16.5H2.11538V2.5H25.3846V16.5ZM27.5 21.5C27.5 21.7652 27.3886 22.0196 27.1902 22.2071C26.9919 22.3946 26.7228 22.5 26.4423 22.5H1.05769C0.777175 22.5 0.508147 22.3946 0.309791 22.2071C0.111435 22.0196 0 21.7652 0 21.5C0 21.2348 0.111435 20.9804 0.309791 20.7929C0.508147 20.6054 0.777175 20.5 1.05769 20.5H26.4423C26.7228 20.5 26.9919 20.6054 27.1902 20.7929C27.3886 20.9804 27.5 21.2348 27.5 21.5Z" fill="white" />
          </svg>
        ),
        label: "Notifications",
        route: "/notifications",
      },
      {
        icon: (
          <svg width="27.5" height="22" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.4999 8.1C14.9719 8.1 16.3836 8.66893 17.4245 9.68162C18.4654 10.6943 19.0501 12.0678 19.0501 13.5C19.0501 14.9322 18.4654 16.3057 17.4245 17.3184C16.3836 18.3311 14.9719 18.9 13.4999 18.9C12.0278 18.9 10.6161 18.3311 9.57523 17.3184C8.53435 16.3057 7.94959 14.9322 7.94959 13.5C7.94959 12.0678 8.53435 10.6943 9.57523 9.68162C10.6161 8.66893 12.0278 8.1 13.4999 8.1ZM13.4999 10.8C12.7639 10.8 12.058 11.0845 11.5375 11.5908C11.0171 12.0972 10.7247 12.7839 10.7247 13.5C10.7247 14.2161 11.0171 14.9028 11.5375 15.4092C12.058 15.9155 12.7639 16.2 13.4999 16.2C14.2359 16.2 14.9417 15.9155 15.4622 15.4092C15.9826 14.9028 16.275 14.2161 16.275 13.5C16.275 12.7839 15.9826 12.0972 15.4622 11.5908C14.9417 11.0845 14.2359 10.8 13.4999 10.8ZM10.7247 27C10.3778 27 10.0864 26.757 10.0309 26.433L9.51754 22.8555C8.64337 22.518 7.89408 22.059 7.17255 21.519L3.7175 22.8825C3.41223 22.9905 3.03759 22.8825 2.87108 22.5855L0.0959374 17.9145C0.011012 17.7754 -0.0189273 17.611 0.0117183 17.452C0.0423639 17.2929 0.131496 17.1502 0.262446 17.0505L3.19022 14.8095L3.09309 13.5L3.19022 12.15L0.262446 9.9495C0.131496 9.84978 0.0423639 9.70707 0.0117183 9.54805C-0.0189273 9.38903 0.011012 9.2246 0.0959374 9.0855L2.87108 4.4145C3.03759 4.1175 3.41223 3.996 3.7175 4.1175L7.17255 5.4675C7.89408 4.941 8.64337 4.482 9.51754 4.1445L10.0309 0.567C10.0864 0.243 10.3778 0 10.7247 0H16.275C16.6219 0 16.9133 0.243 16.9688 0.567L17.4822 4.1445C18.3564 4.482 19.1056 4.941 19.8272 5.4675L23.2822 4.1175C23.5875 3.996 23.9621 4.1175 24.1287 4.4145L26.9038 9.0855C27.0842 9.3825 27.0009 9.747 26.7373 9.9495L23.8095 12.15L23.9066 13.5L23.8095 14.85L26.7373 17.0505C27.0009 17.253 27.0842 17.6175 26.9038 17.9145L24.1287 22.5855C23.9621 22.8825 23.5875 23.004 23.2822 22.8825L19.8272 21.5325C19.1056 22.059 18.3564 22.518 17.4822 22.8555L16.9688 26.433C16.9133 26.757 16.6219 27 16.275 27H10.7247ZM12.4592 2.7L11.9458 6.2235C10.2807 6.561 8.80988 7.425 7.74145 8.6265L4.39741 7.2225L3.35673 8.9775L6.2845 11.07C5.72947 12.645 5.72947 14.355 6.2845 15.93L3.34285 18.036L4.38353 19.791L7.75533 18.387C8.82376 19.575 10.2807 20.439 11.9319 20.763L12.4453 24.3H14.5544L15.0678 20.7765C16.719 20.439 18.176 19.575 19.2444 18.387L22.6162 19.791L23.6569 18.036L20.7152 15.9435C21.2703 14.364 21.2703 12.6495 20.7152 11.07L23.643 8.9775L22.6023 7.2225L19.2583 8.6265C18.168 7.39844 16.689 6.55786 15.0539 6.237L14.5405 2.7H12.4592Z" fill="white" />
          </svg>
        ),
        label: "Settings",
        route: "/settings",
      }
    ],
  }
];

const Sidebar = () => {
  const pathname = usePathname();
  const [pageName, setPageName] = useLocalStorage("selectedMenu", "dashboard");
  
  const sidebarOpen = useAppSelector(state => state.sidebarConfig.sidebarOpen);

  const dashboardVisited = useAppSelector(state => state.dashboardVisitedConfig.dashboardVisited);

  const routeVisited = useAppSelector((state) => {
    state.routeVisitedConfig.routeVisited
    const routes = state.routeVisitedConfig.routeVisited;
    return routes[routes.length - 1];
  });

  const routeVisitedArray = useAppSelector(state => state.routeVisitedConfig.routeVisited);


  const dispatch = useAppDispatch();

  function handlesidebarOpen(e : React.MouseEvent<HTMLDivElement>){
    dispatch(setSidebar({sidebarOpen : !sidebarOpen}));
  };

  const router = useRouter()

  useEffect(()=>{

    if(dashboardVisited){
      if( pathname === '/' || routeVisitedArray.length === 1){
        router.push(`/training`);
      }
      else{
        router.push(`${routeVisited}`);
        console.log(routeVisitedArray);        
      }
      // else{
      //   if(routeVisited !== pathname)
      //   router.push(`${routeVisited}`);
      //   // dispatch(setRoute(pathname));
      // }
    }
    else{
      dispatch(setDashboard({dashboardVisited : true}));
    }

  },[]);

  return (
    <ClickOutside onClick={() => {}}>
      <div className={styles.sidebar + " " + styles.sidebarBgColor} style={sidebarOpen ? {width: 'fit-content'} : {}}>
        <div className={styles.logo}>
          {
            sidebarOpen ? 
          <Image src="/micrologo.svg" alt="secdesk micro logo" className={styles.secdesk_micro_logo} width={47.55} height={47.55} />
            :
          <Image src="/secdesk_logo.svg" alt="secdesk logo" className={styles.secdesk_logo} width={179} height={47.55} />
          }
        </div>
        {/* Add all sidebar items */}
        <div className={styles.sideBarItemDiv}>
          {
            menuGroups.map((group, groupIndex) => (
              <div key={groupIndex} className={styles.sideBarItems}>
                <ul className={styles.sideBarItem}>
                  {group.menuItems.map((menuItem, menuIndex) => (
                    <SidebarItem
                      key={menuIndex}
                      item={menuItem}
                      pageName={pageName}
                      setPageName={setPageName}
                      sidebarOpen={sidebarOpen}
                    />
                  ))}
                </ul>
              </div>
            ))

          }
        </div>

        {/* Add sidebarOpen button */}
        <div className={styles.sidebarOpen} onClick={handlesidebarOpen} style={sidebarOpen ? {gap: '0', justifyContent:'center'} : {justifyContent:'start'}}>
        <Image src="/collapse.svg" alt="sidebarOpen arrow" width={27.5} height={22} className={styles.sidebarOpenImg} style={sidebarOpen ? {transform:'rotate(180deg)'} : {}} />
        <span style={sidebarOpen ? {display:'none'} : {}} aria-label="">Collapse</span>
        </div>
  
      </div>
    </ClickOutside>
  );
};

export default Sidebar;
