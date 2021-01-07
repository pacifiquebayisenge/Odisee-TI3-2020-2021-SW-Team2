import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Forms } from './forms.service';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(private router: Router, private authservice: AuthService, private formService: Forms) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {


        let localId = localStorage.getItem('userId')


        if (localId != null) {
            // logged in so return true


            return true;
        }
        else {
            // not logged in so redirect to login page with the return url

            this.formService.loginPopup();
            return false;
        }
    }


}