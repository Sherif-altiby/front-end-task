import Navbar from "@/components/layout/Navbar";
import QueryProviders from "@/components/query-provider";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import { ReduxProvider } from "@/store/provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>

        <ReduxProvider>
          <QueryProviders>
            <Navbar />
            <div className="container" >
              {children}
            </div>
            <ToastContainer position="top-right" />
          </QueryProviders>

        </ReduxProvider>
      </body>
    </html>
  );
}