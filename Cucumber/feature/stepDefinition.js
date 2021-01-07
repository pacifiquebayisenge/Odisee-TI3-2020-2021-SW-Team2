var {Given,  When, Then} = require('@cucumber/cucumber');  
  

  Given(': de gebruiker is niet ingelogd', function () {
    // Write code here that turns the phrase above into concrete actions
    return console.log('Given - de gebruiker is niet ingelogd');  
  });

  Given(': bevindt zich op  de loginpagina van de applicatie', function () {
    // Write code here that turns the phrase above into concrete actions
    return console.log('Given - bevindt zich op  de loginpagina van de applicatie');  
  });

  When(': de gebruiker de juiste email en wachtwoord invoert', function () {
    // Write code here that turns the phrase above into concrete actions
    return console.log('When - de gebruiker de juiste email en wachtwoord invoert');  
  });
  
  When(': op de login knop drukt', function () {
    // Write code here that turns the phrase above into concrete actions
    return console.log('Given - op de login knop drukt');
  });

  Then(': zou de gebruiker ingelogd moeten zijn', function () {
    // Write code here that turns the phrase above into concrete actions
    return console.log('Then - zou de gebruiker ingelogd moeten zijn');  
  });
  
   