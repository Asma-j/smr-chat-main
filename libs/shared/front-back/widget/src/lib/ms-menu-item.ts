export interface MsMenuItem{
    name : string,
    link?: string;
    matIcon?: string;
    disabled?: boolean;
    children?: MsMenuItem[];
}
