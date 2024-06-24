import { NextPageContext } from 'next';
import Unauthorized from '../unauthorized/page'; // Adjust the import path based on your structure

import DefaultLayout from "@/component/Layouts/DefaultLayout";

function Error({ statusCode }: { statusCode: number }) {
    if (statusCode === 401 || statusCode === 404) {
        // Return the Unauthorized component for 401 errors
        return <Unauthorized />;
    }
    console.log(statusCode);

    // Handle other status codes or return a generic error message
    return (
        <DefaultLayout>
            <div className="mx-auto max-w-full">
                <div className="flex flex-col items-center justify-center min-h-screen">
                    <h1 className="text-4xl font-bold">401 - Unauthorized</h1>
                    <p className="mt-4">Sorry, you do not have access to this page.</p>
                    <p className="mt-4">
                        {statusCode
                            ? `An error ${statusCode} occurred on server`
                            : 'An error occurred on client'}</p>
                    <a href="/" className="mt-6 text-blue-500 hover:text-blue-700">Go back home</a>
                </div>
            </div>
        </DefaultLayout>
    );
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode };
};

export default Error;
