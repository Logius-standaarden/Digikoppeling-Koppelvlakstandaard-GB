# Bestandsoverdracht

## Functionaliteit

Bij elke bestandsoverdracht dient een bijbehorend meta-bericht via Digikoppeling
te worden verzonden.

| **Referentie** | **Type**    | **Specificatie**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
|----------------|-------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| GB000          | PUSH / PULL | De bestandsoverdracht MOET gerealiseerd worden op basis van het HTTP protocol, versie 1.1, conform [[rfc7230]], [[rfc7231]], [[rfc7232]], [[rfc7233]], [[rfc7234]] en [[rfc7235]].                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| GB001          | PULL        | Zowel de client als de server MOET de BYTE-RANGE optie ondersteunen conform [[rfc7233]] (i.e. Range, If-match, If-range, ETag en Content-range) [[rfc7232]] en [[rfc7233]].   De BYTE-RANGE optie wordt gebruikt om in geval van een resume onnodige hertransmissie van data te voorkomen. Hierdoor kan de voortgang van de bestandsoverdracht gegarandeerd worden.  De ondersteuning van de byte ranges is niet verplicht conform de RFC maar in de Digikoppeling-context wel.                                                                                                                                                                 |
| GB002          | PUSH / PULL | De client MOET de bestandsoverdracht initiëren door middel van een HTTP GET request (bij PULL) of een HTTP PUT (bij PUSH) conform [[rfc7231]].                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| GB003          | PULL        | Indien de client een OK response ontvangt (200), dan kan de client het grote bestand op basis van deze response reconstrueren; eventuele eerder ontvangen bytes MOET de client daarbij negeren (of overschrijven).                                                                                                                                                                                                                                                                                                                                                                                                                |
| GB004          | PULL        | Indien de client een Partial Content response ontvangt (206), dan MOET de client het grote bestand op basis van deze en alle eerdere (partiële) responses reconstrueren; eventuele overlappende byte ranges MOET de client daarbij overschrijven met de laatst ontvangen data.                                                                                                                                                                                                                                                                                                                                                    |
| GB005          | PULL        | Indien de HTTP verbinding verbroken wordt voordat het volledige grote bestand ontvangen is, en de client wil de overdracht hervatten dan MOET dit plaatsvinden door middel van een “Range” request conform [[rfc7233]].   De “Range” request maakt deel uit van de BYTE-RANGE optie. Indien de server byte ranges ondersteunt, dan zal deze een Partial Content response (206) naar de client sturen; indien de server geen byte ranges ondersteunt, dan zal deze een OK response sturen. De exacte response van de server is afhankelijke van eventueel aanwezige condities (if-range, if-match en if-unmodified-since) [[rfc7233]]. |
| GB016          | PUSH        | Bij elke HTTP PUT MOET het bestand aan de ontvangende kant worden overschreven.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| GB017          | PUSH        | Verzender KAN ZIP toepassen als container om de payload heen. Ook moet multipart met zip worden ondersteund. Compressie is geen vereiste of doel van ZIP. Wel een mogelijkheid.                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| GB018          | Algemeen    | De verzender MOET foutherstel kunnen uitvoeren nav het response bericht. (Het response bericht dient aan te geven welke fout is opgetreden. Het GB PUSH XSD schema kent hiervoor een optioneel te gebruiken berichtstructuur – zie de voorgedefinieerde foutcodes en foutmeldingen van het GB PUSH XSD schema).                                                                                                                                                                                                                                                                                                                   |

## Beveiliging

Alleen de beoogde verzender en ontvanger moeten in staat zijn om een groot
bestand te plaatsen of op te halen. Autorisatie moet daarom plaatsvinden aan de
hand van het OIN uit het certificaat van deze partijen.

