import {
  Component,
  OnInit,
  HostBinding,
  ElementRef,
  Renderer2,
  NgZone,
  ViewChild,
  AfterViewInit,
  Input,
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounce, filter, map, scan, switchMap, takeLast, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-bottom-drawer',
  templateUrl: './bottom-drawer.component.html',
  styleUrls: ['./bottom-drawer.component.scss'],
})
export class BottomDrawerComponent implements OnInit, AfterViewInit {
  style = '100px';
  border = '20px';
  count = 0;
  element: HTMLElement;
  @ViewChild('wrapper') wrapperElement: ElementRef<HTMLElement>;
  xDown = null;
  yDown = null;
  swipedUp = false;
  @Input() bottomBreakPoint = '80px';
  @Input() middleBreakPoint = '300px'

  constructor(
    elementRef: ElementRef,
    private render: Renderer2,
    private zone: NgZone
  ) {
    this.element = elementRef.nativeElement;
  }

  ngOnInit(): void {}
  ngAfterViewInit() {
  /*  this.zone.runOutsideAngular(() => {
      fromEvent<MouseEvent>(this.wrapperElement.nativeElement, 'mousedown')
        .pipe(
          switchMap(() =>
            fromEvent<MouseEvent>(document, 'mousemove').pipe(
              takeUntil(
                fromEvent(this.wrapperElement.nativeElement, 'mouseup').pipe(
                  tap(() => {})
                )
              )
            )
          )
        )
        .subscribe((event) => {
          event.preventDefault();
          this.render.setStyle(
            this.wrapperElement.nativeElement,
            'transition',
            'all 200ms ease-out 0s'
          );
          this.wrapperElement.nativeElement.style.setProperty(
            '--transform-y',
            event.pageY + 'px'
          );

          if (event.pageY < 0) {
            this.wrapperElement.nativeElement.style.setProperty(
              '--border-top-left-radius',
              'none'
            );
            this.wrapperElement.nativeElement.style.setProperty(
              '--border-top-right-radius',
              'none'
            );
          } else {
            this.wrapperElement.nativeElement.style.setProperty(
              '--border-top-left-radius',
              '20px'
            );
            this.wrapperElement.nativeElement.style.setProperty(
              '--border-top-right-radius',
              '20px'
            );
          }
        });
      this.wrapperElement.nativeElement.addEventListener(
        'transitionend',
        (e) => {
          this.wrapperElement.nativeElement.style.setProperty('transition', '');
          // this.wrapperElement.nativeElement.style.borderRadius = '';
          // this.render.setProperty(this.wrapperElement.nativeElement, 'borderRadius','');
        }
      );
    }); */

    // breaks: {
    //   middle: { enabled: true, height: 300 },
    //   bottom: { enabled: true, height: 80 }
    // },

    // screen.height

    this.zone.runOutsideAngular(() => {
      this.wrapperElement.nativeElement.addEventListener(
        'transitionend',
        (e) => {
          this.wrapperElement.nativeElement.style.setProperty('transition', '');
        }
      );
      fromEvent<TouchEvent>(this.wrapperElement.nativeElement, 'touchstart')
        .pipe(
          switchMap((touchStartEvent) =>
            fromEvent<TouchEvent>(document, 'touchmove').pipe(
              takeUntil(fromEvent<TouchEvent>(this.wrapperElement.nativeElement, 'touchend').pipe(
                map(touchEndEvent=>{
                  return touchEndEvent.changedTouches[0].pageY
                }),
                // scan((acc,touchEndYValue)=> touchStartEvent.changedTouches[0].pageY - touchEndYValue,0),
                // takeLast(1),
                tap((y)=>{
                  // console.log('ScrollEnd',y);
                  console.log({
                    touchStart:touchStartEvent.changedTouches[0].pageY,
                    touchEnd:y,
                    delta: touchStartEvent.changedTouches[0].pageY - y
                  });
                  const delta =  touchStartEvent.changedTouches[0].pageY - y;
                  if(delta < 0){
                    // delta > -150 &&
                    this.render.setStyle(
                      this.wrapperElement.nativeElement,
                      'transition',
                      'all 200ms ease-out 0s'
                    );
                     this.wrapperElement.nativeElement.style.setProperty(
                              '--transform-y',
                              '300' + 'px'
                            );
                            this.element.style.setProperty('--overflow','hidden');
                            // delta > -100 && this.wrapperElement.nativeElement.style.setProperty(
                            //   '--transform-y',
                            //   '700' + 'px'
                            // );
                  }else{
                    this.render.setStyle(
                      this.wrapperElement.nativeElement,
                      'transition',
                      'all 200ms ease-out 0s'
                    );
                    this.wrapperElement.nativeElement.style.setProperty(
                      '--transform-y',
                      0 + 'px'
                    );
                    this.element.style.setProperty('--overflow','scroll');
                    // this.wrapperElement.nativeElement.style.setProperty(
                    //   '--border-top-left-radius',
                    //   'none'
                    // );
                    // this.wrapperElement.nativeElement.style.setProperty(
                    //   '--border-top-right-radius',
                    //   'none'
                    // );
                  }
                  // y < -150 &&  this.wrapperElement.nativeElement.style.setProperty(
                  //         '--transform-y',
                  //         0 + 'px'
                  //       );
                })
                // tap((event)=>{
                //   const y = event.changedTouches[0].pageY;
                //   if(y < 300){
                //     this.wrapperElement.nativeElement.style.setProperty(
                //       '--transform-y',
                //       0 + 'px'
                //     );
                //     return;
                //   }
                // })
              ))
            )
          )
        )
        .subscribe((event) => {
          const y = event.changedTouches[0].pageY;
          if (y < 0) {
            this.wrapperElement.nativeElement.style.setProperty(
              '--border-top-left-radius',
              'none'
            );
            this.wrapperElement.nativeElement.style.setProperty(
              '--border-top-right-radius',
              'none'
            );
          }
          if (y > 0) {
            this.render.setStyle(
              this.wrapperElement.nativeElement,
              'transition',
              'all 200ms ease-out 0s'
            );
            this.wrapperElement.nativeElement.style.setProperty(
              '--transform-y',
              y + 'px'
            );
            this.wrapperElement.nativeElement.style.setProperty(
              '--border-top-left-radius',
              '20px'
            );
            this.wrapperElement.nativeElement.style.setProperty(
              '--border-top-right-radius',
              '20px'
            );
            // this.element.style.setProperty('--overflow','scroll');

          } else {
            // this.wrapperElement.nativeElement.style.setProperty(
            //   '--transform-y',
            //   0 + 'px'
            // );
          }
        });
    });
  }

  getTouches(evt) {
    return evt.touches;
  }

  handleTouchStart(evt) {
    const firstTouch = this.getTouches(evt)[0];
    this.xDown = firstTouch.clientX;
    this.yDown = firstTouch.clientY;
  }

  handleTouchMove(evt) {
    if (!this.xDown || !this.yDown) {
      return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = this.xDown - xUp;
    var yDiff = this.yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      /*most significant*/
      if (xDiff > 0) {
        /* left swipe */
      } else {
        /* right swipe */
      }
    } else {
      if (yDiff > 0) {
        /* up swipe */
        this.swipedUp = true;
        this.wrapperElement.nativeElement.style.setProperty(
          '--transform-y',
          200 + 'px'
        );
        console.log('ScrollUp');
        this.xDown = null;
        this.yDown = null;
        return;
      } else {
        /* down swipe */
      }
    }
    /* reset values */


  }
}
