# Realm - Game Design Document

## Wat is Realm?

Realm is een mobiele productiviteitsapp met een echte game-laag. 
Je krijgt elke dag een opdracht met een timer. Die timer loopt 
alleen als je in de app bent. Ga je weg, stopt de timer. 
Voltooi je de opdracht? Je krijgt een kist. In die kist zitten 
helden en resources. Met die helden val je andere dorpen aan 
in een half-actief gevecht. Je dorp produceert resources terwijl 
je offline bent.

## De elevator pitch

"Realm is de enige game waar je écht iets moet verdienen 
voordat je kan spelen. Doe je dagelijkse opdracht, open je 
kist, en val andere dorpen aan met je helden."

## Waarom dit uniek is

Geen enkele andere game koppelt echte focus-tijd aan 
game-progressie. Forest laat een boom groeien maar je 
kan er niks mee. Clash Royale geeft je alles gratis. 
Realm combineert de twee: je moet echt iets doen in het 
echte leven om vooruit te komen in de game. Dat is de USP. 
Dat is wat Realm anders maakt dan alles wat er al is.

## De core game loop

1. Speler opent Realm. Ziet zijn dorp. Ziet dagelijkse opdracht.
2. Speler start opdracht. Timer loopt fullscreen. 
   Als speler de app verlaat: timer stopt automatisch. 
   Speler moet terugkomen en doorgaan. Timer hervat waar 
   hij was gebleven maar telt niet door op de achtergrond.
3. Timer voltooid. Kist-opening animatie. Helden en 
   resources komen eruit.
4. Speler beheert dorp. Bewoners produceren resources 
   offline (cap 8 uur).
5. Speler valt een ander dorp aan. Kiest helden, plaatst 
   ze op het veld in 60 seconden, gevecht speelt zich af.
6. Winst of verlies. Resources gewonnen of verloren. 
   Morgen opnieuw.

## De timer

Dit is de kern van Realm. De timer werkt als volgt:

- Fullscreen als hij loopt
- Detecteert als je de app verlaat (app goes to background)
- Stopt dan automatisch
- Bij terugkeer: timer staat stil waar je was
- Je kan de sessie hervatten maar de tijd loopt niet door
- Reclame speelt aan het begin van elke sessie (monetisatie)
- Voor 60-min opdracht: reclame ook halverwege

Dit is de validatie. Je kan niet vals spelen door de app 
weg te leggen. Je moet echt in de app zijn.

## Het dorp

Gebouwd met Antarcticbees Farm Tileset 4 Seasons (16x16 
pixel art, top-down). Het dorp is compleet aanwezig maar 
begint verlaten. Geen speler bouwt zelf dingen, het dorp 
is er al. Via opdrachten en kisten ontgrendel je bewoners 
die terugkomen naar hun huis.

### Bewoners (Antarcticbees NPC pack)
7 kern-bewoners. Elk met een eigen huis, routine, productie.

1. Boer - produceert graan
2. Visser - produceert vis  
3. Smid - produceert ijzer
4. Dokter - geeft heal-bonus aan helden
5. Elf-meisje - boost magische helden
6. Oude man - geeft dagelijkse bonus coins
7. Heks - vergroot kans op zeldzame kist-items

Bewoners produceren resources terwijl je offline bent. 
Cap op 8 uur. Resources worden gebruikt om helden te 
upgraden en het dorp te verbeteren.

### Seizoenen
Dorp verandert automatisch met echte seizoenen op basis 
van datum. Lente, zomer, herfst, winter hebben aparte 
visuele varianten in de pack.

## De helden (Antarcticbees RPG Characters pack)

7 helden die je kan pakken en upgraden. Elk met unieke 
stats en rol in het gevecht.

1. **Archer** - hoge schade op afstand, laag leven
2. **Dark Knight** - hoog leven, gemiddelde schade
3. **Fire Knight** - area damage, medium leven
4. **Samurai** - extreem hoge schade, laag leven
5. **Cloaked Figure** - dodge-kans, vergiftigt vijanden
6. **Mage** - hoogste schade maar laagste leven
7. **Healer** - healt andere helden, doet zelf geen schade

Elke held heeft stats: leven, schade, snelheid, 
speciale ability. Stats groeien met levels.

## De kisten

Na elke voltooide opdracht krijg je een kist. 
Kist-kwaliteit hangt af van opdracht-duur:

- 15 min = bronzen kist (common items, kleine kans op rare)
- 30 min = zilveren kist (rare items, kleine kans op epic)
- 60 min = gouden kist (epic items, kans op legendary)

### Wat zit er in een kist?
- Held-kaarten (om helden te ontgrendelen of levelen)
- Resources (graan, vis, ijzer, coins)
- Dorp-upgrades (bewoner-upgrades, huis-verbeteringen)
- Decoraties (cosmetisch, verhogen dorp-score)
- Seizoens-items (alleen dat seizoen beschikbaar)

### Kist-opening animatie
Scherm wordt donker. Kist staat in het midden. 
Speler tikt om te openen. Licht straalt door de randen 
(kleur geeft rarity aan). Kist opent met animatie. 
Items verschijnen één voor één met geluid.

## Het gevecht

### Hoe aanvallen werkt
Je ziet een lijst van andere spelers hun dorpen. 
Je ziet alleen publieke info: dorp-level, welke 
helden ze hebben, hoeveel resources ze hebben. 
Je kiest een dorp om aan te vallen.

