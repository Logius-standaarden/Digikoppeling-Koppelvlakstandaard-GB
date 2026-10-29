import { loadRespecWithConfiguration } from "https://logius-standaarden.github.io/publicatie/respec/organisation-config.mjs";

loadRespecWithConfiguration({
  authors: [ { 
    "name" : "Pieter Hering",
    "url" : "https://logius.nl"
  } ],
  editors: [ 
    {
      "name" : "Peter Haasnoot",
      "company" : "Logius",
      "url" : "https://logius.nl"
    },
    {
      "company" : "Logius",
      "url" : "https://logius.nl",
      "name" : "Pieter Hering"
    }
  ],
  github: "https://github.com/Logius-standaarden/Digikoppeling-Koppelvlakstandaard-GB",
  previousPublishDate: "2020-09-09",
  previousPublishVersion: "3.8",
  pubDomain: "dk",
  pubSubDomain: "gb",
  publishDate: "2022-04-11",
  publishVersion: "3.8.1",
  shortName: "gb",
  specStatus: "WV",
  specType: "ST"
});
