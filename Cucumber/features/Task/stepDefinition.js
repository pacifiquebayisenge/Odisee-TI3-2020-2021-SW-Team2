var {Given,  When, Then, BeforeAll} = require('@cucumber/cucumber'); 

BeforeAll(function(){  
    return console.log('BeforeAll - navigeer naar de pagina');  
  });

  Given(': bevindt zich op de pagina van de gekozen groep', function () {
    // Write code here that turns the phrase above into concrete actions
    return console.log('bevindt zich op de pagina van de gekozen groep');
  });

  When(': de gebruiker een task aanmaakt met de naam {string}', function (string) {
    // Write code here that turns the phrase above into concrete actions
    return console.log('de gebruiker een task aanmaakt met de naam "huiswerk maken"');
  });

  Then(': wordt de pagina herladen met de nieuw gemaakte task', function () {
    // Write code here that turns the phrase above into concrete actions
    return console.log('wordt de pagina herladen met de nieuw gemaakte task');
  });

  When(': de gebruiker de naam van een task wijzigt naar {string}', function (string) {
    // Write code here that turns the phrase above into concrete actions
    return console.log('de gebruiker de naam van een task wijzigt naar "studeren voor de toets"');
  });

  Then(': wordt de pagina herladen met de gewijzigde task', function () {
    // Write code here that turns the phrase above into concrete actions
    return console.log('wordt de pagina herladen met de gewijzigde task');
  });

  When(': de gebruiker een task verwijdert', function () {
    // Write code here that turns the phrase above into concrete actions
    return console.log('de gebruiker een task verwijdert');
  });

  Then(': wordt de pagina herladen en is de verwijderde task niet meer zichtbaar', function () {
    // Write code here that turns the phrase above into concrete actions
    return console.log('wordt de pagina herladen en is de verwijderde task niet meer zichtbaar');
  });

  When(': de gebruiker een task aanmaakt met ongeldige gegevens', function () {
    // Write code here that turns the phrase above into concrete actions
    return console.log('de gebruiker een task aanmaakt met ongeldige gegevens');
  });

  Then(': zou de gebruiker de task niet moeten kunnen aanmaken', function () {
    // Write code here that turns the phrase above into concrete actions
    return console.log('zou de gebruiker de task niet moeten kunnen aanmaken');
  });