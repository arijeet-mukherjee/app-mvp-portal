import DefaultLayout from "@/component/Layouts/DefaultLayout";
import Unauthorized from '../unauthorized/page'; // Ensure you have this component imported

// You can still define BlockedProps for internal use or documentation purposes
interface BlockedProps {
  statusCode?: number;
}

// Type the component props as any to ensure compatibility with Next.js
const Blocked: React.FC<any> = (props) => {
    const { statusCode } = props as BlockedProps;

    if (statusCode === 401 || statusCode === 404) {
        // Return the Unauthorized component for 401 errors
        return <Unauthorized />;
    }

    // Handle other status codes or return a generic error message
    return (
        <DefaultLayout>
            <div className="mx-auto max-w-full">
                <div className="flex flex-col items-center justify-center min-h-screen">
                    <h1 className="text-4xl font-bold">Error</h1>
                    <p className="mt-4">
                        {statusCode ? `Error ${statusCode}` : "An error occurred"}
                    </p>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default Blocked;
