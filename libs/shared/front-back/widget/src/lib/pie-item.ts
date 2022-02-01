import { Color } from '@angular-material-components/color-picker';

export interface MsPieItem {
    label: string;
    value: number;
    total?: number;
    color? : Color;
}



