// angular imports
import {CollectionViewer, DataSource, ArrayDataSource} from '@angular/cdk/collections';

// librerias de terceros
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {catchError, finalize} from 'rxjs/operators';
import {of} from 'rxjs/internal/observable/of';

// app imports
import {PaginationModel} from './pagination.model';
import {ResourceService} from '../../../../fbs-core/src/lib/services';
import {QueryOptions} from '../utils';

export class GenericDataSource <T> implements DataSource<T> {

    private dataSubject =  new BehaviorSubject<T[]>([]);
    private loadingSubject =  new BehaviorSubject<boolean>(false);
    public loading$ =  this.loadingSubject.asObservable();
    private mTotalElementos = 0;

    private newElements: T[] = [];

    constructor(private service?: ResourceService<T>,
                public queryOptions?: QueryOptions) {}

    connect(collectionViewer: CollectionViewer): Observable<T[]> {
        return this.dataSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.dataSubject.complete();
        this.loadingSubject.complete();
    }

    fetchData(id?: number) {

        if (this.service == null) { return this.dataSubject.next([]); }

        this.loadingSubject.next(true);

        this.service.listPagination(this.queryOptions).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        ).subscribe((response: PaginationModel<T>) => {
            this.mTotalElementos = response.totalElementos;
            return this.dataSubject.next(response.datos as T[]);
        });
    }

    get data(): T[] { return this.dataSubject.value; }

    add(element: T) {
        this.newElements.push(element);
        const data = this.data;

        const index = data.findIndex(predicado, element);
        if (index > -1) {
            data[index] = element;
        } else {
            data.push(element);
        }

        this.dataSubject.next(data);
    }

    replace(element: T) {
        let data: any[] = this.data;

        const index = data.findIndex(predicado, element);
        const indexNew = this.newElements.findIndex(predicado, element);
        if (index > -1) {
            data[index] = element;
            this.dataSubject.next(data);
        }

        if (index > -1) {
            this.newElements[index] = element;
        }
    }

    removeElement(element: T) {
        let index = this.data.findIndex(predicado, element);
        this.removeElementByIndex(index);

        index = this.newElements.findIndex(predicado, element);
        if (index > -1) {
            this.newElements.splice(index, 1);
        }
    }

    removeElementByIndex(index: number) {
        if (index < 0 || index > this.data.length ) { return; }

        let data: any[] = this.data;

        data.splice(index, 1);
        this.dataSubject.next(data);
    }

    get totalElementos(): number {
        return this.mTotalElementos;
    }

    set pagina(pagina: number) {
        this.queryOptions.pagina = pagina;
    }

    get pagina(): number {
        return this.queryOptions.pagina;
    }

    set cantidadElementos(cantidadElementos: number) {
        this.queryOptions.cantidadElementos = cantidadElementos;
    }

    get cantidadElementos(): number {
        return this.queryOptions.cantidadElementos;
    }

    // set queryOptions(options: QueryOptions) {this.queryOptions = options;}
    // get queryOptions() {return this.queryOptions}
}

const predicado = function(value: any): boolean {

    if (value !== null &&
        this !== null &&
        typeof value !== 'undefined' &&
        typeof this !== 'undefined') {

        if (typeof value.id !== 'undefined' &&
            value.id !== null &&
            typeof this.id !== 'undefined' &&
            this.id !== null) {
            return value.id === this.id ;
        } else if (typeof value.falsoId !== 'undefined' &&
            value.falsoId !== null &&
            typeof this.falsoId !== 'undefined' &&
            this.falsoId !== null) {
            return value.falsoId === this.falsoId ;
        }
    }

    return false;
};



