### 

MODUL 32

 Guide: Mac + Jabra (Litet Rum)

#### Scenario: "Mötesrummet"

Du använder en Mac och en **Jabra Speak** (ljudpuck) för både mikrofon och högtalare. Du vill att appen ska översätta/transkribera Zoom-mötet, men deltagarna i rummet måste också höra mötet genom pucken.

#### Steg 1: Skapa Multi-Output

Vi måste lura Macen att skicka ljudet till två ställen samtidigt (Jabra + Appen).

1.  Koppla in din Jabra Puck via USB.
2.  Öppna **Audio MIDI Setup** på Macen.
3.  Tryck `+` → **Create Multi-Output Device**.
4.  Kryssa i följande enheter i listan:
    -   \[x\] BlackHole 2ch (Drift Correction)
    -   \[x\] Jabra Speak (Master Device)
5.  _Tips:_ Högerklicka på "Multi-Output Device" och döp om den till "Zoom Splitter".

#### Steg 2: Zoom Inställningar (Kritisk Skillnad)

Ska Macen ha samma inställningar som Tesira-datorn? **NEJ.**

**Stora Salen (Tesira)**

Original Sound: PÅ

Echo Cancel: AV

Tesiran tar bort ekot åt oss. Zoom ska inte röra ljudet.

**Lilla Rummet (Jabra)**

Original Sound: AV

Echo Cancel: AUTO

Jabran är bra, men inte perfekt. **Låt Zooms filter vara påslagna.** Om du kör "Original Sound" här kommer motparten höra eko.

**Resultat för Macen:**

-   **Zoom Output:** Välj "Zoom Splitter" (så både Jabra och App hör).
-   **Zoom Input:** Välj "Jabra Speak".
-   **Zoom Audio Profile:** Standard (Zoom Optimized).