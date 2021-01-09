var {Given,  When, Then, BeforeAll} = require('@cucumber/cucumber');  

BeforeAll(function(){  
    return console.log('BeforeAll - navigeer naar de pagina');  
  });

  Given(': beschikt over een squad met leden en taken', function () {
    // Write code here that turns the phrase above into concrete actions
    return console.log('beschikt over een squad met leden en taken');
  });

  Given(': bevindt zich op de overview pagina', function () {
    // Write code here that turns the phrase above into concrete actions
    return console.log('bevindt zich op de overview pagina');
  });

  When(': de gebruiker een squad selecteert', function () {
    // Write code here that turns the phrase above into concrete actions
    return console.log('de gebruiker een squad selecteert');
  });

  Then(': zou de gebruiker een visualisatie moeten zien over de vooruitgang van de squad', function () {
    // Write code here that turns the phrase above into concrete actions
    return console.log('zou de gebruiker een visualisatie moeten zien over de vooruitgang van de squad');
  });