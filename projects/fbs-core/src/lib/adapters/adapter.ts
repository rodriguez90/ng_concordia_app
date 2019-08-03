export interface Adapter<T> {
    adaptToApi(model: T): any;
    adaptFromApi(modelApi: any): T;
    adaptAttributeToApi(attributeName: string): string;
}
