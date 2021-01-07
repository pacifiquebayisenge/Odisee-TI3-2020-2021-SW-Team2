var {Given,  When, Then, BeforeAll} = require('@cucumber/cucumber');  
  
  BeforeAll(function(){  
    return console.log("BeforeAll - navigeer naar de pagina");  
  });

  Given(': de gebruiker is niet ingelogd', function () {
    // Write code here that turns the phrase above into concrete actions
    return console.log('Given - de gebruiker is niet ingelogd');  
  });

  Given(': bevindt zich op  de loginpagina van de applicatie', function () {
    // Write code here that turns the phrase above into concrete actions
    return console.log('Given - bevindt zich op  de loginpagina van de applicatie');  
  });


  When(': de gebruiker het juiste email adress invoert', function () {
    // Write code here that turns the phrase above into concrete actions
    return console.log('When - de gebruiker het juiste email adress invoert');
  });

  When(': de gebruiker een ongeldig email adress invoert', function () {
    // Write code here that turns the phrase above into concrete actions
    return console.log('When - de gebruiker een ongeldig email adress invoert');
  });
  
  When(': en het juiste wachtwoord invoert', function () {
    // Write code here that turns the phrase above into concrete actions
    return console.log('When - en het juiste wachtwoord invoert');
  });  

  When(': een ongeldig wachtwoord invoert', function () {
    // Write code here that turns the phrase above into concrete actions
    return console.log('When - een ongeldig wachtwoord invoert');
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
   