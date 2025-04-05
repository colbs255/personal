import "./globals.css";
import "./highlightjs.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Navbar } from "./components/navbar";
import Footer from "./components/footer";

export const metadata: Metadata = {
    title: "Colby Chance",
    description: "My personal website",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="en"
            className={`text-black bg-white dark:text-white dark:bg-black ${GeistSans.variable} ${GeistMono.variable}`}
        >
            <body className="antialiased max-w-xl mx-4 mt-8 lg:mx-auto">
                <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
                    <Navbar />
                    {children}
                    <Footer />
                </main>
            </body>
        </html>
    );
}
