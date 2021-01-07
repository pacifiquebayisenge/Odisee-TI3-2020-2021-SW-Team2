    # language: nl
Functionaliteit:  Inloggen
    Een gebruiker moet zich kunnen inloggen met zijn gegevens, zodat hij/zij zijn taken kan beheren.

    Achtergrond:
    Gegeven : bevindt zich op  de loginpagina van de applicatie
    

    Scenario: succesvolle login
   
    Als : de gebruiker het juiste "email adres" invoert
    En : het juiste "wachtwoord" invoert
    En : op de login knop drukt
    Dan : zou de gebruiker ingelogd moeten zijn
    En : wordt de gebruiker herleid naar de homepagina

    Scenario: ongeldig wachtwoord
    
    Als : de gebruiker het juiste "email adres" invoert
    En : een ongeldig "wachtwoord" invoert
    En : op de login knop drukt    
    Dan : zou de gebruiker niet ingelogd moeten zijn    
    En : zou er een foutmelding moeten worden weergegeven 

    Scenario: ongeldig email
    
    Als : de gebruiker een ongeldig "email adres" invoert
    En : het juiste "wachtwoord" invoert
    En : op de login knop drukt    
    Dan : zou de gebruiker niet ingelogd moeten zijn    
    En : zou er een foutmelding moeten worden weergegeven 