export interface MsField <T> {
    name: string;
    value?: T;
    type?: string; // num,string,date,
    isTemplate?: boolean;// = this.value ? false : true ;  
}