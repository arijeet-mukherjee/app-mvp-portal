
import Breadcrumb from "@/component/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/component/Layouts/DefaultLayout";
import Link from "next/link";
import CardBox from "@/component/common/cardBox";
import data from "@/data/EN.json";
import styles from "./cardbox.module.css"
import { useEffect, useState } from "react";
import { makeWebServiceCall } from "@util/index";
import TrainingVideoBox from "@/component/TrainingVideoBox/TrainingVideo";

export const metadata: Metadata = {
    title: "SeckDesk Training | MVP Portal",
    description:
        "This is MVP Portal",
};


const Training = () => {
    return (
        <DefaultLayout>
            <div className="p-19 max-w-full max-h-full overflow-y-auto">
                <TrainingVideoBox/>
                </div>
        </DefaultLayout>
    );
};

export default Training;