| Referentie | **Type**    | **Specificatie**                                                                                                                                                                                                                                                                |
|------------|-------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| GB006      | PUSH / PULL | Het HTTP transport MOET beveiligd zijn met TLS. Aanbieder en afnemer ondersteunen de minimaal ondersteunde TLS encryptie algoritmen en sleutellengtes zoals beschreven in het [[Digikoppeling Beveiligingsdocument]]) op basis van een valide PKIoverheid certificaat [[PKIoverheid Certificaten]]. |
|            |             | Meer informatie in het [[Digikoppeling Beveiligingsdocument]]                                                                                                                                                                                                                     |
| GB007      | PUSH / PULL | De minimaal ondersteunde TLS encryptie algoritmen en sleutellengtes worden beschreven in het [[Digikoppeling Beveiligingsdocument]].                                                                                                                                              |
|            |             | Meer informatie in het [[Digikoppeling Beveiligingsdocument]]                                                                                                                                                                                                                     |
| GB008      | PUSH / PULL | Zowel de client als de server organisatie MOET zich authentiseren met een PKIoverheid certificaat [[PKI CA]], [[PKIoverheid Certificaten]].                                                                                                                                                           |
|            |             | De basis voor authenticatie en autorisatie in Digikoppeling is OIN. Achtergronden over dit gebruik zijn opgenomen in de Digikoppeling richtlijnen [[?Digikoppeling-Cert]] (2-zijdig TLS).                                                                                          |
| GB009      | PUSH / PULL | De server organisatie MOET het transport autoriseren op basis van het OIN van een valide client certificaat [[?Digikoppeling-Cert]].                                                                                                                                               |
| GB010      | PUSH / PULL | Indien de server een HTTP request ontvangt van een niet geautoriseerd OIN (in het client certificaat) dan MOET een HTTP 403 (Forbidden) response naar de client gestuurd worden                                                                                                 |
| GB011      | PUSH / PULL | De server moet certificaat-revocatie-lijsten (CRL) gebruiken [[PKI Policy]].                                                                                                                                                                                                      |
| GB012      | PUSH / PULL | Het HTTPS transport MOET over poort 443 plaatsvinden.                                                                                                                                                                                                                           |
| GB019      | PUSH / PULL | IP whitelisting KAN worden toegepast om toegang tot de PUSH server af te schermen                                                                                                                                                                                               |
| GB020      | PUSH / PULL | Afschermen van de PUSH server KAN door toepassing van Diginetwerk                                                                                                                                                                                                               |

## Betrouwbaarheid

De noodzaak van betrouwbaarheid is afhankelijk van de context. Indien de
bestandsoverdracht een melding (in combinatie met ebMS2) betreft, is ook
betrouwbaarheid noodzakelijk. Indien de bestandsoverdracht een bevraging (vaak
in combinatie met WUS) betreft, is dit niet noodzakelijk maar
hoogstwaarschijnlijk wenselijk.

Voor de context van meldingen dient de client een retry mechanisme te
implementeren rekening houdend met eventuele beperkte beschikbaarheid van het
netwerk en/of de server (service-window).

| Referentie | **Type** | **Specificatie**                                                                                                                                                                                                                                                                                                                                                                                           |
|------------|----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| GB013      | Algemeen | Voor meldingen, zoals bedoeld in de Digikoppeling architectuur, MOET een retry mechanisme toegepast worden dat rekening houdt met eventuele beperkte beschikbaarheid van het netwerk en/of de server (service-window)  De specificatie van het aantal retries en tijdswindow vormt een situationeel af te spreken gegeven. Dit komt overeen met (afspraken over) de configuratie van ebMS2 implementaties. |
| GB014      | Algemeen | Indien na ontvangst de omvang van het bestand niet overeen komt met de omvang uit het meta-bericht, dan MOET de bestandsoverdracht als niet-succesvol beschouwd worden (size error).                                                                                                                                                                                                                       |
| GB015      | Algemeen | Indien na ontvangst de checksum van het bestand niet overeen komt met de checksum uit het meta-bericht, dan MOET de bestandsoverdracht als niet-succesvol beschouwd worden (checksum error).                                                                                                                                                                                                               |