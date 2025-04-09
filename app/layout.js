// app/layout.js
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata = {
  title: "Lendra's Portfolio",
  description: "Website pribadi Lendra Afrizan Musadad",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="transition-colors duration-300">
        <Navbar />
        <main className="min-h-screen px-4 py-6">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
