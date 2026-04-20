// Group A (1,3,5,7 → indices 0,2,4,6): right → left, delays 0/4/8/12s
// Group B (2,4,6 → indices 1,3,5):     left → right, delays 2/6/10s, sprite mirrored
type NPC = {
  name: string;
  direction: "rtl" | "ltr";
  delay: number;
};

const NPCS: NPC[] = [
  { name: "angler",  direction: "rtl", delay: 0 },
  { name: "doctor",  direction: "ltr", delay: 2 },
  { name: "girl1",   direction: "rtl", delay: 4 },
  { name: "girl2",   direction: "ltr", delay: 6 },
  { name: "old_man", direction: "rtl", delay: 8 },
  { name: "smith",   direction: "ltr", delay: 10 },
  { name: "witch",   direction: "rtl", delay: 12 },
];

const BASE = "/assets/npcs/walk/spritesheet%20format";

export default function NpcParade() {
  return (
    <div
      aria-hidden
      className="fixed left-0 right-0 pointer-events-none overflow-hidden"
      style={{
        bottom: 75,
        height: 100,
        zIndex: 5,
      }}
    >
      {NPCS.map((npc) => (
        <div
          key={npc.name}
          className={`parade-npc${npc.direction === "ltr" ? " ltr" : ""}`}
          style={{
            backgroundImage: `url("${BASE}/${npc.name}_walk_left-Sheet.png")`,
            animationDelay: `${npc.delay}s, 0s`,
          }}
        />
      ))}
    </div>
  );
}
