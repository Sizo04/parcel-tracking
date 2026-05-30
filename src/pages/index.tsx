import Navbar from "@/components/Navbar";
import Track from "@/components/Track";

export default function Home() {
  return (
    <>
      <header>
        <Navbar></Navbar>
      </header>
      <main className="bg-[var(--dark)]">
        <Track></Track>
      </main>
    </>
  );
}
