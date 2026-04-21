export interface Opdracht {
  id: number;
  titel: string;
  duur: 5 | 15 | 30 | 60;
  categorie: "fysiek" | "comfortzone" | "leren" | "creatief";
  coins: number;
}

export const opdrachten: Opdracht[] = [
  // ===== 5 MINUTEN =====

  // Fysiek (15)
  { id: 1, duur: 5, categorie: "fysiek", coins: 25, titel: "Doe 5 minuten lang zo veel mogelijk push-ups" },
  { id: 2, duur: 5, categorie: "fysiek", coins: 25, titel: "Doe 5 minuten lang zo veel mogelijk squats" },
  { id: 3, duur: 5, categorie: "fysiek", coins: 25, titel: "Doe 5 minuten lang zo veel mogelijk burpees" },
  { id: 4, duur: 5, categorie: "fysiek", coins: 25, titel: "Houd een plank zo lang mogelijk, herhaal 5 minuten lang" },
  { id: 5, duur: 5, categorie: "fysiek", coins: 25, titel: "Doe 5 minuten lang non-stop jumping jacks" },
  { id: 6, duur: 5, categorie: "fysiek", coins: 25, titel: "Sprint 30 seconden, rust 30 seconden, 5 minuten lang" },
  { id: 7, duur: 5, categorie: "fysiek", coins: 25, titel: "Doe 5 minuten lang non-stop sit-ups" },
  { id: 8, duur: 5, categorie: "fysiek", coins: 25, titel: "Houd een wall-sit zo lang mogelijk, herhaal 5 minuten" },
  { id: 9, duur: 5, categorie: "fysiek", coins: 25, titel: "Doe 5 minuten lang non-stop schaduwboksen" },
  { id: 10, duur: 5, categorie: "fysiek", coins: 25, titel: "Spring zo hoog mogelijk, non-stop 5 minuten lang" },
  { id: 11, duur: 5, categorie: "fysiek", coins: 25, titel: "Doe 5 minuten lang non-stop lunges" },
  { id: 12, duur: 5, categorie: "fysiek", coins: 25, titel: "Doe 5 minuten lang non-stop high knees" },
  { id: 13, duur: 5, categorie: "fysiek", coins: 25, titel: "Doe 5 minuten lang elke minuut wisselen tussen push-ups en squats" },
  { id: 14, duur: 5, categorie: "fysiek", coins: 25, titel: "Balanceer 5 minuten op één been, wissel elke 30 seconden" },
  { id: 15, duur: 5, categorie: "fysiek", coins: 25, titel: "Doe 5 minuten lang non-stop mountain climbers" },

  // Comfort zone (15)
  { id: 16, duur: 5, categorie: "comfortzone", coins: 25, titel: "Neem een ijskoude douche van precies 5 minuten" },
  { id: 17, duur: 5, categorie: "comfortzone", coins: 25, titel: "Doe 5 minuten lang alles met je niet-dominante hand" },
  { id: 18, duur: 5, categorie: "comfortzone", coins: 25, titel: "Zit 5 minuten compleet stil zonder je telefoon aan te raken" },
  { id: 19, duur: 5, categorie: "comfortzone", coins: 25, titel: "Loop 5 minuten lang alleen op je tenen" },
  { id: 20, duur: 5, categorie: "comfortzone", coins: 25, titel: "Loop 5 minuten lang achteruit" },
  { id: 21, duur: 5, categorie: "comfortzone", coins: 25, titel: "Doe 5 minuten lang alles zo langzaam mogelijk" },
  { id: 22, duur: 5, categorie: "comfortzone", coins: 25, titel: "Houd je ogen dicht en loop 5 minuten door je kamer" },
  { id: 23, duur: 5, categorie: "comfortzone", coins: 25, titel: "Schrijf 5 minuten non-stop zonder te stoppen of te corrigeren" },
  { id: 24, duur: 5, categorie: "comfortzone", coins: 25, titel: "Loop 5 minuten lang alleen op je hielen" },
  { id: 25, duur: 5, categorie: "comfortzone", coins: 25, titel: "Doe 5 minuten lang alles met je ogen dicht" },
  { id: 26, duur: 5, categorie: "comfortzone", coins: 25, titel: "Zing 5 minuten lang hardop mee met een liedje" },
  { id: 27, duur: 5, categorie: "comfortzone", coins: 25, titel: "Doe 5 minuten lang bewegen als een dier naar keuze" },
  { id: 28, duur: 5, categorie: "comfortzone", coins: 25, titel: "Houd je adem zo lang mogelijk in, herhaal 5 minuten" },
  { id: 29, duur: 5, categorie: "comfortzone", coins: 25, titel: "Doe 5 minuten lang alles in slow motion" },
  { id: 30, duur: 5, categorie: "comfortzone", coins: 25, titel: "Sta 5 minuten lang buiten zonder je telefoon" },

  // Leren (15)
  { id: 31, duur: 5, categorie: "leren", coins: 25, titel: "Oefen 5 minuten lang een kaarttruc met een gewoon kaartspel" },
  { id: 32, duur: 5, categorie: "leren", coins: 25, titel: "Oefen 5 minuten lang hoe je een munt over je knokkels laat rollen" },
  { id: 33, duur: 5, categorie: "leren", coins: 25, titel: "Oefen 5 minuten lang hoe je fluit met je vingers" },
  { id: 34, duur: 5, categorie: "leren", coins: 25, titel: "Oefen 5 minuten lang hoe je een pen over je vingers rolt" },
  { id: 35, duur: 5, categorie: "leren", coins: 25, titel: "Oefen 5 minuten lang hoe je een papiervliegtuig vouwt dat ver vliegt" },
  { id: 36, duur: 5, categorie: "leren", coins: 25, titel: "Oefen 5 minuten lang hoe je een origami ster vouwt van een A4 vel" },
  { id: 37, duur: 5, categorie: "leren", coins: 25, titel: "Oefen 5 minuten lang hoe je een schaduwpop maakt met je handen" },
  { id: 38, duur: 5, categorie: "leren", coins: 25, titel: "Oefen 5 minuten lang hoe je beatboxt" },
  { id: 39, duur: 5, categorie: "leren", coins: 25, titel: "Oefen 5 minuten lang hoe je een portret schetst op papier" },
  { id: 40, duur: 5, categorie: "leren", coins: 25, titel: "Oefen 5 minuten lang hoe je een handstand houdt tegen de muur" },
  { id: 41, duur: 5, categorie: "leren", coins: 25, titel: "Oefen 5 minuten lang hoe je jongleert met drie sinaasappels of appels" },
  { id: 42, duur: 5, categorie: "leren", coins: 25, titel: "Oefen 5 minuten lang hoe je morse code schrijft met tik geluiden" },
  { id: 43, duur: 5, categorie: "leren", coins: 25, titel: "Oefen 5 minuten lang hoe je een touw knoop legt" },
  { id: 44, duur: 5, categorie: "leren", coins: 25, titel: "Oefen 5 minuten lang hoe je een kaartenhuis bouwt" },
  { id: 45, duur: 5, categorie: "leren", coins: 25, titel: "Oefen 5 minuten lang hoe je een specifieke dans move doet" },

  // Creatief (15)
  { id: 46, duur: 5, categorie: "creatief", coins: 25, titel: "Schrijf 5 minuten non-stop een verhaal zonder te stoppen" },
  { id: 47, duur: 5, categorie: "creatief", coins: 25, titel: "Teken 5 minuten lang je omgeving zo gedetailleerd mogelijk" },
  { id: 48, duur: 5, categorie: "creatief", coins: 25, titel: "Schrijf 5 minuten lang een rap over je dag" },
  { id: 49, duur: 5, categorie: "creatief", coins: 25, titel: "Teken 5 minuten lang zonder je pen van het papier te halen" },
  { id: 50, duur: 5, categorie: "creatief", coins: 25, titel: "Schrijf 5 minuten lang een gedicht" },
  { id: 51, duur: 5, categorie: "creatief", coins: 25, titel: "Teken 5 minuten lang zo veel mogelijk gezichten" },
  { id: 52, duur: 5, categorie: "creatief", coins: 25, titel: "Schrijf 5 minuten lang een verhaal van slechts drie regels maar maak het perfect" },
  { id: 53, duur: 5, categorie: "creatief", coins: 25, titel: "Maak 5 minuten lang een kunstwerk van dingen die je om je heen vindt" },
  { id: 54, duur: 5, categorie: "creatief", coins: 25, titel: "Teken 5 minuten lang een kaart van de plek waar je bent" },
  { id: 55, duur: 5, categorie: "creatief", coins: 25, titel: "Schrijf 5 minuten lang een speech als je beroemd was" },
  { id: 56, duur: 5, categorie: "creatief", coins: 25, titel: "Teken 5 minuten lang alleen met cirkels" },
  { id: 57, duur: 5, categorie: "creatief", coins: 25, titel: "Schrijf 5 minuten lang een brief aan je jongere zelf" },
  { id: 58, duur: 5, categorie: "creatief", coins: 25, titel: "Teken 5 minuten lang een dier dat je nog nooit hebt getekend" },
  { id: 59, duur: 5, categorie: "creatief", coins: 25, titel: "Schrijf 5 minuten lang zo veel mogelijk rijmende woorden" },
  { id: 60, duur: 5, categorie: "creatief", coins: 25, titel: "Vouw 5 minuten lang zo veel mogelijk verschillende dingen van papier" },

  // ===== 15 MINUTEN =====

  // Fysiek (15)
  { id: 61, duur: 15, categorie: "fysiek", coins: 75, titel: "Ga 15 minuten hardlopen" },
  { id: 62, duur: 15, categorie: "fysiek", coins: 75, titel: "Doe 15 minuten lang non-stop schaduwboksen" },
  { id: 63, duur: 15, categorie: "fysiek", coins: 75, titel: "Doe 15 minuten lang elke minuut een andere oefening" },
  { id: 64, duur: 15, categorie: "fysiek", coins: 75, titel: "Doe 15 minuten lang non-stop jumping jacks" },
  { id: 65, duur: 15, categorie: "fysiek", coins: 75, titel: "Doe 15 minuten lang elke minuut 10 push-ups en 10 squats" },
  { id: 66, duur: 15, categorie: "fysiek", coins: 75, titel: "Doe 15 minuten lang non-stop burpees" },
  { id: 67, duur: 15, categorie: "fysiek", coins: 75, titel: "Doe 15 minuten lang een complete stretch routine" },
  { id: 68, duur: 15, categorie: "fysiek", coins: 75, titel: "Sprint 1 minuut, wandel 1 minuut, 15 minuten lang" },
  { id: 69, duur: 15, categorie: "fysiek", coins: 75, titel: "Doe 15 minuten lang non-stop lunges" },
  { id: 70, duur: 15, categorie: "fysiek", coins: 75, titel: "Doe 15 minuten lang elke minuut 15 squats en 10 sit-ups" },
  { id: 71, duur: 15, categorie: "fysiek", coins: 75, titel: "Doe 15 minuten lang non-stop mountain climbers" },
  { id: 72, duur: 15, categorie: "fysiek", coins: 75, titel: "Doe 15 minuten lang elke 30 seconden 5 burpees" },
  { id: 73, duur: 15, categorie: "fysiek", coins: 75, titel: "Balanceer 15 minuten op één been, wissel elke 2 minuten" },
  { id: 74, duur: 15, categorie: "fysiek", coins: 75, titel: "Loop 15 minuten lang alleen op je tenen" },
  { id: 75, duur: 15, categorie: "fysiek", coins: 75, titel: "Doe 15 minuten lang non-stop high knees" },

  // Comfort zone (15)
  { id: 76, duur: 15, categorie: "comfortzone", coins: 75, titel: "Neem een ijskoude douche van 15 minuten" },
  { id: 77, duur: 15, categorie: "comfortzone", coins: 75, titel: "Zit 15 minuten compleet stil zonder telefoon of muziek" },
  { id: 78, duur: 15, categorie: "comfortzone", coins: 75, titel: "Doe 15 minuten lang alles met je niet-dominante hand" },
  { id: 79, duur: 15, categorie: "comfortzone", coins: 75, titel: "Loop 15 minuten lang achteruit" },
  { id: 80, duur: 15, categorie: "comfortzone", coins: 75, titel: "Loop 15 minuten lang alleen op je hielen" },
  { id: 81, duur: 15, categorie: "comfortzone", coins: 75, titel: "Schrijf 15 minuten non-stop zonder te stoppen of te corrigeren" },
  { id: 82, duur: 15, categorie: "comfortzone", coins: 75, titel: "Doe 15 minuten lang alles zo langzaam mogelijk" },
  { id: 83, duur: 15, categorie: "comfortzone", coins: 75, titel: "Sta 15 minuten lang buiten zonder je telefoon" },
  { id: 84, duur: 15, categorie: "comfortzone", coins: 75, titel: "Doe 15 minuten lang iets wat je normaal altijd uitstelt" },
  { id: 85, duur: 15, categorie: "comfortzone", coins: 75, titel: "Loop 15 minuten lang alleen op je tenen" },
  { id: 86, duur: 15, categorie: "comfortzone", coins: 75, titel: "Zing 15 minuten lang hardop mee met liedjes" },
  { id: 87, duur: 15, categorie: "comfortzone", coins: 75, titel: "Doe 15 minuten lang alles in slow motion" },
  { id: 88, duur: 15, categorie: "comfortzone", coins: 75, titel: "Houd je ogen dicht en loop 15 minuten door je omgeving" },
  { id: 89, duur: 15, categorie: "comfortzone", coins: 75, titel: "Doe 15 minuten lang bewegen als een dier naar keuze" },
  { id: 90, duur: 15, categorie: "comfortzone", coins: 75, titel: "Doe 15 minuten lang alles met je ogen dicht" },

  // Leren (15)
  { id: 91, duur: 15, categorie: "leren", coins: 75, titel: "Oefen 15 minuten lang een kaarttruc totdat je hem perfect kan" },
  { id: 92, duur: 15, categorie: "leren", coins: 75, titel: "Oefen 15 minuten lang een handstand tegen de muur" },
  { id: 93, duur: 15, categorie: "leren", coins: 75, titel: "Oefen 15 minuten lang beatboxen" },
  { id: 94, duur: 15, categorie: "leren", coins: 75, titel: "Oefen 15 minuten lang jongleren met drie sinaasappels of appels" },
  { id: 95, duur: 15, categorie: "leren", coins: 75, titel: "Oefen 15 minuten lang hoe je een portret tekent" },
  { id: 96, duur: 15, categorie: "leren", coins: 75, titel: "Oefen 15 minuten lang hoe je een push-up doet met één arm" },
  { id: 97, duur: 15, categorie: "leren", coins: 75, titel: "Oefen 15 minuten lang morse code lezen en schrijven" },
  { id: 98, duur: 15, categorie: "leren", coins: 75, titel: "Oefen 15 minuten lang hoe je origami vouwt van gewoon papier" },
  { id: 99, duur: 15, categorie: "leren", coins: 75, titel: "Oefen 15 minuten lang hoe je landen herkent op een kaart" },
  { id: 100, duur: 15, categorie: "leren", coins: 75, titel: "Oefen 15 minuten lang hoe je een kaartenhuis bouwt" },
  { id: 101, duur: 15, categorie: "leren", coins: 75, titel: "Oefen 15 minuten lang hoe je freestyle rapt" },
  { id: 102, duur: 15, categorie: "leren", coins: 75, titel: "Oefen 15 minuten lang hoe je een munt over je knokkels laat rollen" },
  { id: 103, duur: 15, categorie: "leren", coins: 75, titel: "Oefen 15 minuten lang hoe je een specifieke dans move doet" },
  { id: 104, duur: 15, categorie: "leren", coins: 75, titel: "Oefen 15 minuten lang hoe je fluit met je vingers" },
  { id: 105, duur: 15, categorie: "leren", coins: 75, titel: "Oefen 15 minuten lang hoe je een touw knoop legt" },

  // Creatief (15)
  { id: 106, duur: 15, categorie: "creatief", coins: 75, titel: "Schrijf 15 minuten non-stop een verhaal" },
  { id: 107, duur: 15, categorie: "creatief", coins: 75, titel: "Teken 15 minuten lang een fantasiewereld" },
  { id: 108, duur: 15, categorie: "creatief", coins: 75, titel: "Schrijf 15 minuten lang de tekst van een volledig nummer" },
  { id: 109, duur: 15, categorie: "creatief", coins: 75, titel: "Teken 15 minuten lang een portret zo realistisch mogelijk" },
  { id: 110, duur: 15, categorie: "creatief", coins: 75, titel: "Schrijf 15 minuten lang een script voor een korte video" },
  { id: 111, duur: 15, categorie: "creatief", coins: 75, titel: "Maak 15 minuten lang een kunstwerk van alles om je heen" },
  { id: 112, duur: 15, categorie: "creatief", coins: 75, titel: "Teken 15 minuten lang een complete stad die je verzint" },
  { id: 113, duur: 15, categorie: "creatief", coins: 75, titel: "Schrijf 15 minuten lang een brief aan iemand die je inspireert" },
  { id: 114, duur: 15, categorie: "creatief", coins: 75, titel: "Teken 15 minuten lang alleen met je niet-dominante hand" },
  { id: 115, duur: 15, categorie: "creatief", coins: 75, titel: "Schrijf 15 minuten lang een stripverhaal van 6 vakjes" },
  { id: 116, duur: 15, categorie: "creatief", coins: 75, titel: "Teken 15 minuten lang een skyline van een stad die je verzint" },
  { id: 117, duur: 15, categorie: "creatief", coins: 75, titel: "Schrijf 15 minuten lang een rap over iets wat je bezighoudt" },
  { id: 118, duur: 15, categorie: "creatief", coins: 75, titel: "Vouw 15 minuten lang zo veel mogelijk originele dingen van papier" },
  { id: 119, duur: 15, categorie: "creatief", coins: 75, titel: "Teken 15 minuten lang een volledig karakter voor een game" },
  { id: 120, duur: 15, categorie: "creatief", coins: 75, titel: "Schrijf 15 minuten lang een gedicht over iets wat je ziet" },

  // ===== 30 MINUTEN =====

  // Fysiek (15)
  { id: 121, duur: 30, categorie: "fysiek", coins: 150, titel: "Ga 30 minuten hardlopen" },
  { id: 122, duur: 30, categorie: "fysiek", coins: 150, titel: "Doe 30 minuten lang een complete full body workout" },
  { id: 123, duur: 30, categorie: "fysiek", coins: 150, titel: "Doe 30 minuten lang non-stop schaduwboksen" },
  { id: 124, duur: 30, categorie: "fysiek", coins: 150, titel: "Doe 30 minuten lang interval training" },
  { id: 125, duur: 30, categorie: "fysiek", coins: 150, titel: "Doe 30 minuten lang een complete yoga sessie" },
  { id: 126, duur: 30, categorie: "fysiek", coins: 150, titel: "Doe 30 minuten lang elke 3 minuten een andere oefening" },
  { id: 127, duur: 30, categorie: "fysiek", coins: 150, titel: "Doe 30 minuten lang non-stop bewegen zonder dezelfde beweging twee keer" },
  { id: 128, duur: 30, categorie: "fysiek", coins: 150, titel: "Sprint 2 minuten, wandel 1 minuut, 30 minuten lang" },
  { id: 129, duur: 30, categorie: "fysiek", coins: 150, titel: "Doe 30 minuten lang een complete stretch routine" },
  { id: 130, duur: 30, categorie: "fysiek", coins: 150, titel: "Doe 30 minuten lang elke minuut 10 push-ups" },
  { id: 131, duur: 30, categorie: "fysiek", coins: 150, titel: "Doe 30 minuten lang non-stop lunges" },
  { id: 132, duur: 30, categorie: "fysiek", coins: 150, titel: "Doe 30 minuten lang elke 2 minuten 5 burpees en 10 squats" },
  { id: 133, duur: 30, categorie: "fysiek", coins: 150, titel: "Doe 30 minuten lang non-stop high knees" },
  { id: 134, duur: 30, categorie: "fysiek", coins: 150, titel: "Balanceer 30 minuten op één been, wissel elke 3 minuten" },
  { id: 135, duur: 30, categorie: "fysiek", coins: 150, titel: "Loop 30 minuten lang alleen op je tenen" },

  // Comfort zone (15)
  { id: 136, duur: 30, categorie: "comfortzone", coins: 150, titel: "Neem een ijskoude douche van 30 minuten" },
  { id: 137, duur: 30, categorie: "comfortzone", coins: 150, titel: "Zit 30 minuten compleet stil zonder telefoon of muziek" },
  { id: 138, duur: 30, categorie: "comfortzone", coins: 150, titel: "Doe 30 minuten lang alles met je niet-dominante hand" },
  { id: 139, duur: 30, categorie: "comfortzone", coins: 150, titel: "Loop 30 minuten lang achteruit" },
  { id: 140, duur: 30, categorie: "comfortzone", coins: 150, titel: "Schrijf 30 minuten non-stop zonder te stoppen of te corrigeren" },
  { id: 141, duur: 30, categorie: "comfortzone", coins: 150, titel: "Doe 30 minuten lang iets wat je normaal altijd vermijdt" },
  { id: 142, duur: 30, categorie: "comfortzone", coins: 150, titel: "Sta 30 minuten lang buiten zonder je telefoon" },
  { id: 143, duur: 30, categorie: "comfortzone", coins: 150, titel: "Doe 30 minuten lang alles zo langzaam mogelijk" },
  { id: 144, duur: 30, categorie: "comfortzone", coins: 150, titel: "Loop 30 minuten lang alleen op je hielen" },
  { id: 145, duur: 30, categorie: "comfortzone", coins: 150, titel: "Zing 30 minuten lang hardop mee met liedjes" },
  { id: 146, duur: 30, categorie: "comfortzone", coins: 150, titel: "Doe 30 minuten lang alles in slow motion" },
  { id: 147, duur: 30, categorie: "comfortzone", coins: 150, titel: "Doe 30 minuten lang iets wat je al jaren wil proberen maar nooit doet" },
  { id: 148, duur: 30, categorie: "comfortzone", coins: 150, titel: "Doe 30 minuten lang bewegen als een dier naar keuze" },
  { id: 149, duur: 30, categorie: "comfortzone", coins: 150, titel: "Zit 30 minuten buiten op de grond zonder rugsteun" },
  { id: 150, duur: 30, categorie: "comfortzone", coins: 150, titel: "Doe 30 minuten lang alles met je ogen dicht" },

  // Leren (15)
  { id: 151, duur: 30, categorie: "leren", coins: 150, titel: "Oefen 30 minuten lang een kaarttruc totdat je hem voor iemand kan doen" },
  { id: 152, duur: 30, categorie: "leren", coins: 150, titel: "Oefen 30 minuten lang een vrije handstand" },
  { id: 153, duur: 30, categorie: "leren", coins: 150, titel: "Oefen 30 minuten lang beatboxen op een volledig nummer" },
  { id: 154, duur: 30, categorie: "leren", coins: 150, titel: "Oefen 30 minuten lang jongleren met drie sinaasappels of appels" },
  { id: 155, duur: 30, categorie: "leren", coins: 150, titel: "Oefen 30 minuten lang hoe je een realistisch portret tekent" },
  { id: 156, duur: 30, categorie: "leren", coins: 150, titel: "Oefen 30 minuten lang push-ups met één arm" },
  { id: 157, duur: 30, categorie: "leren", coins: 150, titel: "Oefen 30 minuten lang morse code tot je het uit je hoofd kan" },
  { id: 158, duur: 30, categorie: "leren", coins: 150, titel: "Oefen 30 minuten lang complexe origami figuren van gewoon papier" },
  { id: 159, duur: 30, categorie: "leren", coins: 150, titel: "Oefen 30 minuten lang landen en hoofdsteden uit je hoofd leren" },
  { id: 160, duur: 30, categorie: "leren", coins: 150, titel: "Oefen 30 minuten lang freestyle rappen" },
  { id: 161, duur: 30, categorie: "leren", coins: 150, titel: "Oefen 30 minuten lang hoe je een dans routine van begin tot eind doet" },
  { id: 162, duur: 30, categorie: "leren", coins: 150, titel: "Oefen 30 minuten lang hoe je een back-flip landing doet" },
  { id: 163, duur: 30, categorie: "leren", coins: 150, titel: "Oefen 30 minuten lang hoe je een kaartenhuis bouwt van meer dan 5 lagen" },
  { id: 164, duur: 30, categorie: "leren", coins: 150, titel: "Oefen 30 minuten lang hoe je een complete kaarttruc uitvoert voor een publiek" },
  { id: 165, duur: 30, categorie: "leren", coins: 150, titel: "Oefen 30 minuten lang hoe je een specifieke sport techniek correct uitvoert" },

  // Creatief (15)
  { id: 166, duur: 30, categorie: "creatief", coins: 150, titel: "Schrijf 30 minuten non-stop een verhaal van begin tot eind" },
  { id: 167, duur: 30, categorie: "creatief", coins: 150, titel: "Teken 30 minuten lang een complete fantasiewereld" },
  { id: 168, duur: 30, categorie: "creatief", coins: 150, titel: "Schrijf 30 minuten lang de tekst van een volledig album" },
  { id: 169, duur: 30, categorie: "creatief", coins: 150, titel: "Teken 30 minuten lang een complete stad vanuit vogelperspectief" },
  { id: 170, duur: 30, categorie: "creatief", coins: 150, titel: "Schrijf 30 minuten lang een script voor een korte film" },
  { id: 171, duur: 30, categorie: "creatief", coins: 150, titel: "Maak 30 minuten lang iets van materialen die je om je heen vindt" },
  { id: 172, duur: 30, categorie: "creatief", coins: 150, titel: "Teken 30 minuten lang een portret zo realistisch mogelijk" },
  { id: 173, duur: 30, categorie: "creatief", coins: 150, titel: "Schrijf 30 minuten lang een dagboek van de afgelopen maand" },
  { id: 174, duur: 30, categorie: "creatief", coins: 150, titel: "Teken 30 minuten lang een complete wereld met eigen regels" },
  { id: 175, duur: 30, categorie: "creatief", coins: 150, titel: "Schrijf 30 minuten lang een brief aan jezelf over 10 jaar" },
  { id: 176, duur: 30, categorie: "creatief", coins: 150, titel: "Vouw 30 minuten lang zo veel mogelijk originele dingen van papier" },
  { id: 177, duur: 30, categorie: "creatief", coins: 150, titel: "Teken 30 minuten lang een stripverhaal van 12 vakjes" },
  { id: 178, duur: 30, categorie: "creatief", coins: 150, titel: "Schrijf 30 minuten lang een game met eigen regels en levels op papier" },
  { id: 179, duur: 30, categorie: "creatief", coins: 150, titel: "Teken 30 minuten lang alleen met je niet-dominante hand" },
  { id: 180, duur: 30, categorie: "creatief", coins: 150, titel: "Schrijf 30 minuten lang een rap van minstens 3 coupletten" },

  // ===== 60 MINUTEN =====

  // Fysiek (15)
  { id: 181, duur: 60, categorie: "fysiek", coins: 300, titel: "Ga een uur hardlopen" },
  { id: 182, duur: 60, categorie: "fysiek", coins: 300, titel: "Doe een uur lang een complete full body workout" },
  { id: 183, duur: 60, categorie: "fysiek", coins: 300, titel: "Doe een uur lang non-stop schaduwboksen" },
  { id: 184, duur: 60, categorie: "fysiek", coins: 300, titel: "Doe een uur lang interval training" },
  { id: 185, duur: 60, categorie: "fysiek", coins: 300, titel: "Doe een uur lang yoga" },
  { id: 186, duur: 60, categorie: "fysiek", coins: 300, titel: "Doe een uur lang elke 5 minuten een andere oefening" },
  { id: 187, duur: 60, categorie: "fysiek", coins: 300, titel: "Doe een uur lang non-stop bewegen zonder dezelfde beweging twee keer" },
  { id: 188, duur: 60, categorie: "fysiek", coins: 300, titel: "Sprint 2 minuten, wandel 1 minuut, een uur lang" },
  { id: 189, duur: 60, categorie: "fysiek", coins: 300, titel: "Doe een uur lang een complete stretch routine" },
  { id: 190, duur: 60, categorie: "fysiek", coins: 300, titel: "Doe een uur lang elke minuut 10 push-ups" },
  { id: 191, duur: 60, categorie: "fysiek", coins: 300, titel: "Doe een uur lang non-stop lunges" },
  { id: 192, duur: 60, categorie: "fysiek", coins: 300, titel: "Doe een uur lang elke 5 minuten 5 burpees en 20 squats" },
  { id: 193, duur: 60, categorie: "fysiek", coins: 300, titel: "Balanceer een uur op één been, wissel elke 5 minuten" },
  { id: 194, duur: 60, categorie: "fysiek", coins: 300, titel: "Loop een uur lang alleen op je tenen" },
  { id: 195, duur: 60, categorie: "fysiek", coins: 300, titel: "Doe een uur lang non-stop high knees met pauzes van max 10 seconden" },

  // Comfort zone (15)
  { id: 196, duur: 60, categorie: "comfortzone", coins: 300, titel: "Zit een uur compleet stil zonder telefoon of muziek" },
  { id: 197, duur: 60, categorie: "comfortzone", coins: 300, titel: "Doe een uur lang alles met je niet-dominante hand" },
  { id: 198, duur: 60, categorie: "comfortzone", coins: 300, titel: "Loop een uur lang achteruit" },
  { id: 199, duur: 60, categorie: "comfortzone", coins: 300, titel: "Schrijf een uur non-stop zonder te stoppen of te corrigeren" },
  { id: 200, duur: 60, categorie: "comfortzone", coins: 300, titel: "Doe een uur lang iets wat je normaal altijd vermijdt" },
  { id: 201, duur: 60, categorie: "comfortzone", coins: 300, titel: "Sta een uur lang buiten zonder je telefoon" },
  { id: 202, duur: 60, categorie: "comfortzone", coins: 300, titel: "Doe een uur lang alles zo langzaam mogelijk" },
  { id: 203, duur: 60, categorie: "comfortzone", coins: 300, titel: "Loop een uur lang alleen op je hielen" },
  { id: 204, duur: 60, categorie: "comfortzone", coins: 300, titel: "Zing een uur lang hardop mee met liedjes" },
  { id: 205, duur: 60, categorie: "comfortzone", coins: 300, titel: "Doe een uur lang alles in slow motion" },
  { id: 206, duur: 60, categorie: "comfortzone", coins: 300, titel: "Doe een uur lang iets wat je al jaren wil proberen maar nooit doet" },
  { id: 207, duur: 60, categorie: "comfortzone", coins: 300, titel: "Zit een uur buiten op de grond zonder rugsteun" },
  { id: 208, duur: 60, categorie: "comfortzone", coins: 300, titel: "Doe een uur lang bewegen als een dier naar keuze" },
  { id: 209, duur: 60, categorie: "comfortzone", coins: 300, titel: "Doe een uur lang alles met je ogen dicht" },
  { id: 210, duur: 60, categorie: "comfortzone", coins: 300, titel: "Doe een uur lang iets waar je normaal na 10 minuten mee stopt" },

  // Leren (15)
  { id: 211, duur: 60, categorie: "leren", coins: 300, titel: "Oefen een uur lang een kaarttruc totdat je hem perfect voor iemand kan doen" },
  { id: 212, duur: 60, categorie: "leren", coins: 300, titel: "Oefen een uur lang een vrije handstand" },
  { id: 213, duur: 60, categorie: "leren", coins: 300, titel: "Oefen een uur lang beatboxen op meerdere nummers" },
  { id: 214, duur: 60, categorie: "leren", coins: 300, titel: "Oefen een uur lang jongleren met drie sinaasappels of appels" },
  { id: 215, duur: 60, categorie: "leren", coins: 300, titel: "Oefen een uur lang hoe je een realistisch portret tekent" },
  { id: 216, duur: 60, categorie: "leren", coins: 300, titel: "Oefen een uur lang push-ups met één arm" },
  { id: 217, duur: 60, categorie: "leren", coins: 300, titel: "Oefen een uur lang morse code tot je het uit je hoofd kan" },
  { id: 218, duur: 60, categorie: "leren", coins: 300, titel: "Oefen een uur lang complexe origami figuren van gewoon papier" },
  { id: 219, duur: 60, categorie: "leren", coins: 300, titel: "Oefen een uur lang landen en hoofdsteden uit je hoofd leren" },
  { id: 220, duur: 60, categorie: "leren", coins: 300, titel: "Oefen een uur lang freestyle rappen" },
  { id: 221, duur: 60, categorie: "leren", coins: 300, titel: "Oefen een uur lang een complete dans routine van begin tot eind" },
  { id: 222, duur: 60, categorie: "leren", coins: 300, titel: "Oefen een uur lang hoe je een back-flip doet" },
  { id: 223, duur: 60, categorie: "leren", coins: 300, titel: "Oefen een uur lang hoe je een kaartenhuis bouwt van meer dan 10 lagen" },
  { id: 224, duur: 60, categorie: "leren", coins: 300, titel: "Oefen een uur lang hoe je meerdere kaarttrucks achter elkaar uitvoert" },
  { id: 225, duur: 60, categorie: "leren", coins: 300, titel: "Oefen een uur lang hoe je een sport techniek correct uitvoert" },

  // Creatief (15)
  { id: 226, duur: 60, categorie: "creatief", coins: 300, titel: "Schrijf een uur non-stop een verhaal van begin tot eind" },
  { id: 227, duur: 60, categorie: "creatief", coins: 300, titel: "Teken een uur lang een complete fantasiewereld zo gedetailleerd mogelijk" },
  { id: 228, duur: 60, categorie: "creatief", coins: 300, titel: "Schrijf een uur lang de tekst van een volledig album" },
  { id: 229, duur: 60, categorie: "creatief", coins: 300, titel: "Teken een uur lang een complete stad vanuit vogelperspectief" },
  { id: 230, duur: 60, categorie: "creatief", coins: 300, titel: "Schrijf een uur lang een script voor een korte film" },
  { id: 231, duur: 60, categorie: "creatief", coins: 300, titel: "Maak een uur lang iets van materialen die je om je heen vindt" },
  { id: 232, duur: 60, categorie: "creatief", coins: 300, titel: "Teken een uur lang een portret zo realistisch mogelijk" },
  { id: 233, duur: 60, categorie: "creatief", coins: 300, titel: "Schrijf een uur lang een dagboek van de afgelopen maand" },
  { id: 234, duur: 60, categorie: "creatief", coins: 300, titel: "Teken een uur lang een complete wereld met eigen regels" },
  { id: 235, duur: 60, categorie: "creatief", coins: 300, titel: "Schrijf een uur lang een brief aan jezelf over 20 jaar" },
  { id: 236, duur: 60, categorie: "creatief", coins: 300, titel: "Vouw een uur lang zo veel mogelijk originele dingen van papier" },
  { id: 237, duur: 60, categorie: "creatief", coins: 300, titel: "Teken een uur lang een stripverhaal van 24 vakjes" },
  { id: 238, duur: 60, categorie: "creatief", coins: 300, titel: "Schrijf een uur lang een complete game met eigen regels en levels op papier" },
  { id: 239, duur: 60, categorie: "creatief", coins: 300, titel: "Teken een uur lang alleen met je niet-dominante hand" },
  { id: 240, duur: 60, categorie: "creatief", coins: 300, titel: "Schrijf een uur lang een rap album van minstens 5 nummers" },
];

export function getOpdrachtenVoorDag(datum: Date): {
  snel: Opdracht;
  kort: Opdracht;
  middel: Opdracht;
  lang: Opdracht;
} {
  const seed =
    datum.getFullYear() * 10000 +
    (datum.getMonth() + 1) * 100 +
    datum.getDate();

  const vijfMin = opdrachten.filter((o) => o.duur === 5);
  const vijftienMin = opdrachten.filter((o) => o.duur === 15);
  const dertigMin = opdrachten.filter((o) => o.duur === 30);
  const zestigMin = opdrachten.filter((o) => o.duur === 60);

  return {
    snel: vijfMin[seed % vijfMin.length],
    kort: vijftienMin[(seed * 3) % vijftienMin.length],
    middel: dertigMin[(seed * 7) % dertigMin.length],
    lang: zestigMin[(seed * 11) % zestigMin.length],
  };
}

export function dagSleutel(datum: Date): string {
  const y = datum.getFullYear();
  const m = String(datum.getMonth() + 1).padStart(2, "0");
  const d = String(datum.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
