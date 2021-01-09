    # language: nl
Functionaliteit:  een squad beheren
    Als gebruiker wil ik een squad kunnen aanmaken, zodat ik er taken kan aanmaken, beheren of toewijzen voor de groepsleden of mezelf

    Achtergrond:
    Gegeven : de gebruiker is ingelogd
    En : bevindt zich op de homepagina


    Scenario: een squad aanmaken met de naam 'School'
    Als : de gebruiker een squad aanmaakt met de naam 'School'    
    Dan : zou de gebruiker 'squad succesfully created' moeten zien verschijnen
    En : wordt de pagina herladen met de nieuw gemaakte squad
    
    Scenario: een squad aanmaken met de naam 'Chiro' en verschillende leden
    Als : de gebruiker een squad aanmaakt met de naam 'Chiro' 
    En : een 'nieuw lid' toevoegd  
    Dan : zou de gebruiker 'squad succesfully created' moeten zien verschijnen
    En : wordt de pagina herladen met de nieuw gemaakte squad

    Scenario: een squad proberen aanmaken met ongeldige gegevens
    Als : de gebruiker een squad aanmaakt met ongeldige gegevens
    Dan : zou de gebruiker de squad niet moeten kunnen aanmaken

    Scenario: een naam van een squad wijzigen naar 'studiegroep'
    Als : de gebruiker de naam van een squad wijzigt naar 'studiegroep'
    Dan : zou de gebruiker 'squad succesfully edited' moeten zien verschijnen
    En : wordt de pagina herladen met de gewijzigde squad

    Scenario: een squad verwijderen
    Als : de gebruiker een squad verwijdert 
    Dan : wordt de pagina herladen en is de verwijderde squad niet meer zichtbaar

    
     


