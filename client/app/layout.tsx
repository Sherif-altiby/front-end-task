import Navbar from "@/components/layout/Navbar";
import Providers from "@/components/query-provider";
import "./globals.css";
import { ToastContainer } from "react-toastify";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        
          <Providers>
            <Navbar />
             <div className="container" >
                 {children}
             </div>
             <ToastContainer position="top-right" />
          </Providers>
       </body>
    </html>
  );
}