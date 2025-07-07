import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/Components/Navbar/Navbar";
import { Nunito_Sans } from "next/font/google";
import { ThemeProvider } from "@/Components/theme-provider";
import VerifyToken from "@/Context/VerifyToken";
import Footer from "@/Components/Footer/footer";


export const metadata: Metadata = {
  title: "Shop Easy",
  description: "Developed by Aymane Gzlibou",
};

const inter = Nunito_Sans({ weight: "400", subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // to resolve the probleme of appearance of the children under the navbar
    // we have to choice 1st: give a padding to the body 2nd: wrap the children in a main tag and give it a padding

    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <VerifyToken>
              <Navbar />

              <main className="mt-[60px]">{children}</main>

              <Footer/>
          </VerifyToken>
        </ThemeProvider>
      </body>
    </html>
  );
}
