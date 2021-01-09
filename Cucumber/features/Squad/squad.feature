    # language: nl
Functionaliteit:  een squad aanmaken
    Als gebruiker wil ik een squad kunnen aanmaken, zodat ik daar de leden of mezelf taken kan aanmaken, beheren of toewijzen

    Achtergrond:
    Gegeven : de gebruiker is ingelogd
    En : bevindt zich op popop up om een nieuwe squad aan te maken

    Scenario: een squad aanmaken met de naam 'School'
    Als : de gebruiker een squad aanmaakt met de naam 'School'    
    Dan : zou de gebruiker 'squad succesfully created' moeten zien verschijnen
    En : wordt de pagina herladen met de nieuw gemaakte squad
    
    Scenario: een squad aanmaken met de naam 'Chiro' en verschillende leden
    Als : de gebruiker een squad aanmaakt met de naam 'Chiro' 
    En : een 'nieuw lid' toevoegd  
    Dan : zou de gebruiker 'squad succesfully created' moeten zien verschijnen
    En : wordt de pagina herladen met de nieuw gemaakte squad

    Scenario: een squad proberen aanmaken met ongeldige gegvens
    Als : de gebruiker een squad aanmaakt met ongeldige gegvens
    Dan : zou de gebruiker de squad niet moeten kunnen aanmaken


    
     


