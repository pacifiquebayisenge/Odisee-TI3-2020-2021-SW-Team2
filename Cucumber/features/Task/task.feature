# language: nl 

Functionaliteit: een taak aanmaken

 Achtergrond:
    Gegeven : de gebruiker is ingelogd
    En : bevindt zich op  de homepagina van de applicatie

Scenario: een taak aanmaken met de naam "A" 


Als: ik een nieuwe taak maakt met een unieke titel en beschrijving 

Dan: zou een bevestigingsprompt moeten verschijnen 

En: ik zou de nieuwe taak moeten kunnen zien 