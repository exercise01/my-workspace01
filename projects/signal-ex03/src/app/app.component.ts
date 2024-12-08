import { afterNextRender, Component, computed, effect, EffectRef, inject, Injector, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-root',
  //imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'signal-ex03';
  counter = signal(0);

  injector = inject(Injector);

  effectRef : EffectRef | null = null;

  constructor(){

   this.effectRef = effect((onCleanup) =>{
    const counter = this.counter();

    const timeout = setTimeout(() => {
      console.log(
        `counter value: ${counter}`
      );
    },1000)

     // console.log(
     //           `counter value: ${this.counter()}`
     //         );
    //})

    onCleanup(() => {
      console.log(`Calling clean up`);
      clearTimeout(timeout);
    })
  })

    // effect(() => {      
    //       console.log(
    //         `counter value: ${this.counter()}`
    //       );
          // this.incremental();
     //   },
        // {
        //   allowSignalWrites: true
        // }
     // )   

    // afterNextRender(() => {
    //   effect(() => {      
    //     console.log(
    //       `counter value: ${this.counter()}`
    //     );
    //   },
    //   {
    //     injector: this.injector
    //   })        
    //})    
  }

  tenXCounter = computed(() => {
    const val = this.counter();

    return val * 10 ;
  })

  incremental(){
    this.counter.update(value => value + 1);
  }

  cleanup(){
    this.effectRef?.destroy();
  }

}
