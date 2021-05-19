import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
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
    

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('q', query)
      .set('limit', '10');

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`,{params: params})
    .subscribe( (resp ) => {
      this.resultado = resp.data;
      localStorage.setItem('resultado', JSON.stringify(this.resultado));
    });
  }


}
