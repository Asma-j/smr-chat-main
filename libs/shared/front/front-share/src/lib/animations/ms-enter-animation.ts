import { animate, style, transition, trigger } from '@angular/animations';
export const MsEnterAnimations = [
  trigger('msEnterAnim', [
    transition(':enter', [
      style({ height: '0px' }),
      animate('100ms', style({ height: '*' })),
    ],),
    transition(':leave', [
      animate('100ms', style({ height: '0px' }))
    ])
  ],)
];

