# 61. Spatial Room Navigation & S\u00e4kerhet

Detta dokument beskriver anv\u00e4ndarens spatiala karta f\u00f6r systemet och hur de smidigt ansluter sig till en tillf\u00e4llig digital representation (grupp/rum) liven i kyrkan/lokalen.

## 1. Grupp vs M\u00f6te / Rum

N\u00e4r du i f\u00f6rsta instans anl\u00e4nder skapar en admin en **"Organisation"** (t.ex Gruppkod `UTBY`).
Inne i gruppen \u00e4r det m\u00f6jligt att instantiera flera separata **Rum** eller f\u00f6rehavanden.

- V\u00e5rt nya UX krav slopar h\u00e4rmed alla URL/Token-l\u00e4ngor: `?room=WE59K`. Vi g\u00f6mmer the ID och kastar upp Klartext Namn p\u00e5 M\u00f6ten, s\u00e5som `[Huvudsalen]`, eller `[Fiket]`, ist\u00e4llet. M\u00e4nniskan ska i ren text kunna k\u00e4nna igen sig.

## 2. Spatial Navigering (De Tre Ing\u00e5ngarna)

Inl\u00e5sning/Ing\u00e5ng hanterar vi via b\u00e5de det rent smidiga rent visuella:

1. **List-Vyn:** Vanligt standardiserat menyslang. En lista med P\u00e5g\u00e5ende Rum visas d\u00e4r man bara tap:ar det man letar efter.
2. **QR-kod (Quick Transfer):** Admins kan sl\u00e4ppa fysiska printade \"QR Code Checkpoints\" p\u00e5 exempel d\u00f6rren in i kapellet. En snabb kamerascan puttar ens mobill\u00e4sare direkt ner i the specfika `Huvudsalens` url.
3. **Kartan (Blueprint Map):** D\u00e4r vi integrerar en visuell topdown-ritning (2D-blueprint) \u00f6ver byggnaden ifr\u00e5n `components/UI/Blueprint`. Admin av f\u00f6rsamlingen kan digitalt dra och sl\u00e4ppa `RoomNodes` dirre p\u00e5 en koordinat ("Lillk\u00f6r-rummet"). Vilket g\u00f6r att du ser rummet och klickar p\u00e5 det!

## 3. Visuell S\u00e4kerhet (Role Permissions)

Zero-Trust s\u00e4kerheten d\u00e4r Listeners \u00e4r helt strypta bakom kulisserna \u00f6vers\u00e4tts mjukt och oagressivt p\u00e5 klienten via visuell \u00e5terkoppling utan felmeddelanden:

- Om en lyssnare (`role === 'listener'`) stiger in p\u00e5 StartPage / Event Stream s\u00e5 **existerar mikrofon-funktionen knappt visuelt**, eller visas formellt gr\u00e5skalad/sp\u00e4rrad med ett ikoniskt "H\u00e4ngl\u00e5s" ikonen f\u00f6r att undvika kognitiv \u00f6verladdning av vrf knapparna kr\u00e5nglar.

### Live-Reactive Override (Admin Permissions Upgrade i M\u00f6tet)

Ett m\u00f6te f\u00f6ruts\u00e4tter d\u00e5 och d\u00e5 n\u00e5gon av lyssnarna kr\u00e4vs utifr\u00e5n publiken att l\u00e4sa en s\u00e5ng eller agera talare tillf\u00e4lligt:

- State M\u00e5ste Vara Reaktionsstarkt: Om m\u00f6tets Admin h\u00f6jer lyssnaren till `Teacher/S\u00e4ndare` State s\u00e5 lyssnar Firebase onSnapshot on user profile: Mikrofonknappen d\u00e4r nere animeras Mjukt Fram live p\u00e5 anv\u00e4ndarens telefon s\u00e5 fort beh\u00f6righeten slog sl\u00e4ppt igenom, utan Reload.
