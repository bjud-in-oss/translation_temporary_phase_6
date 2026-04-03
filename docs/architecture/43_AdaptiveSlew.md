### 

MODUL 43

 Ljudmotor: Adaptive Slew (Legacy & Integration)

Adaptive Slew är "gaspedalen" i vårt system. I v2 (Hybrid Velocity) fungerar denna modul som styrenhet för WSOLA-motorn.

#### Slew Rate Limiting

**Principen: Tröghet**

Vi tillåter aldrig att hastigheten (\`currentSpeed\`) ändras momentant. Även om Zon-logiken (se Modul 50) säger "Gå till 1.3x", tvingar Slew-funktionen motorn att glida dit mjukt.

currentSpeed += (target - current) \* 0.0001;

#### Integration med WSOLA

Slew-värdet matas in i WSOLA-algoritmen:

-   **Vid 1.0x:** Motorn kör "Bit-perfect" loop (ingen processing).
-   **Vid >1.0x:** Motorn aktiverar Overlap-Add. Slew-värdet bestämmer hur mycket "överlapp" som krävs.

Se **Modul 50** för detaljer om Zon-indelningen.