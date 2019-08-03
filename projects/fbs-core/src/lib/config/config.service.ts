// angular imports
import { HttpClient } from '@angular/common/http';

// 3rdparty imports
import {BehaviorSubject, Observable, from, of, EMPTY} from 'rxjs';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/of';
import {catchError} from 'rxjs/operators';

// app imports
import { ConfigModel } from './app-config.model';

export class ConfigService<T extends ConfigModel>  {

    protected loaded = false;
    public config: T;
    temp: any;
    protected configSubject: BehaviorSubject<T> = new BehaviorSubject<T>(null);
    public config$: Observable<T> = this.configSubject.asObservable() ;

    public getConfig(): T {
        return (this.configSubject.value as T);
    }
    constructor(private http: HttpClient,
                protected configPathFile: string) {}

    public load(): Promise<any> {

        if (this.loaded) {
            // return of(this, this.config).toPromise();
            return Observable.of(this, this.config).toPromise();
        } else {
            // path is relative to that for app's index.html
            const configurationObservable: Observable<T> = this.http.get<T>(this.configPathFile);
            configurationObservable.pipe(catchError(error => {
                console.log('error loading configuration:', error);
                // return EMPTY;
                return Observable.empty();
            })).subscribe(response => {
                    this.config = response as T;
                    this.temp = response;
                    console.log('Loaded configuration:', this.config);
                    this.configSubject.next(this.config);
                    this.loaded = true;
                }
            );
            return configurationObservable.toPromise();
        }
    }

    public configApp(): T {
        return this.configSubject.value as T;
    }
}
