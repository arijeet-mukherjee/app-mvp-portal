"use client";
import "@/css/satoshi.css";
import "@/css/style.css";
import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="../../micrologo.svg" />
      </head>
      <body suppressHydrationWarning={true} className="body">
        <div className="dark:bg-boxdark-2 dark:text-bodydark grid grid-cols-1">
          {children}
        </div>
      </body>
    </html>
  );
}
