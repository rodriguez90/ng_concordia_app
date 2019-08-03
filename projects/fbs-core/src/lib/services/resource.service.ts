// angular imports
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// App imports
import {QueryOptions} from '../../../../fbs-shared';
import {Model} from '../../../../fbs-shared';
import {Adapter} from '../adapters';
import {PaginationModel} from '../../../../fbs-shared/src/lib/pagination/pagination.model';

export class ResourceService<T extends Model> {

    constructor(
        protected httpClient: HttpClient,
        protected url: string,
        protected endpoint: string,
        protected adapter: Adapter<T>) {

    }

    public create(item: T): Observable<T> {
        return this.httpClient
            .post<T>(`${this.url}/${this.endpoint}`,
                !!this.adapter ? this.adapter.adaptToApi(item) : item)
            .pipe(map(data => !!this.adapter ? this.adapter.adaptFromApi(data) as T : data as T));
    }

    public update(item: T): Observable<T> {
        return this.httpClient
            .put<T>(`${this.url}/${this.endpoint}`,
                !!this.adapter ? this.adapter.adaptToApi(item) : item)
            .pipe(map(data => !!this.adapter ? this.adapter.adaptFromApi(data) as T : data as T));
    }

    read(id: any): Observable<T> {
        return this.httpClient
            .get(`${this.url}/${this.endpoint}/${id}`)
            .pipe(map((data: any) => !!this.adapter ? this.adapter.adaptFromApi(data) as T : data as T));
    }

    list(queryOptions?: QueryOptions): Observable<T[]> {
        return this.httpClient
            .get(`${this.url}/${this.endpoint}`)
            .pipe(map((data: any) => this.convertData(data)));
    }

    listPagination(queryOptions?: QueryOptions): Observable<PaginationModel<T>> {
        return this.httpClient
            .post(`${this.url}/${this.endpoint}/lista`, queryOptions.toJson() )
            .pipe(map((response: any) => {
                return {
                    pagina: response.pagina,
                    totalElementos: response.totalElementos,
                    cantidadElementos: response.cantidadElementos,
                    datos: this.convertData(response.datos)
                } as PaginationModel<T>;
            }));
    }

    delete(id: any): Observable<any> {
        return this.httpClient
            .delete(`${this.url}/${this.endpoint}/${id}`).pipe(map(respuesta => respuesta as T));
    }

    protected convertData(data: any): T[] {
        if (data) {
            return data.map(item => !!this.adapter ? this.adapter.adaptFromApi(item) as T : item as T);
        }

        return [];
    }
}
