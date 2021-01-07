var {Given,  When, Then, BeforeAll} = require('@cucumber/cucumber');  
  
  BeforeAll(function(){  
    return console.log('BeforeAll - navigeer naar de pagina');  
  });

  Given(': de gebruiker is niet ingelogd', function () {
    // Write code here that turns the phrase above into concrete actions
    return console.log('Given - de gebruiker is niet ingelogd');  
  });

  Given(': bevindt zich op  de loginpagina van de applicatie', function () {
    // Write code here that turns the phrase above into concrete actions
    return console.log('Given - bevindt zich op  de loginpagina van de applicatie');  
  });

  When(': de gebruiker het juiste {string} invoert', function (string) {
    string = 'team2@odisee.be'
    // Write code here that turns the phrase above into concrete actions
    return console.log('When - de gebruiker het juiste email adress invoert ' + string);
  });

  When(': de gebruiker een ongeldig {string} invoert', function (string) {
    string = 'fout@fout.fout'
    // Write code here that turns the phrase above into concrete actions
    return console.log('When - de gebruiker een ongeldig email adress invoert ' + string );
  });

  When(': het juiste {string} invoert', function (string) {
    string = 'odisee2'
    // Write code here that turns the phrase above into concrete actions
    return console.log('When - het juiste wachtwoord invoert ' + string);
  });

  When(': een ongeldig {string} invoert', function (string) {
    string = 'fout'
    // Write code here that turns the phrase above into concrete actions
    return console.log('When - een ongeldig wachtwoord invoert ' + string);
  });
  
  When(': op de login knop drukt', function () {
    // Write code here that turns the phrase above into concrete actions
    return console.log('Given - op de login knop drukt');
  });

  Then(': zou de gebruiker ingelogd moeten zijn', function () {
    // Write code here that turns the phrase above into concrete actions
    return console.log('Then - zou de gebruiker ingelogd moeten zijn');  
  });

  Then(': zou de gebruiker niet ingelogd moeten zijn', function () {
    // Write code here that turns the phrase above into concrete actions
    return console.log('Then - zou de gebruiker niet ingelogd moeten zijn');
  });

  Then(': wordt de gebruiker herleid naar de homepagina', function () {
    // Write code here that turns the phrase above into concrete actions
    return console.log('Then - wordt de gebruiker herleid naar de homepagina'); 
  });
  
  Then(': zou er een foutmelding moeten worden weergegeven', function () {
    // Write code here that turns the phrase above into concrete actions
    return console.log('Then - zou er een foutmelding moeten worden weergegeven'); 
  });
   