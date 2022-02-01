import { Pipe, PipeTransform } from '@angular/core';
/*
to boolean 
*/
@Pipe({ name: 'toBoolean' })
export class toBoolean implements PipeTransform {
    // boolean or string 
    transform(value: any): boolean {
        if (value) {
            switch (value) {
                case true:
                case "true":
                case 1:
                case "1":
                case "on":
                case "yes":
                    return true;
                default:
                    return false;
            }
        }else{
            return false;
        }
    }
}