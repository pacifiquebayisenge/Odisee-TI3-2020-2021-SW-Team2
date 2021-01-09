# language: nl 

Functionaliteit: een task behren
    Als gebruiker wil ik taken kunnen aanmaken zodat ik de taken per groep kan beheren en/of toewijzen aan mezelf of andere leden om de productiviteit van de groep te verbeteren

    Achtergrond:
    Gegeven : de gebruiker is ingelogd
    En : bevindt zich op de pagina van de gekozen groep


    Scenario: een task aanmaken met de naam 'huiswerk maken'
    Als : de gebruiker een task aanmaakt met de naam 'huiswerk maken'
    Dan : zou de gebruiker 'task succesfully created' moeten zien verschijnen
    En : wordt de pagina herladen met de nieuw gemaakte task

    Scenario: de naam van een taks wijzigen
    Als : de gebruiker de naam van een task wijzigt naar 'studeren voor de toets'
    Dan : zou de gebruiker 'task succesfully edited' moeten zien verschijnen
    En : wordt de pagina herladen met de gewijzigde task

    Scenario: een task verwijderen
    Als : de gebruiker een task verwijdert
    Dan : wordt de pagina herladen en is de verwijderde task niet meer zichtbaar

    Scenario: een task proberen aanmaken met ongeldige gegevens
    Als : de gebruiker een task aanmaakt met ongeldige gegevens
    Dan : zou de gebruiker de task niet moeten kunnen aanmaken