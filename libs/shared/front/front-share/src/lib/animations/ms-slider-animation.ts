import { trigger, transition, query, style, animate, group } from '@angular/animations';
const MS_SLIDER_DURATION= '30s ease-out';
const left = [
  query(':enter, :leave', style({ height:'100%',  width: '100%' }), { optional: true }),
  group([
    query(':enter', [style({ transform: 'translateX(-100%)' }), animate(MS_SLIDER_DURATION, style({ transform: 'translateX(0%)' }))], {
      optional: true,
    }),
    query(':leave', [style({ transform: 'translateX(0%)' }), animate(MS_SLIDER_DURATION, style({ transform: 'translateX(100%)' }))], {
      optional: true,
    }),
  ]),
];

const right = [
  query(':enter, :leave', style({  height:'100%', width: '100%' }), { optional: true }),
  group([
    query(':enter', [style({ transform: 'translateX(100%)' }), animate(MS_SLIDER_DURATION, style({ transform: 'translateX(0%)' }))], {
      optional: true,
    }),
    query(':leave', [style({ transform: 'translateX(0%)' }), animate(MS_SLIDER_DURATION, style({ transform: 'translateX(-100%)' }))], {
      optional: true,
    }),
  ]),
];

export const MsSliderAnimations = [
  trigger('msSliderAnim', [
    transition(':increment', right),
    transition(':decrement', left),
  ])
];
