import Navbar from "@/components/Navbar";
import Track from "@/components/Track";
import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className={dmSans.className}>
      <header>
        <Navbar></Navbar>
      </header>
      <main className=" min-h-screen bg-[var(--dark)]">
        <Track></Track>
      </main>
    </div>
  );
}
