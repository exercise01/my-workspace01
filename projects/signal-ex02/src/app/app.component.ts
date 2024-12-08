import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  //imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'signal-ex02';

  values =signal<number[]>([0]);

  append(){

    this.values.update(values => ([
      ...values,
      values[values.length - 1] + 1
    ]))
    // const values = this.values();
    // const last = values[values.length - 1];
    // values.push(last + 1); 
  }

}
