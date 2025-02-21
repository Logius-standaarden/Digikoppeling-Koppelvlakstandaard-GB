# Inleiding

## Doel en doelgroep

Dit document beschrijft de functionele specificaties voor de Digikoppeling
koppelvlakstandaard Grote Berichten, onderdeel van Digikoppeling.

Het document is bestemd voor architecten en ontwikkelaars die op basis van
Digikoppeling Grote Berichten gegevens willen uitwisselen. Zie onderstaande
tabel bij welke taken dit document ondersteunt. Alle webservices die op Grote
Berichten gebaseerd zijn, moeten conformeren aan de koppelvlakstandaard Grote
Berichten. Deze wordt tot in detail in dit document gespecificeerd. Het doel van
dit document is ontwikkelaars te informeren wat deze koppelvlakstandaard nu
precies inhoudt en waar zij zich aan moeten conformeren. Het gaat hierbij om
zowel (service) aanbieders als (service) afnemers.

| Afkorting | Rol                             | Taak                                                                                                       | Doelgroep? |
|-----------|---------------------------------|------------------------------------------------------------------------------------------------------------|------------|
| [MT]      | Management                      | Bevoegdheid om namens organisatie (strategische) besluiten te nemen.                                       | **Nee**    |
| [PL]      | Projectleiding                  | Verzorgen van de aansturing van projecten.                                                                 | **Nee**    |
| [A&D]     | Analyseren & ontwerpen (design) | Analyseren en ontwerpen van oplossings-richtingen. Het verbinden van Business aan de IT.                   | **Ja**     |
| [OT&B]    | Ontwikkelen, testen en beheer   | Ontwikkelt, bouwt en configureert de techniek conform specificaties. Zorgen voor beheer na ingebruikname.  | **Ja**     |

## Opbouw Digikoppeling documentatie

Digikoppeling is beschreven in een set van documenten. Deze set is als volgt
opgebouwd:

<figure>
  <object data="https://logius-standaarden.github.io/publicatie/dk/actueel/media/DK_Specificatie_structuur.svg" type="image/svg+xml" id="infographic">Overzicht van de onderdelen van de Digikoppeling Standaard, de standaard is onderverdeeld in normatieve en ondersteunende onderdelen</object>
  <figcaption>Opbouw documentatie Digikoppeling</figcaption>
</figure>

<b>Legenda</b>


<table class="legendum">
    <thead>
        <tr>
            <th><strong>Kleur</strong></th>
            <th><strong>Soort Document</strong></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="green">Groen</td>
            <td>Standaard documentatie</td>
        </tr>
        <tr>
            <td class="grey">Grijs</td>
            <td>Ondersteunende documentatie</td>
        </tr>
    </tbody>
</table>


<b>Beheer</b>

- De standaarddocumenten (groen/vierkant aangegeven) vallen onder het beheer zoals geformaliseerd in het document [[[?DK-Beheermodel]]].

- De ondersteunende documentatie wordt onderhouden door Logius als de beheerder van de standaard (en afgestemd met stakeholders/ gebruikers).

