// angular imports
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, from, Observable, of} from 'rxjs';

// liberias de tercero
import {fromPromise} from 'rxjs/internal-compatibility';
import { map } from 'rxjs/operators';
import * as msRest from '@azure/ms-rest-js';
import {Person, PersonCreateResponse} from '../../../../projects/concordiaApi/lib/models';

// app imports
import {JwtService} from '../../../../projects/fbs-core/src/lib/services';
import {AppConfig, AppConfigService} from '../../config';
import {Persona} from '../../shared/models';
import {Api, GenericOptionalParams} from './api';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private resourceUrl = '';
    private personaActualSubject: BehaviorSubject<Persona>;
    public personaActual: Observable<Persona>;
    public loggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
    public loggedIn$: Observable<boolean> = this.loggedInSubject.asObservable();
    private authLogin = '';
    private authPasswordRestore = '';

    constructor(
        private http: HttpClient,
        private jwtService: JwtService,
        private configService: AppConfigService,
        private concordiaApi: Api
    ) {
        this.configService.config$.subscribe((config) => {
            if (config) {
                this.resourceUrl = `${config.apiBaseUrl}${config.apiVersionName}`;
                this.authLogin = config.urlEndPoints.authLogin;
                this.authPasswordRestore = config.urlEndPoints.authPasswordRestore;
            }
        });
        this.personaActualSubject = new BehaviorSubject<Persona>(JSON.parse(localStorage.getItem('personaActual')));
        this.personaActualSubject = new BehaviorSubject<Persona>(null);
        this.personaActual = this.personaActualSubject.asObservable();
    }

    public setPersonaActual(persona: Persona) {
        this.personaActualSubject.next(persona);
    }

    public get personaActualValor(): Persona {
        return this.personaActualSubject.value;
    }

    login(username: string, password: string): Observable<Persona> {
        // const loginUsuarioCommand: AutenticarUsuarioCommand = {
        //     usuario: username,
        //     contrasenna: password,
        // };
        //
        // const parametros: GenericOptionalParams<AutenticarUsuarioCommand> = {
        //     modelo: loginUsuarioCommand
        // };

        return of(null);

        // return fromPromise(this.concordiaApi.concordiaApi.usuario.autenticarUsuario(parametros))
        //     .pipe(map((respuesta: ConcordiaApiModels.UsuarioAutenticarUsuarioResponse) => {
        //
        //         const modeloAutenticacion: ModeloAutenticacion = JSON.parse(respuesta._response.bodyAsText) as ModeloAutenticacion;
        //         const persona: Persona = this.personaAdapter.adaptFromApiConsola(modeloAutenticacion);
        //
        //         return persona;
        //     }));
    }

    register(person: Person): Observable<Person> {

        return fromPromise(this.concordiaApi.concordiaApi.person.create(person))
            .pipe(map((response: PersonCreateResponse) => {
                console.log('response', response);
                console.log('response parsedBody', response._response.parsedBody);

                const personResult = JSON.parse(response._response.bodyAsText) as Person;
                return personResult;
            }));

    }

    logout(): Observable<Persona> {
        const corresponsal = this.personaActualSubject.value;
        localStorage.removeItem('personaActual');
        this.setPersonaActual(null);
        this.loggedInSubject.next(false);
        this.jwtService.destroyToken();

        return of(corresponsal);
    }

    passwordRestore(userEmail: string, appUrl: string): Observable<any> {
        return this.http.post(
            `${this.resourceUrl}/${this.authPasswordRestore}`,
            { correo: userEmail, url: appUrl });
    }

    hasToken(): boolean {
        return !!this.jwtService.getToken();
    }
}
