import { Injectable } from '@angular/core';
import {Observable, from, of} from 'rxjs';
import {BehaviorSubject} from 'rxjs/index';


export let geolocationSubject$: BehaviorSubject<Position> = new BehaviorSubject<Position>(null);

@Injectable()
export class GeolocationService {
    public geolocationSubject$ = new BehaviorSubject<Position>(null);
    constructor() { }

    fetchGeolocation() {

        navigator.geolocation.getCurrentPosition(this.successCallback, function(positionError: PositionError) {
        });
    }


    public successCallback(position: Position) {
        console.log({latitud: position.coords.latitude, longitud: position.coords.longitude});

        geolocationSubject$.next(position);
    }
}
