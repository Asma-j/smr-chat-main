export interface MsCollection {
    config : MsObject;
    data: MsRow[];
}

export interface MsRow {
    id: string;
    value: FieldInput<any>[];
}

export interface MsObject {
    name: string;
    fields: MsField[];
}

export interface FieldInput<T>{
    field : MsField;
    value: T;
}

export interface MsField {
    name: string;
    fieldType: string; // num,string,date
}