- Alle goedgekeurde documenten zijn te vinden op de website van Logius, [www.logius.nl](https://www.logius.nl/onze-dienstverlening/domeinen/gegevensuitwisseling/digikoppeling).

## Doel en scope van Digikoppeling

Digikoppeling biedt de mogelijkheid om op een gestandaardiseerde wijze berichten
uit te wisselen tussen partijen. De uitwisseling tussen partijen wordt in drie
lagen opgedeeld:

- Inhoud: Op deze laag worden de afspraken gemaakt de inhoud van het uit te
    wisselen bericht, dus de structuur, semantiek en waardebereiken.
    Digikoppeling houdt zich **niet** met de inhoud bezig, ‘Digikoppeling heeft
    geen boodschap aan de boodschap’.

- Logistiek: Op deze laag bevinden zich de afspraken betreffende

    transportprotocollen (HTTP), messaging (SOAP), beveiliging

    (authenticatie en encryptie)en betrouwbaarheid. *Dit is de*

    *Digikoppeling-laag.*

- Transport: deze laag verzorgt het daadwerkelijke transport van

    het bericht.

Digikoppeling richt zich dus uitsluitend op de logistieke laag. Deze afspraken
komen in de koppelvlakstandaards en andere voorzieningen. In het geval van WUS
en ebMS2 komt de logistieke laag overeen met de ‘header’ van het bericht en gaat
de ‘body’ uitsluitend over de inhoud. In het geval van Digikoppeling grote
berichten is een deel van de logistieke informatie opgenomen in de ‘body’ van
het bericht in de vorm van gestandaardiseerde meta-data.

### Leidend principe

De koppelvlakstandaarden dienen te leiden tot een maximum aan interoperabiliteit
met een minimum aan benodigde ontwikkelinspanning.

Daarom wordt gekozen voor bewezen interoperabele internationale standaarden.

Digikoppeling maakt berichtenuitwisseling mogelijk op basis van de ebXML/ebMS2
en WUS families van standaarden inclusief de daarbij behorende verwante
standaarden.

<aside class="note">

## Digikoppeling REST API profiel en Grote Berichten

Naast ebXML/ebMS2 en WUS profielen kent Digikoppeling ook een REST API profiel. 
De koppelvlakstandaard Grote Berichten is met name bedoeld en geschikt voor gebruik in de context van ebMS2 en WUS. 
In geval van gebruik van een REST API koppelvlak zal het in veel gevallen mogelijk zijn om het grote bestand direct over te zenden. Mocht dit niet mogelijk zijn dan kan ook voor het REST API profiel gebruik gemaakt worden van de koppelvlakstandaard Grote Berichten. Het stuurbericht met de meta data over het grote bestand kan dan conform de afspraken in deze koppelvlakstandaard Grote Berichten worden opgesteld en met behulp van een (REST) API worden aangeleverd bij de ontvanger. 
	
	

</aside>

Aan te sluiten overheidsorganisaties hebben aangegeven op een uniforme manier
(één stekker) te willen aansluiten aan Digikoppeling. Organisaties die
beschikken over eigen middleware (ESB, Broker, Gateway) kunnen de aansluiting
aan Digikoppeling, de adapters, in het algemeen realiseren via voorzieningen in
die middleware.

De architectuur voor toepassing van Digikoppeling standaard is beschreven in het
document “Digikoppeling\_Architectuur”.

## Koppelvlak & koppelvlakstandaard

Een koppelvlak is een interface die volgens standaarden de gegevensuitwisseling
verzorgt. Het werken met vaste standaarden is essentieel voor een koppelvlak.
Hierdoor wordt implementatie vergemakkelijkt. Ook wordt het mogelijk diverse
soorten berichten door te sturen met een grote mate van interoperabiliteit,
omdat via de standaard afspraken over hun inhoud gemaakt is.

Een van de belangrijkste eisen die door de overheid gesteld worden bij de
inrichting van generieke voorzieningen is dat er niet veel maatwerk ontwikkeld
hoeft te worden, maar dat er van “off the shelf” commercieel of OPEN geleverde
software gebruik gemaakt kan worden. Voor Digikoppeling, dus voor de logistieke
laag, betreft dat het niet willen ontwikkelen van software voor de adapters. Dit
doel kan bereikt (benaderd) worden doordat gekozen wordt voor internationale (de
jure of de facto) vastgelegde standaards, die door “alle” leveranciers
interoperabel zijn geïmplementeerd.

Een andere eis is dat met name afnemers gebruik kunnen maken van één “stekker”
(één logistiek koppelpunt).

### Specificatie van de koppelvlakstandaard

De koppelvlakspecificatie beschrijft de eisen waar de adapters aan moeten
voldoen om interoperabel met elkaar te kunnen communiceren.

De Digikoppeling Grote Berichten Standaard beschrijft dan ook niet de inhoud van
het grote bericht. Wel richt de standaard zich op de beschrijving (metadata) van
het grote bericht.

## Opbouw van dit document

Hoofdstuk 1 bevat een aantal algemene inleidende onderwerpen. Hoofdstuk 2 bevat
de kern van de standaard met de algemene gebruiksvoorwaarden.

Hoofdstuk 3 gaat in op het gebruik van de metadata.

Hoofdstuk 4 gaat in op de wijze waarop grote bestanden uitgewisseld worden.

Hoofdstuk 5 bevat de referenties en bijlagen.

Begrippen en afkortingen worden toegelicht in het document
“Digikoppeling\_Architectuur”.

Dit document en andere documentatie is beschikbaar op
[www.logius.nl/Digikoppeling](http://www.logius.nl/digikoppeling)

