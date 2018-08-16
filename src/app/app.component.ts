import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  dataTable = {
    thLabel: ['nome', 'cognome', 'supercalifragilestichespiralitoso'],
    tdData: [
      ['vittorio', 'lo preiato', 1],
      ['lucia', 'cenacchi', 3]
    ]
  };

}
