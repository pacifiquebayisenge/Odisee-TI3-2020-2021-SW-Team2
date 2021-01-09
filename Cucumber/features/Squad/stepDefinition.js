var {Given,  When, Then, BeforeAll} = require('@cucumber/cucumber');  

BeforeAll(function(){  
    return console.log('BeforeAll - navigeer naar de pagina');  
  });

  Given(': de gebruiker is ingelogd', function () {
    // Write code here that turns the phrase above into concrete actions
    return console.log('de gebruiker is ingelogd');
  });

  Given(': bevindt zich op popop up om een nieuwe squad aan te maken', function () {
    // Write code here that turns the phrase above into concrete actions
    return console.log('bevindt zich op popop up om een nieuwe squad aan te maken');
  });

  When(': de gebruiker een squad aanmaakt met de naam {string}', function (string) {
    // Write code here that turns the phrase above into concrete actions
    return console.log('de gebruiker een squad aanmaakt met de naam School');
  });

  When(': een {string} toevoegd', function (string) {
    // Write code here that turns the phrase above into concrete actions
    return console.log('een "nieuw lid" toevoegd');
  });

  Then(': zou de gebruiker {string} moeten zien verschijnen', function (string) {
    // Write code here that turns the phrase above into concrete actions
    return console.log('zou de gebruiker "squad succesfully created" moeten zien verschijnen');
  });

  Then(': wordt de pagina herladen met de nieuw gemaakte squad', function () {
    // Write code here that turns the phrase above into concrete actions
    return console.log('wordt de pagina herladen met de nieuw gemaakte squad');
  });

  When(': de gebruiker een squad aanmaakt met ongeldige gegvens', function () {
    // Write code here that turns the phrase above into concrete actions
    return console.log('de gebruiker een squad aanmaakt met ongeldige gegvens');
  });

  Then(': zou de gebruiker de squad niet moeten kunnen aanmaken', function () {
    // Write code here that turns the phrase above into concrete actions
    return console.log('zou de gebruiker de squad niet moeten kunnen aanmaken');
  });
