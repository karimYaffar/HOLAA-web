import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-best-sellers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './best-sellers.component.html',
  styleUrl: './best-sellers.component.css'
})
export class BestSellersComponent {
  products = [
    {
      id: 1,
      name: 'VESTIDO MIDI AJUSTADO ESCOTE CORAZÓN CON ABERTURA',
      price: 699,
      image: 'https://studiofmex.vtexassets.com/arquivos/ids/333173-1000-1071?v=638524372011970000&width=1000&height=1071&aspect=true'
    },
    {
      id: 2,
      name: 'VESTIDO AJUSTADO CON PLISADOS HOMBROS DESCUBIERTOS',
      price: 799,
      image: 'https://studiofmex.vtexassets.com/arquivos/ids/368447-1000-1071?v=638676454988930000&width=1000&height=1071&aspect=true'
    },
    {
      id: 3,
      name: 'VESTIDO LARGO AJUSTADO DE TIRAS CON INSU',
      price: 799,
      image: 'https://studiofmex.vtexassets.com/arquivos/ids/373849-1000-1071?v=638689272880500000&width=1000&height=1071&aspect=true'
    },
    {
      id: 4,
      name: 'VESTIDO LARGO ASIMÉTRICO CUELLO HALTER',
      price: 1440,
      image: 'https://studiofmex.vtexassets.com/arquivos/ids/373657-1000-1071?v=638689271203000000&width=1000&height=1071&aspect=true'
    }
  ];
}
