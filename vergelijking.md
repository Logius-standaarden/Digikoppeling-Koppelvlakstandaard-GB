---
title: "Vergelijking S3 API Interface en Digikoppeling Grote Berichten"
shortName: s3-vs-digikoppeling-gb
publishDate: 2025-05-27
editors: Martin van der Plas
status : Zelfstandig onderzoek
    
---

## Abstract

Dit document vergelijkt de S3 API interface, zoals gangbaar bij object storage systemen, met de Digikoppeling Grote Berichten standaard (GB) zoals beschreven door Logius. De focus ligt op de functionele architectuur, communicatiepatronen, interoperabiliteit en gebruiksscenario’s. Deze analyse ondersteunt overheidsorganisaties bij het kiezen van een geschikt koppelvlak voor het uitwisselen van grote bestanden.

## 1. Inleiding

De S3 API wordt breed ingezet voor het opslaan en ophalen van objecten (bestanden) in cloudomgevingen. Digikoppeling Grote Berichten is specifiek ontworpen voor betrouwbare overdracht van grote berichten binnen de Nederlandse overheid.

## 2. Functionele vergelijking

| Aspect                            | S3 API (Amazon S3 e.a.)                             | Digikoppeling Grote Berichten (GB)                                     |
|----------------------------------|------------------------------------------------------|------------------------------------------------------------------------|
| Doel                             | Opslag en distributie van objecten (bestanden)      | Betrouwbare overdracht van grote berichten tussen overheden           |
| Protocol                         | RESTful HTTP + XML/JSON                             | ebMS 2.0 / SOAP over HTTP(S)                                           |
| Beveiliging                      | TLS + HMAC of OAuth2                                | TLS + WUS-beveiligingsprofielen (WS-Security, X.509)                   |
| Bestandsgrootte                  | Maximaal 5 TB per object                            | Aanbevolen tot 1 GB, maar in de praktijk grotere berichten mogelijk    |
| Opslaglocatie                    | Cloud-gebaseerd, asynchroon                         | Ontvanger bepaalt opslag, synchronisatie vereist                      |
| Transactiecontrole               | Geen garanties over levering (BASE, niet ACID)      | Betrouwbare aflevering (bijv. met acknowledgements)                    |
| Metadata ondersteuning           | Vrije metadata op objectniveau                      | Metadata vereist conform ebMS headers en bijlagenstructuur             |
| Multipart ondersteuning          | Ja, voor upload van grote bestanden                 | Niet inherent ondersteund, standaard werkt met binaire bijlagen       |
| Integratie met backend systemen  | Directe REST API integratie                         | Koppeling via Digikoppeling-adapters (bijv. Digikoppeling Zender/Adapter) |
| Logging & auditing               | Optioneel via cloud logging                         | Verplicht volgens norm Digikoppeling Loggingprofiel                   |

## 3. Communicatiepatroon

| Eigenschap                   | S3 API                                     | Digikoppeling Grote Berichten                    |
|-----------------------------|---------------------------------------------|--------------------------------------------------|
| Client-initiatief           | Client pusht object naar S3                 | Zender initieert, maar vereist bevestiging van ontvangst |
| Asynchroon gedrag           | Ja (upload/download via HTTP requests)      | Ja, met expliciete ontvangstbevestigingen (ACK/NACK)     |
| Koppelvlakmodel             | Pull/push afhankelijk van use-case          | Push-gebaseerd met terugmelding                   |
| Tijdelijke URL's            | Ondersteund via pre-signed URLs             | Niet standaard; toegang gebeurt via directe overdracht  |

## 4. Beveiliging en betrouwbaarheid

| Beveiligingsaspect              | S3 API                                   | Digikoppeling GB                                  |
|--------------------------------|-------------------------------------------|--------------------------------------------------|
| Authenticatie                  | HMAC (AWS V4), IAM roles, OAuth           | X.509 certificaten volgens PKIoverheid            |
| Encryptie                      | In-transit (TLS) en optioneel at rest     | In-transit via TLS, rest bij ontvangende partij  |
| Integriteit                    | Checksum (MD5, SHA256 afhankelijk van platform) | Message Integrity via WS-Security             |
| Verzendbevestiging             | Nee                                       | Ja, expliciet                                     |
| Herstel na fout                | Client-herproberen                        | Retry- en foutafhandeling in ebMS verwerkt        |

## 5. Overwegingen voor overheidsgebruik

| Overweging                         | S3 API                                  | Digikoppeling Grote Berichten                   |
|-----------------------------------|------------------------------------------|-------------------------------------------------|
| Geschiktheid voor open data       | Zeer geschikt, publieke toegang mogelijk | Minder geschikt; ontworpen voor vertrouwelijke gegevens |
| Interoperabiliteit                | Vereist custom integratie                | Gestandaardiseerd binnen overheid               |
| Beheer en monitoring              | Cloud platform-specifiek                 | Uniform volgens Digikoppeling Monitoringprofiel |
| Compliance met ArchiMate/NORA     | Niet gegarandeerd                        | Ja, standaard sluit aan op NORA en GEMMA        |
| Leveranciersafhankelijkheid       | Vaak gebonden aan specifieke aanbieder   | Onafhankelijk van leverancier                   |

## 6. Conclusie

De S3 API is geschikt voor generieke opslagbehoeften in de cloud en integreert makkelijk met moderne webapplicaties. Digikoppeling Grote Berichten daarentegen biedt een robuuste, beveiligde en gestandaardiseerde manier om grote berichten betrouwbaar uit te wisselen tussen overheden, met volledige ondersteuning van logging, monitoring en terugmeldmechanismen.

Voor toepassingen binnen de overheid waar interoperabiliteit, beveiliging en auditability essentieel zijn, blijft Digikoppeling GB de aanbevolen keuze.

## 7. Referenties

- [Digikoppeling Koppelvlakstandaard Grote Berichten (GitHub)](https://logius-standaarden.github.io/Digikoppeling-Koppelvlakstandaard-GB/#abstract)
- [Amazon S3 API Documentation](https://docs.aws.amazon.com/AmazonS3/latest/API/Welcome.html)
- [Digikoppeling Stelsel](https://www.logius.nl/diensten/digikoppeling)
- [NORA: Nederlandse Overheid Referentie Architectuur](https://www.noraonline.nl/)