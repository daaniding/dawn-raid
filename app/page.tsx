import BackgroundParticles from "@/components/home/BackgroundParticles";
import FloatingButtons from "@/components/home/FloatingButtons";
import Header from "@/components/home/Header";
import QuestCard from "@/components/home/QuestCard";
import StartButton from "@/components/home/StartButton";
import TabBar from "@/components/home/TabBar";

export default function Home() {
  return (
    <div className="flex min-h-[100svh] flex-col items-center" style={{ background: "var(--bg-dark)" }}>
      <div
        className="relative flex w-full flex-col vignette"
        style={{
          maxWidth: 430,
          minHeight: "100svh",
          background:
            "radial-gradient(ellipse at 50% 0%, #2d1a00 0%, var(--bg-mid) 35%, var(--bg-dark) 100%)",
        }}
      >
        <BackgroundParticles />

        <Header />

        <main
          className="relative z-10 flex flex-1 flex-col items-center justify-center gap-5"
          style={{ paddingBottom: 90 }}
        >
          <QuestCard />
          <StartButton />
        </main>

        <FloatingButtons />
        <TabBar />
      </div>
    </div>
  );
}
