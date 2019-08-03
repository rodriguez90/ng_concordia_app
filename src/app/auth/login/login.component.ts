// angular imports
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// app imports
import {JwtService, OverlayService} from '../../../../projects/fbs-core/src/lib/services';
import {AppConfigService} from '../../config';
import {AuthService, CryptoJsService} from '../../core/services';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',

})
export class LoginComponent implements OnInit {
    // @ViewChild(RouterSpinnerComponent) spinner: RouterSpinnerComponent;
    isVisible = false;

    loginForm: FormGroup;
    submitted = false;
    loading = false;
    returnUrl: string;
    error = '';
    hasError = false;
    appName = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
        private jwtService: JwtService,
        private overlayService: OverlayService,
        public config: AppConfigService,
        public crypto: CryptoJsService) { }

    ngOnInit() {

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

        /*SI EXISTE UN TOKEN SETEADO TE REDIRECCIONA AL DASHBOARD*/
        // if (this.jwtService.getToken()) {
        //   this.router.navigate([this.returnUrl]);
        // }

        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        this.appName = this.config.configApp().appName;
    }

    get f() { return this.loginForm.controls; }

    onSubmit() {
        if (this.loginForm.invalid) {
            return;
        }
        if (!this.submitted) {
            this.submitted = true;
            this.loading = true;
            // this.overlayService.setBusy(true);
            const pass = this.crypto.encode(this.f.password.value);

            this.authService.login(this.f.username.value, pass).subscribe(persona => {
                    this.submitted = false;
                    this.loading = false;

                    if (persona === null || persona.id === null) {
                        // this.overlayService.setBusy(false);

                        return;
                    } else if (persona.user.roles == null || persona.user.roles.length === 0) {
                        // this.overlayService.setBusy(false);
                        return;
                    } else {
                        this.authService.setPersonaActual(persona);
                        this.jwtService.saveToken(persona.user.token);
                        this.authService.loggedInSubject.next(true);
                        this.overlayService.setBusy(false);

                        if (this.returnUrl !== '') {
                            this.router.navigate([this.returnUrl]);
                        } else if (persona.user.hasRole('Administrador')) {
                            this.router.navigate(['/admin/supervisor']);
                        } else {
                            this.router.navigate(['']);
                        }
                    }
                },
                error => {
                    console.log('error', error);
                    this.error = error;
                    this.hasError = true;
                    this.submitted = false;
                    this.loading = false;
                });
        }
    }

    onKey() {
        this.onSubmit();
    }

    isFieldInvalid(field: string) {
        return (
            (!this.loginForm.get(field).valid && this.loginForm.get(field).touched) ||
            (this.loginForm.get(field).untouched && this.loading)
        );
    }

}
