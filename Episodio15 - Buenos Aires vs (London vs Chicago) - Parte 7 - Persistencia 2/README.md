# Episodio 15 - Buenos Aires vs. (London vs. Chicago) - Parte 7 - Persistencia 2

En este episodio hicimos el modelo persistente en base de datos relacionales y base de objetos (GemStone).

La parte de persistencia en base de datos relacional, en Java, está preparada para correr en memoria (Transient) y en base de datos relacional (Persistent) de manera transparente y polimórfica para que funcionen los mismos tests.

La parte de persistencia en Base de Objetos está en Smalltalk. La parte que corre en memoria hecha en Cuis Smalltalk y la parte persistente en GemStone. O sea, para pasar de transient a persistent hay que cambiar de ambiente de desarrollo nada más.

Para usar la implementación en Cuis, simplemente droopear el archivo OpenChat.pck.st en Cuis.
La implementación en GemStone esta en el dir gemStone de dicho repo. Leer el README.TXT para mayor info.

El código en Smalltalk está en https://github.com/hernanwilkinson/openchat-buenosaires-smalltalk.git

El código Java, en el repo de siempre: https://github.com/hernanwilkinson/openchat-buenosaires.git

En branch de la persistencia en BDD es: persistencia-baseDeDatos-pasoAPaso

Pueden acceder al video acá: https://academia.10pines.com/topics/10/videos/55
----
