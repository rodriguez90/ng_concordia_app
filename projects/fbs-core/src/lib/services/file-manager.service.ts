import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class FileManagerService {

    url: string;
    endpoint: string;

    constructor(protected http: HttpClient) {}

    public uploadFile(file: any): Observable<any> {
        const formData = new FormData();
        formData.append('file', file, file.name);

        console.log('formData', formData.getAll('file'));

        return this.http.post<any>(
            `${this.url}/${this.endpoint}`,
            formData,
        );
    }

    public uploadFiles(files: FileList): Observable<any>{
        const formData = new FormData();
        Array.from(files).forEach(f => formData.append('file', f));

        return this.http.post(`${this.url}/${this.endpoint}`, formData);
    }

    public downloadFile(url: string):Observable<any>{
        return this.http.get(
            url,
            {responseType: 'blob'}
        );
    }

    private generarReporte(data: any, endPoint: string): Observable<any> {
        return this.http.post(
            `${this.url}/${this.endpoint}/${endPoint}`,
            data,
            {responseType: 'blob'}
        );
    }

    public uploadImage(file: File): Observable<any>{
        const formData = new FormData();
        formData.append('file', file, file.name);
        return this.http.post<any>(
            `${this.url}/${this.endpoint}/logo`,
            formData,
        );
    }
}
