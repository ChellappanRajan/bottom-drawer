import { Overlay,OverlayConfig } from '@angular/cdk/overlay';
import { Directive, ElementRef, Renderer2 , NgZone, OnInit} from '@angular/core';
import { fromEvent, merge,Subject } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';

@Directive({
  selector: '[appDragby]'
})
export class DragbyDirective implements OnInit {
  element: HTMLElement;
  topOffset$ = new Subject();
  constructor(elementRef:ElementRef,private render: Renderer2,private zone:NgZone) {
    this.element = elementRef.nativeElement;
    this.zone.runOutsideAngular(()=>{
      fromEvent<MouseEvent>(this.element,'mousedown').pipe(
        // tap(console.log),
        switchMap(()=>fromEvent<MouseEvent>(document,'mousemove').pipe(
          // tap(console.log),
          takeUntil(fromEvent(this.element,'mouseup'))))
          // takeUntil(this.topOffset$)
      )
      .subscribe(event=>{
        event.preventDefault();
       // if(event.pageY <= 0){
          console.info('clientHeight',this.element.clientHeight,event.pageY === 90,event.pageY);
          // if(event.pageY < 90){
            // this.topOffset$.next(true);
            // this.render.setStyle(this.element,'transform',`translateY(0px)`)
          // }else{

            this.render.setStyle(this.element,'transform',`translateY(${event.pageY}px)`);
          // }
        //}
        // requestAnimationFrame(()=>{
        //   console.log('requestFrame')
        // });

      });

    })


       // this.ovelay.create();
    // fromEvent<MouseEvent>(document,'mouseup').subscribe(console.log);
    this.zone.runOutsideAngular(()=>{
      fromEvent<TouchEvent>(this.element,'touchstart').pipe(
        // tap(console.log),
        tap(event=>{
          event.preventDefault();
          this.render.setStyle(this.element,'opacity',1);
        }),
        switchMap(()=>fromEvent<TouchEvent>(document,'touchmove').pipe(
          tap(event=>{;
            // console.info('clientHeight',this.element.clientHeight,event.changedTouches[0].pageY)
          }),
          takeUntil(fromEvent(this.element,'touchend').pipe(tap(
            event=>{
              this.render.setStyle(this.element,'transition','all 200ms ease-out 0s');
              if(event.changedTouches[0].pageY > 0){
                // window.requestAnimationFrame(()=>{
                  // this.render.setStyle(this.element,'transition','none');
                  // this.render.setStyle(this.element,'transform',`translateY(${event.changedTouches[0].pageY}px)`);
                  console.log('requestanimation');
                  this.element.style.transition = '';
                // });
                // this.render.setStyle(this.element,'transition','all 200ms ease-out 0s');
              }else{
                this.render.setStyle(this.element,'transition','none');
                this.render.setStyle(this.element,'transform',`translateY(0px)`);
              }
            }
          )))))
      )
      .subscribe(event=>{
        // event.preventDefault();
        // this.render.setStyle(this.element,'transform',`translateY(${event.changedTouches[0].pageY}px)`);
        // if(event.changedTouches[0].pageY <= 0){
          // console.info('clientHeight',this.element.clientHeight,event.pageY)
          if(event.changedTouches[0].pageY > 0){
            // this.render.setStyle(this.element,'transition','none');
            window.requestAnimationFrame(()=>{
              this.render.setStyle(this.element,'transform',`translateY(${event.changedTouches[0].pageY}px)`);
            })
          }else{
            this.render.setStyle(this.element,'transform',`translateY(0px)`);
          }
        // }
        // requestAnimationFrame(()=>{
        //   console.log('requestFrame')
        // });

      })

   });
  }

  ngOnInit(){
    requestAnimationFrame(()=>{
      console.log('animation');
    })
    this.element.addEventListener('transitionend',()=>{
      console.log('transionend');
      // this.render.setStyle(this.element,'transition','none none none none');
    });
  }

}
