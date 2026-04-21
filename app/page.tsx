import BackgroundParticles from "@/components/home/BackgroundParticles";
import ChestSlots from "@/components/home/ChestSlots";
import FloatingButtons from "@/components/home/FloatingButtons";
import Header from "@/components/home/Header";
import NpcParade from "@/components/home/NpcParade";
import QuestCard from "@/components/home/QuestCard";
import StartButton from "@/components/home/StartButton";
import TabBar from "@/components/home/TabBar";
import VillageSilhouette from "@/components/home/VillageSilhouette";
import DagelijksOpdracht from "@/components/modals/DagelijksOpdracht";
import DebugResetButton from "@/components/home/DebugResetButton";

export default function Home() {
  return (
    <div
      className="flex min-h-[100svh] flex-col items-center"
      style={{ background: "var(--bg-dark)" }}
    >
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
        <VillageSilhouette />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0"
          style={{
            bottom: 60,
            height: 260,
            zIndex: 1,
            background:
              "radial-gradient(ellipse at 50% 100%, rgba(255, 179, 71, 0.08) 0%, rgba(255, 179, 71, 0) 65%)",
          }}
        />

        <Header />

        <main
          className="relative z-10 flex flex-1 flex-col items-center justify-center gap-5"
          style={{ paddingBottom: 90 }}
        >
          <QuestCard />
          <StartButton />
        </main>

        <NpcParade />
        <ChestSlots />
        <FloatingButtons />
        <TabBar />
        <DagelijksOpdracht />
        <DebugResetButton />
      </div>
    </div>
  );
}
