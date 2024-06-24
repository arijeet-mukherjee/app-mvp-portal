'use client'
import React, { useState, useRef, useCallback } from "react";
import dynamic from 'next/dynamic';
import styles from './app.module.css';
import useOnScreen from "@/hooks/useOnScreen";
import { isMobile, goTo } from "@util/index";
import { useAppSelector } from "@store/store";
import DefaultLayout from "@component/Layouts/DefaultLayout";

export default function Home() {
  const globalLanguage = useAppSelector<any>(state => state.globalLanguage);
  const data = require(`../data/${globalLanguage.globalLanguage}.json`);
  return (
    <>
      <DefaultLayout>
          under development
      </DefaultLayout>
    </>
  );
}
