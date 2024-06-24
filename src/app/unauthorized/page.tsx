import Breadcrumb from "@/component/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/component/Layouts/DefaultLayout";
import Link from "next/link";

export const metadata: Metadata = {
    title: "SeckDesk Unauthorized | MVP Portal",
    description:
        "This is MVP Portal",
};

const Unauthorized = () => {
    return (
        <DefaultLayout>
            <div className="mx-auto max-w-full">
                <div className="flex flex-col items-center justify-center min-h-screen">
                    <h1 className="text-4xl font-bold">401 - Unauthorized</h1>
                    <p className="mt-4">Sorry, you do not have access to this page.</p>
                    <a href="/" className="mt-6 text-blue-500 hover:text-blue-700">Go back home</a>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default Unauthorized;
