import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {of} from 'rxjs/internal/observable/of';

import {ResourceService} from '../services';
import {Model} from '../../../../fbs-shared/src/lib/models';

export class ModelResolver implements Resolve<Model> {

    constructor(protected service: ResourceService<Model>) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Model> {
        if (route.params['id'] !== null) {
            return this.service.read(route.params['id']);
        } else {
            return of(null);
        }
    }
}

