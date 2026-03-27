import Navbar from "@/components/layout/Navbar";
import "./globals.css";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Image Classes Rank Predictor",
  description: "Predict your rank instantly",
};

export default function RootLayout({ children }:{
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0f0f0f] text-white">

        <Navbar />
        {children}
        <Footer />

      </body>
    </html>
  );
}