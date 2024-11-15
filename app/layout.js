import "./globals.css";
import "@/styles/index.scss";
import Layout from "@/components/wrappers/Layout";
import localFont from "next/font/local";

export const pacaembu = localFont({
  src: "../public/fonts/Pacaembu.woff2",
  variable: "--t-font-family-global",
});

export const metadata = {
  title:
    "Free Stock Photos, Royalty Free Stock Images & Copyright Free Pictures | Mujmua",
  description:
    "Free stock photos & videos you can use everywhere. Browse millions of high-quality royalty free stock images & copyright free pictures. No attribution required.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${pacaembu.variable}`}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
