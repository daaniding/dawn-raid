export interface Opdracht {
  id: number;
  titel: string;
  duur: 5 | 15 | 30 | 60;
  categorie: "fysiek" | "comfortzone" | "productiviteit" | "creativiteit";
  coins: number;
}

export const opdrachten: Opdracht[] = [
  // ===== 5 MINUTEN =====

  // Fysiek
  { id: 1, duur: 5, categorie: "fysiek", coins: 25, titel: "Leer zo veel mogelijk push-up varianten" },
  { id: 2, duur: 5, categorie: "fysiek", coins: 25, titel: "Leer hoe je een perfecte squat doet en oefen" },
  { id: 3, duur: 5, categorie: "fysiek", coins: 25, titel: "Probeer voor het eerst een burpee" },
  { id: 4, duur: 5, categorie: "fysiek", coins: 25, titel: "Leer hoe je een plank correct vasthoud" },
  { id: 5, duur: 5, categorie: "fysiek", coins: 25, titel: "Leer hoe je correct springt voor maximale hoogte" },
  { id: 6, duur: 5, categorie: "fysiek", coins: 25, titel: "Leer de basis van schaduwboksen" },
  { id: 7, duur: 5, categorie: "fysiek", coins: 25, titel: "Leer hoe je correct een lunge doet" },
  { id: 8, duur: 5, categorie: "fysiek", coins: 25, titel: "Leer hoe je een wall-sit correct uitvoert" },
  { id: 9, duur: 5, categorie: "fysiek", coins: 25, titel: "Leer hoe je correct rent op de bal van je voet" },
  { id: 10, duur: 5, categorie: "fysiek", coins: 25, titel: "Leer hoe je een mountain climber correct doet" },
  { id: 11, duur: 5, categorie: "fysiek", coins: 25, titel: "Leer hoe je een jumping jack correct uitvoert" },
  { id: 12, duur: 5, categorie: "fysiek", coins: 25, titel: "Leer hoe je een sit-up correct doet" },
  { id: 13, duur: 5, categorie: "fysiek", coins: 25, titel: "Leer hoe je op je tenen loopt voor kuitspieren" },
  { id: 14, duur: 5, categorie: "fysiek", coins: 25, titel: "Leer hoe je een high knee correct uitvoert" },
  { id: 15, duur: 5, categorie: "fysiek", coins: 25, titel: "Leer hoe je correct balanceert op één been" },

  // Comfort zone
  { id: 16, duur: 5, categorie: "comfortzone", coins: 25, titel: "Neem een ijskoude douche van precies 5 minuten" },
  { id: 17, duur: 5, categorie: "comfortzone", coins: 25, titel: "Doe 5 minuten lang alles met je niet-dominante hand" },
  { id: 18, duur: 5, categorie: "comfortzone", coins: 25, titel: "Leer hoe het voelt om 5 minuten compleet stil te zitten" },
  { id: 19, duur: 5, categorie: "comfortzone", coins: 25, titel: "Leer hoe je 5 minuten lang achteruit loopt" },
  { id: 20, duur: 5, categorie: "comfortzone", coins: 25, titel: "Leer hoe je 5 minuten lang alleen op je hielen loopt" },
  { id: 21, duur: 5, categorie: "comfortzone", coins: 25, titel: "Doe 5 minuten lang alles zo langzaam mogelijk" },
  { id: 22, duur: 5, categorie: "comfortzone", coins: 25, titel: "Probeer 5 minuten lang je ogen dicht te houden en stil te zitten" },
  { id: 23, duur: 5, categorie: "comfortzone", coins: 25, titel: "Leer hoe je 5 minuten lang op één been staat met je ogen dicht" },
  { id: 24, duur: 5, categorie: "comfortzone", coins: 25, titel: "Schrijf 5 minuten non-stop zonder te stoppen" },
  { id: 25, duur: 5, categorie: "comfortzone", coins: 25, titel: "Leer hoe je 5 minuten lang alleen door je neus ademt" },
  { id: 26, duur: 5, categorie: "comfortzone", coins: 25, titel: "Probeer 5 minuten lang te zingen zonder te stoppen" },
  { id: 27, duur: 5, categorie: "comfortzone", coins: 25, titel: "Leer hoe je 5 minuten lang iets doet wat je normaal vermijdt" },
  { id: 28, duur: 5, categorie: "comfortzone", coins: 25, titel: "Doe 5 minuten lang elke actie bewust en langzaam" },
  { id: 29, duur: 5, categorie: "comfortzone", coins: 25, titel: "Leer hoe het voelt om 5 minuten zonder telefoon buiten te staan" },
  { id: 30, duur: 5, categorie: "comfortzone", coins: 25, titel: "Probeer 5 minuten lang te bewegen als een dier naar keuze" },

  // Productiviteit
  { id: 31, duur: 5, categorie: "productiviteit", coins: 25, titel: "Schrijf in 5 minuten alles op wat in je hoofd zit" },
  { id: 32, duur: 5, categorie: "productiviteit", coins: 25, titel: "Leer hoe je je telefoon in 5 minuten opruimt" },
  { id: 33, duur: 5, categorie: "productiviteit", coins: 25, titel: "Schrijf je drie belangrijkste doelen voor vandaag op" },
  { id: 34, duur: 5, categorie: "productiviteit", coins: 25, titel: "Gooi in 5 minuten alles weg wat je niet meer nodig hebt" },
  { id: 35, duur: 5, categorie: "productiviteit", coins: 25, titel: "Schrijf een to-do lijst voor de komende week" },
  { id: 36, duur: 5, categorie: "productiviteit", coins: 25, titel: "Leer hoe je je scherm opruimt zodat je minder afgeleid bent" },
  { id: 37, duur: 5, categorie: "productiviteit", coins: 25, titel: "Schrijf op wat je morgen als eerste gaat doen" },
  { id: 38, duur: 5, categorie: "productiviteit", coins: 25, titel: "Leer hoe je in 5 minuten je gedachten op papier zet" },
  { id: 39, duur: 5, categorie: "productiviteit", coins: 25, titel: "Schrijf op welke gewoontes je wil aanleren" },
  { id: 40, duur: 5, categorie: "productiviteit", coins: 25, titel: "Leer hoe je een slechte gewoonte doorbreekt" },
  { id: 41, duur: 5, categorie: "productiviteit", coins: 25, titel: "Schrijf op wat je grootste verspilling van tijd is" },
  { id: 42, duur: 5, categorie: "productiviteit", coins: 25, titel: "Leer hoe je je dag plant voor maximale productiviteit" },
  { id: 43, duur: 5, categorie: "productiviteit", coins: 25, titel: "Schrijf op wat je vandaag al hebt bereikt" },
  { id: 44, duur: 5, categorie: "productiviteit", coins: 25, titel: "Leer hoe je prioriteiten stelt als alles urgent voelt" },
  { id: 45, duur: 5, categorie: "productiviteit", coins: 25, titel: "Schrijf drie dingen op die je deze week wil veranderen" },

  // Creativiteit
  { id: 46, duur: 5, categorie: "creativiteit", coins: 25, titel: "Leer hoe je een gezicht tekent in 5 minuten" },
  { id: 47, duur: 5, categorie: "creativiteit", coins: 25, titel: "Probeer voor het eerst te beatboxen" },
  { id: 48, duur: 5, categorie: "creativiteit", coins: 25, titel: "Leer hoe je een gedicht schrijft en schrijf er één" },
  { id: 49, duur: 5, categorie: "creativiteit", coins: 25, titel: "Leer een knoop die je nog nooit hebt gelegd" },
  { id: 50, duur: 5, categorie: "creativiteit", coins: 25, titel: "Maak een kunstwerk van dingen die je om je heen vindt" },
  { id: 51, duur: 5, categorie: "creativiteit", coins: 25, titel: "Leer hoe je een rap schrijft en schrijf er één" },
  { id: 52, duur: 5, categorie: "creativiteit", coins: 25, titel: "Teken iets zonder je pen van het papier te halen" },
  { id: 53, duur: 5, categorie: "creativiteit", coins: 25, titel: "Leer hoe je een karakter verzint en beschrijft" },
  { id: 54, duur: 5, categorie: "creativiteit", coins: 25, titel: "Schrijf in 5 minuten het begin van een verhaal" },
  { id: 55, duur: 5, categorie: "creativiteit", coins: 25, titel: "Leer hoe je met alleen rechte lijnen een kunstwerk maakt" },
  { id: 56, duur: 5, categorie: "creativiteit", coins: 25, titel: "Probeer voor het eerst origami te vouwen" },
  { id: 57, duur: 5, categorie: "creativiteit", coins: 25, titel: "Leer hoe je een kaart tekent van de plek waar je bent" },
  { id: 58, duur: 5, categorie: "creativiteit", coins: 25, titel: "Schrijf in 5 minuten een speech van 1 minuut" },
  { id: 59, duur: 5, categorie: "creativiteit", coins: 25, titel: "Leer hoe je een dier tekent dat je nog nooit hebt getekend" },
  { id: 60, duur: 5, categorie: "creativiteit", coins: 25, titel: "Probeer voor het eerst iets te bouwen van papier" },

  // ===== 15 MINUTEN =====

  // Fysiek
  { id: 61, duur: 15, categorie: "fysiek", coins: 75, titel: "Leer een handstand en oefen 15 minuten lang" },
  { id: 62, duur: 15, categorie: "fysiek", coins: 75, titel: "Leer hoe je 15 minuten non-stop hardloopt" },
  { id: 63, duur: 15, categorie: "fysiek", coins: 75, titel: "Leer hoe je correct schaduwe boks en oefen 15 minuten" },
  { id: 64, duur: 15, categorie: "fysiek", coins: 75, titel: "Leer hoe je een push-up doet met één arm" },
  { id: 65, duur: 15, categorie: "fysiek", coins: 75, titel: "Leer de basis van yoga en oefen 15 minuten lang" },
  { id: 66, duur: 15, categorie: "fysiek", coins: 75, titel: "Leer hoe je correct sprint en doe interval training" },
  { id: 67, duur: 15, categorie: "fysiek", coins: 75, titel: "Leer de basis van stretchen en oefen 15 minuten" },
  { id: 68, duur: 15, categorie: "fysiek", coins: 75, titel: "Leer hoe je 15 minuten lang elke minuut van oefening wisselt" },
  { id: 69, duur: 15, categorie: "fysiek", coins: 75, titel: "Leer hoe je een correcte sit-up doet en oefen 15 minuten" },
  { id: 70, duur: 15, categorie: "fysiek", coins: 75, titel: "Leer hoe je op je handen loopt langs een muur" },
  { id: 71, duur: 15, categorie: "fysiek", coins: 75, titel: "Leer hoe je een pistool squat doet" },
  { id: 72, duur: 15, categorie: "fysiek", coins: 75, titel: "Leer de basis van kickboksen en oefen 15 minuten" },
  { id: 73, duur: 15, categorie: "fysiek", coins: 75, titel: "Leer hoe je 15 minuten lang non-stop springt" },
  { id: 74, duur: 15, categorie: "fysiek", coins: 75, titel: "Leer hoe je een correcte burpee doet en oefen 15 minuten" },
  { id: 75, duur: 15, categorie: "fysiek", coins: 75, titel: "Leer hoe je je core activeert bij elke oefening" },

  // Comfort zone
  { id: 76, duur: 15, categorie: "comfortzone", coins: 75, titel: "Neem een ijskoude douche van 15 minuten" },
  { id: 77, duur: 15, categorie: "comfortzone", coins: 75, titel: "Leer hoe het voelt om 15 minuten compleet stil te zitten" },
  { id: 78, duur: 15, categorie: "comfortzone", coins: 75, titel: "Schrijf 15 minuten non-stop zonder te stoppen of te corrigeren" },
  { id: 79, duur: 15, categorie: "comfortzone", coins: 75, titel: "Doe 15 minuten lang alles met je niet-dominante hand" },
  { id: 80, duur: 15, categorie: "comfortzone", coins: 75, titel: "Leer hoe je 15 minuten lang achteruit loopt" },
  { id: 81, duur: 15, categorie: "comfortzone", coins: 75, titel: "Probeer 15 minuten lang iets te doen wat je normaal altijd uitstelt" },
  { id: 82, duur: 15, categorie: "comfortzone", coins: 75, titel: "Leer hoe je 15 minuten lang op één been balanceert" },
  { id: 83, duur: 15, categorie: "comfortzone", coins: 75, titel: "Doe 15 minuten lang alles zo langzaam mogelijk" },
  { id: 84, duur: 15, categorie: "comfortzone", coins: 75, titel: "Leer hoe je 15 minuten lang alleen op je hielen loopt" },
  { id: 85, duur: 15, categorie: "comfortzone", coins: 75, titel: "Probeer 15 minuten lang buiten te zitten zonder telefoon" },
  { id: 86, duur: 15, categorie: "comfortzone", coins: 75, titel: "Leer hoe je 15 minuten lang alleen door je neus ademt" },
  { id: 87, duur: 15, categorie: "comfortzone", coins: 75, titel: "Doe 15 minuten lang iets wat je eng vindt maar veilig is" },
  { id: 88, duur: 15, categorie: "comfortzone", coins: 75, titel: "Leer hoe je 15 minuten lang met je ogen dicht loopt" },
  { id: 89, duur: 15, categorie: "comfortzone", coins: 75, titel: "Probeer 15 minuten lang te zingen zonder te stoppen" },
  { id: 90, duur: 15, categorie: "comfortzone", coins: 75, titel: "Leer hoe je 15 minuten lang alleen op je tenen loopt" },

  // Productiviteit
  { id: 91, duur: 15, categorie: "productiviteit", coins: 75, titel: "Leer hoe je je kamer in 15 minuten zo efficiënt mogelijk opruimt" },
  { id: 92, duur: 15, categorie: "productiviteit", coins: 75, titel: "Schrijf een volledig plan voor iets wat je al lang wil doen" },
  { id: 93, duur: 15, categorie: "productiviteit", coins: 75, titel: "Leer hoe je je telefoon zo opruimt dat je minder afgeleid bent" },
  { id: 94, duur: 15, categorie: "productiviteit", coins: 75, titel: "Schrijf alles op wat je wil bereiken de komende maand" },
  { id: 95, duur: 15, categorie: "productiviteit", coins: 75, titel: "Leer hoe je je inbox in 15 minuten compleet leeg maakt" },
  { id: 96, duur: 15, categorie: "productiviteit", coins: 75, titel: "Schrijf een eerlijke analyse van waar je tijd naartoe gaat" },
  { id: 97, duur: 15, categorie: "productiviteit", coins: 75, titel: "Leer hoe je een week plant zodat je meer bereikt" },
  { id: 98, duur: 15, categorie: "productiviteit", coins: 75, titel: "Gooi alles weg wat je al meer dan een jaar niet hebt gebruikt" },
  { id: 99, duur: 15, categorie: "productiviteit", coins: 75, titel: "Schrijf je drie grootste doelen voor dit jaar op" },
  { id: 100, duur: 15, categorie: "productiviteit", coins: 75, titel: "Leer hoe je je dagelijkse routine aanpast om productiever te worden" },
  { id: 101, duur: 15, categorie: "productiviteit", coins: 75, titel: "Schrijf op wat je zou doen als je één vrije dag had" },
  { id: 102, duur: 15, categorie: "productiviteit", coins: 75, titel: "Leer hoe je een slechte gewoonte omzet in een goede" },
  { id: 103, duur: 15, categorie: "productiviteit", coins: 75, titel: "Schrijf op wat je anders zou doen als je opnieuw kon beginnen" },
  { id: 104, duur: 15, categorie: "productiviteit", coins: 75, titel: "Leer hoe je focust als je hoofd vol zit" },
  { id: 105, duur: 15, categorie: "productiviteit", coins: 75, titel: "Schrijf een lijst van alles wat je leven beter zou maken" },

  // Creativiteit
  { id: 106, duur: 15, categorie: "creativiteit", coins: 75, titel: "Leer een handstand tekenen in perspectief" },
  { id: 107, duur: 15, categorie: "creativiteit", coins: 75, titel: "Leer hoe je een compleet kort verhaal schrijft in 15 minuten" },
  { id: 108, duur: 15, categorie: "creativiteit", coins: 75, titel: "Leer de basis van beatboxen en oefen 15 minuten" },
  { id: 109, duur: 15, categorie: "creativiteit", coins: 75, titel: "Leer hoe je een portret tekent in 15 minuten" },
  { id: 110, duur: 15, categorie: "creativiteit", coins: 75, titel: "Leer hoe je een rap schrijft en schrijf er één in 15 minuten" },
  { id: 111, duur: 15, categorie: "creativiteit", coins: 75, titel: "Probeer voor het eerst iets te bouwen van materialen om je heen" },
  { id: 112, duur: 15, categorie: "creativiteit", coins: 75, titel: "Leer hoe je een fantasiewereld tekent met steden en bergen" },
  { id: 113, duur: 15, categorie: "creativiteit", coins: 75, titel: "Leer hoe je een speech schrijft die mensen raakt" },
  { id: 114, duur: 15, categorie: "creativiteit", coins: 75, titel: "Probeer voor het eerst een nummer te fluiten van begin tot eind" },
  { id: 115, duur: 15, categorie: "creativiteit", coins: 75, titel: "Leer hoe je met alleen cirkels een kunstwerk maakt" },
  { id: 116, duur: 15, categorie: "creativiteit", coins: 75, titel: "Leer hoe je een stripverhaal maakt van 6 vakjes" },
  { id: 117, duur: 15, categorie: "creativiteit", coins: 75, titel: "Schrijf een brief aan iemand die je inspireert" },
  { id: 118, duur: 15, categorie: "creativiteit", coins: 75, titel: "Leer hoe je een skyline tekent van een stad die je verzint" },
  { id: 119, duur: 15, categorie: "creativiteit", coins: 75, titel: "Probeer voor het eerst een nummer te componeren met je stem" },
  { id: 120, duur: 15, categorie: "creativiteit", coins: 75, titel: "Leer hoe je een karakter ontwerpt voor een game of verhaal" },

  // ===== 30 MINUTEN =====

  // Fysiek
  { id: 121, duur: 30, categorie: "fysiek", coins: 150, titel: "Leer hoe je 30 minuten non-stop hardloopt" },
  { id: 122, duur: 30, categorie: "fysiek", coins: 150, titel: "Leer de basis van een complete full body workout" },
  { id: 123, duur: 30, categorie: "fysiek", coins: 150, titel: "Ga 30 minuten wandelen op een route die je nog nooit hebt gelopen" },
  { id: 124, duur: 30, categorie: "fysiek", coins: 150, titel: "Leer de basis van yoga en doe een complete sessie" },
  { id: 125, duur: 30, categorie: "fysiek", coins: 150, titel: "Leer hoe je 30 minuten traint zonder gym of gewichten" },
  { id: 126, duur: 30, categorie: "fysiek", coins: 150, titel: "Leer hoe je interval training doet en oefen 30 minuten" },
  { id: 127, duur: 30, categorie: "fysiek", coins: 150, titel: "Leer hoe je correct schaduwe boks en doe een sessie van 30 minuten" },
  { id: 128, duur: 30, categorie: "fysiek", coins: 150, titel: "Leer de basis van stretchen en doe een complete sessie" },
  { id: 129, duur: 30, categorie: "fysiek", coins: 150, titel: "Leer hoe je 30 minuten lang elke 3 minuten van sport wisselt" },
  { id: 130, duur: 30, categorie: "fysiek", coins: 150, titel: "Leer hoe je een back-flip doet en oefen de basis 30 minuten" },
  { id: 131, duur: 30, categorie: "fysiek", coins: 150, titel: "Leer de basis van parkour bewegingen en oefen 30 minuten" },
  { id: 132, duur: 30, categorie: "fysiek", coins: 150, titel: "Leer hoe je 30 minuten lang non-stop springt in alle vormen" },
  { id: 133, duur: 30, categorie: "fysiek", coins: 150, titel: "Leer hoe je een pistool squat doet en oefen 30 minuten" },
  { id: 134, duur: 30, categorie: "fysiek", coins: 150, titel: "Leer de basis van kickboksen en doe een sessie van 30 minuten" },
  { id: 135, duur: 30, categorie: "fysiek", coins: 150, titel: "Leer hoe je 30 minuten lang non-stop beweegt zonder dezelfde beweging twee keer" },

  // Comfort zone
  { id: 136, duur: 30, categorie: "comfortzone", coins: 150, titel: "Leer hoe het voelt om 30 minuten compleet stil te zitten" },
  { id: 137, duur: 30, categorie: "comfortzone", coins: 150, titel: "Schrijf 30 minuten non-stop zonder te stoppen of terug te lezen" },
  { id: 138, duur: 30, categorie: "comfortzone", coins: 150, titel: "Doe 30 minuten lang iets wat je normaal altijd vermijdt" },
  { id: 139, duur: 30, categorie: "comfortzone", coins: 150, titel: "Leer hoe je 30 minuten lang achteruit loopt op verschillende ondergronden" },
  { id: 140, duur: 30, categorie: "comfortzone", coins: 150, titel: "Doe 30 minuten lang alles met je niet-dominante hand" },
  { id: 141, duur: 30, categorie: "comfortzone", coins: 150, titel: "Leer hoe je 30 minuten lang op één been balanceert met ogen dicht" },
  { id: 142, duur: 30, categorie: "comfortzone", coins: 150, titel: "Probeer 30 minuten lang buiten te zitten zonder telefoon of muziek" },
  { id: 143, duur: 30, categorie: "comfortzone", coins: 150, titel: "Doe 30 minuten lang alles zo langzaam mogelijk" },
  { id: 144, duur: 30, categorie: "comfortzone", coins: 150, titel: "Leer hoe je 30 minuten lang iets doet wat je al jaren wil proberen" },
  { id: 145, duur: 30, categorie: "comfortzone", coins: 150, titel: "Probeer 30 minuten lang te tekenen met je ogen dicht" },
  { id: 146, duur: 30, categorie: "comfortzone", coins: 150, titel: "Leer hoe je 30 minuten lang alleen maar luistert zonder te praten" },
  { id: 147, duur: 30, categorie: "comfortzone", coins: 150, titel: "Doe 30 minuten lang iets wat je eng vindt maar veilig is" },
  { id: 148, duur: 30, categorie: "comfortzone", coins: 150, titel: "Leer hoe je 30 minuten lang op de grond zit zonder rugsteun" },
  { id: 149, duur: 30, categorie: "comfortzone", coins: 150, titel: "Probeer 30 minuten lang te schrijven met je niet-dominante hand" },
  { id: 150, duur: 30, categorie: "comfortzone", coins: 150, titel: "Leer hoe je 30 minuten lang alleen op je hielen loopt" },

  // Productiviteit
  { id: 151, duur: 30, categorie: "productiviteit", coins: 150, titel: "Leer hoe je je kamer in 30 minuten compleet opruimt" },
  { id: 152, duur: 30, categorie: "productiviteit", coins: 150, titel: "Schrijf een volledig plan voor je toekomst" },
  { id: 153, duur: 30, categorie: "productiviteit", coins: 150, titel: "Leer hoe je je financiën op orde brengt en doe het" },
  { id: 154, duur: 30, categorie: "productiviteit", coins: 150, titel: "Schrijf alles op wat je wil bereiken dit jaar" },
  { id: 155, duur: 30, categorie: "productiviteit", coins: 150, titel: "Leer hoe je je digitale leven opruimt in 30 minuten" },
  { id: 156, duur: 30, categorie: "productiviteit", coins: 150, titel: "Schrijf een gedetailleerde analyse van je gewoontes" },
  { id: 157, duur: 30, categorie: "productiviteit", coins: 150, titel: "Leer hoe je een project plant van begin tot eind" },
  { id: 158, duur: 30, categorie: "productiviteit", coins: 150, titel: "Gooi alles weg wat je al meer dan een jaar niet hebt gebruikt" },
  { id: 159, duur: 30, categorie: "productiviteit", coins: 150, titel: "Schrijf een plan voor een groot doel dat je hebt" },
  { id: 160, duur: 30, categorie: "productiviteit", coins: 150, titel: "Leer hoe je je dagelijkse routine zo aanpast dat je meer bereikt" },
  { id: 161, duur: 30, categorie: "productiviteit", coins: 150, titel: "Schrijf op wat je zou doen als je een maand vrij had" },
  { id: 162, duur: 30, categorie: "productiviteit", coins: 150, titel: "Leer hoe je een slechte gewoonte definitief stopt" },
  { id: 163, duur: 30, categorie: "productiviteit", coins: 150, titel: "Schrijf een eerlijke analyse van je leven tot nu toe" },
  { id: 164, duur: 30, categorie: "productiviteit", coins: 150, titel: "Leer hoe je focust als je hoofd vol zit met gedachten" },
  { id: 165, duur: 30, categorie: "productiviteit", coins: 150, titel: "Schrijf alles op wat je zou veranderen aan je dagelijkse leven" },

  // Creativiteit
  { id: 166, duur: 30, categorie: "creativiteit", coins: 150, titel: "Leer hoe je een volledig tafereel tekent met personages" },
  { id: 167, duur: 30, categorie: "creativiteit", coins: 150, titel: "Leer hoe je een compleet kort verhaal schrijft van begin tot eind" },
  { id: 168, duur: 30, categorie: "creativiteit", coins: 150, titel: "Leer hoe je een nummer maakt door alleen je stem te gebruiken" },
  { id: 169, duur: 30, categorie: "creativiteit", coins: 150, titel: "Leer hoe je een fantasiewereld tekent met steden en rivieren" },
  { id: 170, duur: 30, categorie: "creativiteit", coins: 150, titel: "Leer hoe je een script schrijft voor een korte film" },
  { id: 171, duur: 30, categorie: "creativiteit", coins: 150, titel: "Probeer in 30 minuten iets te bouwen van materialen om je heen" },
  { id: 172, duur: 30, categorie: "creativiteit", coins: 150, titel: "Leer hoe je een portret tekent zo realistisch mogelijk" },
  { id: 173, duur: 30, categorie: "creativiteit", coins: 150, titel: "Leer hoe je een dagboek schrijft dat je over 10 jaar wil teruglezen" },
  { id: 174, duur: 30, categorie: "creativiteit", coins: 150, titel: "Leer hoe je een fotoserie maakt met een duidelijk thema" },
  { id: 175, duur: 30, categorie: "creativiteit", coins: 150, titel: "Leer hoe je de tekst van een volledig nummer schrijft" },
  { id: 176, duur: 30, categorie: "creativiteit", coins: 150, titel: "Leer hoe je een complete stad tekent vanuit vogelperspectief" },
  { id: 177, duur: 30, categorie: "creativiteit", coins: 150, titel: "Schrijf een brief aan jezelf over 20 jaar" },
  { id: 178, duur: 30, categorie: "creativiteit", coins: 150, titel: "Leer hoe je een stripverhaal van 12 vakjes maakt" },
  { id: 179, duur: 30, categorie: "creativiteit", coins: 150, titel: "Probeer voor het eerst een volledig recept te bedenken en opschrijven" },
  { id: 180, duur: 30, categorie: "creativiteit", coins: 150, titel: "Leer hoe je een game ontwerpt op papier met regels en levels" },

  // ===== 60 MINUTEN =====

  // Fysiek
  { id: 181, duur: 60, categorie: "fysiek", coins: 300, titel: "Leer hoe je een uur non-stop hardloopt" },
  { id: 182, duur: 60, categorie: "fysiek", coins: 300, titel: "Leer de basis van een complete full body workout en train een uur" },
  { id: 183, duur: 60, categorie: "fysiek", coins: 300, titel: "Ga een uur wandelen op een route die je nog nooit hebt gelopen" },
  { id: 184, duur: 60, categorie: "fysiek", coins: 300, titel: "Leer de basis van yoga en doe een complete sessie van een uur" },
  { id: 185, duur: 60, categorie: "fysiek", coins: 300, titel: "Leer hoe je een uur lang traint zonder gym of gewichten" },
  { id: 186, duur: 60, categorie: "fysiek", coins: 300, titel: "Leer hoe je interval training doet en train een uur lang" },
  { id: 187, duur: 60, categorie: "fysiek", coins: 300, titel: "Leer hoe je correct schaduwe boks en doe een sessie van een uur" },
  { id: 188, duur: 60, categorie: "fysiek", coins: 300, titel: "Leer de basis van stretchen en doe een complete sessie van een uur" },
  { id: 189, duur: 60, categorie: "fysiek", coins: 300, titel: "Doe een uur lang elke 5 minuten een andere sportbeweging" },
  { id: 190, duur: 60, categorie: "fysiek", coins: 300, titel: "Leer de basis van parkour en oefen een uur lang buiten" },
  { id: 191, duur: 60, categorie: "fysiek", coins: 300, titel: "Leer hoe je een uur lang non-stop beweegt zonder dezelfde beweging twee keer" },
  { id: 192, duur: 60, categorie: "fysiek", coins: 300, titel: "Leer de basis van kickboksen en doe een sessie van een uur" },
  { id: 193, duur: 60, categorie: "fysiek", coins: 300, titel: "Leer hoe je een uur lang fietst op maximale intensiteit" },
  { id: 194, duur: 60, categorie: "fysiek", coins: 300, titel: "Leer hoe je een complete core workout doet van een uur" },
  { id: 195, duur: 60, categorie: "fysiek", coins: 300, titel: "Leer hoe je een uur lang traplopen gebruikt als workout" },

  // Comfort zone
  { id: 196, duur: 60, categorie: "comfortzone", coins: 300, titel: "Zit een uur stil zonder telefoon, muziek of afleiding" },
  { id: 197, duur: 60, categorie: "comfortzone", coins: 300, titel: "Leer hoe het voelt om een uur lang iets te doen wat je normaal vermijdt" },
  { id: 198, duur: 60, categorie: "comfortzone", coins: 300, titel: "Schrijf een uur non-stop zonder te stoppen of terug te lezen" },
  { id: 199, duur: 60, categorie: "comfortzone", coins: 300, titel: "Doe een uur lang alles met je niet-dominante hand" },
  { id: 200, duur: 60, categorie: "comfortzone", coins: 300, titel: "Leer hoe je een uur lang buiten zit zonder telefoon of afleiding" },
  { id: 201, duur: 60, categorie: "comfortzone", coins: 300, titel: "Probeer een uur lang iets te doen wat je al jaren wil maar nooit doet" },
  { id: 202, duur: 60, categorie: "comfortzone", coins: 300, titel: "Doe een uur lang alles zo langzaam mogelijk" },
  { id: 203, duur: 60, categorie: "comfortzone", coins: 300, titel: "Leer hoe je een uur lang op één been balanceert met ogen dicht" },
  { id: 204, duur: 60, categorie: "comfortzone", coins: 300, titel: "Zit een uur op de grond zonder rugsteun en doe iets productiefs" },
  { id: 205, duur: 60, categorie: "comfortzone", coins: 300, titel: "Leer hoe je een uur lang iets doet waar je normaal na 10 minuten mee stopt" },
  { id: 206, duur: 60, categorie: "comfortzone", coins: 300, titel: "Probeer een uur lang te tekenen met je niet-dominante hand" },
  { id: 207, duur: 60, categorie: "comfortzone", coins: 300, titel: "Leer hoe je een uur lang alleen maar luistert zonder te praten" },
  { id: 208, duur: 60, categorie: "comfortzone", coins: 300, titel: "Doe een uur lang iets wat je eng vindt maar veilig is" },
  { id: 209, duur: 60, categorie: "comfortzone", coins: 300, titel: "Leer hoe je een uur lang zonder sociale media leeft" },
  { id: 210, duur: 60, categorie: "comfortzone", coins: 300, titel: "Probeer een uur lang te schrijven over dingen die je normaal niet opschrijft" },

  // Productiviteit
  { id: 211, duur: 60, categorie: "productiviteit", coins: 300, titel: "Leer hoe je je hele leven opruimt in een uur" },
  { id: 212, duur: 60, categorie: "productiviteit", coins: 300, titel: "Schrijf een volledig plan voor de komende 3 maanden" },
  { id: 213, duur: 60, categorie: "productiviteit", coins: 300, titel: "Leer hoe je je financiën volledig op orde brengt" },
  { id: 214, duur: 60, categorie: "productiviteit", coins: 300, titel: "Schrijf alles op wat je wil bereiken in je leven" },
  { id: 215, duur: 60, categorie: "productiviteit", coins: 300, titel: "Leer hoe je alles opruimt wat je al jaren wil opruimen" },
  { id: 216, duur: 60, categorie: "productiviteit", coins: 300, titel: "Schrijf een gedetailleerd plan voor je grootste doel" },
  { id: 217, duur: 60, categorie: "productiviteit", coins: 300, titel: "Leer hoe je je inbox en alle berichten in een uur leeg maakt" },
  { id: 218, duur: 60, categorie: "productiviteit", coins: 300, titel: "Schrijf een eerlijke analyse van je leven tot nu toe" },
  { id: 219, duur: 60, categorie: "productiviteit", coins: 300, titel: "Leer hoe je je digitale leven van voor naar achter organiseert" },
  { id: 220, duur: 60, categorie: "productiviteit", coins: 300, titel: "Schrijf op wat je zou veranderen als je opnieuw kon beginnen" },
  { id: 221, duur: 60, categorie: "productiviteit", coins: 300, titel: "Leer hoe je een groot project start dat je al lang uitstelt" },
  { id: 222, duur: 60, categorie: "productiviteit", coins: 300, titel: "Schrijf een volledig jaar plan voor jezelf" },
  { id: 223, duur: 60, categorie: "productiviteit", coins: 300, titel: "Leer hoe je je slaap, eten en sport combineert voor meer energie" },
  { id: 224, duur: 60, categorie: "productiviteit", coins: 300, titel: "Schrijf op wat je ideale leven eruitziet en hoe je er komt" },
  { id: 225, duur: 60, categorie: "productiviteit", coins: 300, titel: "Leer hoe je een systeem bouwt zodat je nooit meer dingen vergeet" },

  // Creativiteit
  { id: 226, duur: 60, categorie: "creativiteit", coins: 300, titel: "Leer hoe je een volledig tafereel tekent met personages en achtergrond" },
  { id: 227, duur: 60, categorie: "creativiteit", coins: 300, titel: "Leer hoe je een compleet kort verhaal schrijft van begin tot eind" },
  { id: 228, duur: 60, categorie: "creativiteit", coins: 300, titel: "Leer hoe je een volledig nummer maakt met tekst en melodie" },
  { id: 229, duur: 60, categorie: "creativiteit", coins: 300, titel: "Leer hoe je een fantasiewereld tekent zo gedetailleerd mogelijk" },
  { id: 230, duur: 60, categorie: "creativiteit", coins: 300, titel: "Leer hoe je een script schrijft voor een korte film van 10 minuten" },
  { id: 231, duur: 60, categorie: "creativiteit", coins: 300, titel: "Probeer in een uur iets te bouwen van materialen om je heen" },
  { id: 232, duur: 60, categorie: "creativiteit", coins: 300, titel: "Leer hoe je een portret tekent zo realistisch mogelijk" },
  { id: 233, duur: 60, categorie: "creativiteit", coins: 300, titel: "Leer hoe je een volledig dagboek schrijft van de afgelopen maand" },
  { id: 234, duur: 60, categorie: "creativiteit", coins: 300, titel: "Leer hoe je een complete fotoserie maakt met een duidelijk verhaal" },
  { id: 235, duur: 60, categorie: "creativiteit", coins: 300, titel: "Leer hoe je de tekst schrijft van een volledig album" },
  { id: 236, duur: 60, categorie: "creativiteit", coins: 300, titel: "Leer hoe je een complete stad tekent vanuit vogelperspectief" },
  { id: 237, duur: 60, categorie: "creativiteit", coins: 300, titel: "Schrijf een brief aan jezelf over 30 jaar" },
  { id: 238, duur: 60, categorie: "creativiteit", coins: 300, titel: "Leer hoe je een complete game ontwerpt op papier" },
  { id: 239, duur: 60, categorie: "creativiteit", coins: 300, titel: "Probeer voor het eerst een volledig toneelstuk te schrijven" },
  { id: 240, duur: 60, categorie: "creativiteit", coins: 300, titel: "Leer hoe je een animatie bedenkt en uitwerkt op papier" },
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
