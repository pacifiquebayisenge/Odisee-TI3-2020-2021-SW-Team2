import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .then(() => {
    if ('serviceWorker' in navigator) {



      navigator.serviceWorker.register('./ngsw-config.js')
        .then(() => {
          console.log("service worker registered")
        })
        .catch((err) => {
          console.log("service worker not registered")
          console.log(err)
        })
    }

    navigator.serviceWorker.ready.then(() => fetch('./ngsw-config.js'));
  }



  )

  .catch(err => console.error(err));



