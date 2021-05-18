import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey: string = 'rv6orMlxRf77QhhTA4wRF3tCwEgx5u6E'
  private _historial: string[] = [];

  //TO DO, cambgiar any por su tipo
  public resultado: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor( private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultado = JSON.parse(localStorage.getItem('resultado')!) || [];
}

  buscarGifs(query: string= '') {
    query = query.trim().toLowerCase();
    if( !this._historial.includes(query) ){
      this._historial.unshift(query);
    }
    this._historial = this._historial.splice(0,10);
    localStorage.setItem('historial', JSON.stringify(this._historial));
    localStorage.setItem('resultado', JSON.stringify(this.resultado));
    console.log(this._historial);

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=rv6orMlxRf77QhhTA4wRF3tCwEgx5u6E&q=${query}&limit=10`)
    .subscribe( (resp ) => {
      console.log(resp.data);
      this.resultado = resp.data;
    });
  }


}