Je hebt geen invloed op andere spelers hun dorpen. 
Zij kunnen niks doen tegen jouw aanval. 
Het is puur jouw helden vs hun automatische verdediging.

### Het aanvals-scherm
- Links: jouw kant van het veld
- Rechts: vijandelijk dorp met verdediging
- 60 seconden timer om helden te plaatsen
- Jij sleept helden naar het veld één voor één
- Geplaatste helden lopen automatisch naar de vijand
- Terwijl één held al vecht, kies je de volgende

### Skill zit in:
- Welke helden kies je (samurai voor hoge schade, 
  healer voor sustain)
- In welke volgorde plaats je ze
- Waar op het veld (links flank, midden, rechts)
- Formatie: wie absorbeert klappen, wie doet schade 
  van achter

### Gevecht animaties
Alle sprites uit de RPG Characters pack worden gebruikt:
- Walk animatie als held naar vijand loopt
- Attack animatie bij aanval
- Hurt animatie als held geraakt wordt  
- Defeated animatie als held sterft

### Uitkomst
Winst: je krijgt een deel van vijands resources
Verlies: je verliest niks maar krijgt ook niks
Helden hebben cooldown na gevecht (30 min) 
voor je ze weer kan gebruiken

## Skill-systeem

### Formatie (kern-skill)
Voor het aanvallen sleep je helden in een 3x3 grid.
Positie bepaalt rol in het gevecht:
- Voorste rij: absorbeert klappen, moet hoog leven hebben
- Middelste rij: balanced aanval en verdediging  
- Achterste rij: veilig maar minder effectief

Goede formaties leren is de skill-curve van Realm. 
Spelers die dit begrijpen winnen van sterkere dorpen. 
Spelers die random plaatsen verliezen van zwakkere dorpen.

### Held-synergieën
Sommige combinaties werken beter samen:
- Dark Knight vooraan + Mage achteraan = klassieke tank/carry
- Healer achteraan + twee Samurai = hoge schade met sustain
- Fire Knight midden = area damage raakt meerdere vijanden

Spelers ontdekken meta-combinaties. Topspelers vinden 
counter-formaties. Dit systeem leeft zichzelf in stand.

## Economie

### Valuta
- Coins: hoofdvaluta
- Grondstoffen: graan, vis, ijzer (geproduceerd door bewoners)
- Held-kaarten: voor ontgrendelen en levelen helden
- Shards: van dubbele kaarten, inwisselbaar voor specifieke items

### Resources gebruiken
- Held upgraden: kost held-kaarten + grondstoffen
- Bewoner upgraden: kost coins + grondstoffen
- Dorp-verbetering: kost coins

### Offline productie
Bewoners produceren resources per uur. Cap op 8 uur. 
Bij app-open: coins vliegen van huizen naar teller 
met animatie.

## Monetisatie

- Video-advertentie bij start van elke timer-sessie
- Video-advertentie halverwege 60-min sessies
- Realm Plus (3,99/maand): geen ads, 2x coins, 
  cosmetische extras
- Seizoens-battle-pass (5,99): extra kaarten, 
  dorp-thema's, exclusieve helden-skins
- NOOIT: held-kaarten kopen met geld, 
  coins kopen, pay-to-win

## Retentie-systemen

### Dagelijkse opdracht
Elke dag één opdracht. Altijd anders qua duur en thema. 
Timer stopt als je de app verlaat. Dit is niet onderhandelbaar.

### Streaks
- 3 dagen: bonus coins
- 7 dagen: zilveren kist garantie
- 14 dagen: gouden kist garantie  
- 30 dagen: exclusieve held
- 100 dagen: unieke titel + dorp-decoratie

### Dagelijkse aanval
Eén gratis aanval per dag. Extra aanvallen kosten 
resources of wachttijd. Dit limiteert hoe lang 
je per dag speelt maar zorgt dat je elke dag terugkomt.

### Push notifications
- "Je bewoners hebben X coins verdiend"
- "Je dagelijkse opdracht is klaar"
- "Iemand heeft je dorp aangevallen"
Maximum één per dag, slim getimed.

## Assets

Alle assets van dezelfde maker (Antarcticbees), 
zelfde stijl, 100% compatibel:

- Farm Tileset 4 Seasons: dorp, wereld, tiles
- NPC Characters: dorpsbewoners  
- RPG Characters: helden voor gevecht
- Locatie in project: /public/assets/

## Tech stack

- Framework: Next.js App Router, TypeScript
- Styling: Tailwind CSS v4
- Deploy: Vercel
- Database: Upstash Redis
- Rendering game-elementen: PixiJS
- Branch: main

## V1 scope (eerste 8 weken)

Week 1-2: Nieuw project aanmaken, statisch dorp 
bouwen met farm tileset, header UI.

Week 3: Timer bouwen met app-verlaat detectie, 
kist-opening animatie.

Week 4: Bewoners ontgrendelen via kisten, 
idle productie systeem.

Week 5-6: Helden-systeem, held-kaarten uit kisten, 
held-overzicht scherm.

Week 7-8: Aanvals-scherm met PixiJS, formatie-grid, 
gevecht animaties, uitkomst berekening.

## Wat NIET in v1 zit

- Seizoens-switch (v2)
- Battle-pass (v2)
- Realm Plus abonnement (v2)  
- Push notifications (v2)
- Leaderboards (v2)
- Held-synergieën visueel zichtbaar (v2)
- Meer dan 7 helden (v2, meer packs kopen)

## Naam

**Realm**

Kort, sterk, past bij het concept. 
Domeinnaam checken: realm.app of realmgame.app
