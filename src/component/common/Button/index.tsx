'use client';
import Image from 'next/image';
import styles from './styles.module.css';
import { useRef, useEffect } from "react";
import { useAppDispatch } from '@store/store';
import { useAppSelector } from '@store/store';
import { isMobile } from "@util/index";
interface ButtonProps {
  id?: string;
  label: string;
  action_svg: string;
  svg_height?: number;
  svg_width?: number;
  hc?: Function;
}

const Button: React.FC<ButtonProps> = ({ label, action_svg, svg_height = 18, svg_width = 18, hc, id }) => {


  const elementRef = useRef<HTMLButtonElement>(null);
  const dispatch = useAppDispatch();
  useEffect(() => {
    function handleResize() {
      let rect = elementRef?.current?.getBoundingClientRect() || { top: 0, height: 0, right: 0, left: 0 , width: 0};
      //read the position of the button from the localStorage with key 'nav_bar_button_coordinates
    }

    handleResize(); // initial call to get position of the element on mount
    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <button className={styles.button} ref={elementRef} aria-label={`${label} button`} onClick={(e) => {
        if (hc) hc(e);
      }}>
        {label}
        <Image
          src={`/${action_svg}`}
          alt={`${label} icon`}
          width={svg_width}
          height={svg_height}
        // className={styles.}
        />
      </button>

    </>)
}

export default Button;
