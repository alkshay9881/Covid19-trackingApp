import { GlobalDataSummary } from './../models/global-data';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { text } from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private globalDataUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/';
  private extention = '.csv';
  month;
  date;
  year;

  getdate(date: number) {
    if (date < 10) {
      return '0' + date;
    }
    return date;
  }

  constructor(private http: HttpClient) {
    let now = new Date();
    this.month = now.getMonth() + 1;
    this.date = now.getDate() - 1;
    this.year = now.getFullYear();

    console.log(
      {
        date: this.date,
        month: this.month,
        year: this.year
      }

    );
    this.globalDataUrl = `${this.globalDataUrl}${this.getdate(this.month)}-${this.getdate(this.date)}-${this.year}${this.extention}`
  }



  getGlobaldata() {
    return this.http.get(this.globalDataUrl, { responseType: 'text' }).pipe(

      map(result => {
        let data: GlobalDataSummary[] = [];
        let rows = result.split('\n');
        let raw = {};
        rows.splice(0, 1);
        // console.log(rows);
        rows.forEach(row => {
          let cols = row.split(/,(?=\S)/);

          let cs = {
            country: cols[3],
            confirmed: +cols[7],
            death: +cols[8],
            recovered: +cols[9],
            active: +cols[10]
          };
          let temp: GlobalDataSummary = raw[cs.country];
          if (temp) {
            temp.active = cs.active + temp.active;
            temp.confirmed = cs.confirmed + temp.confirmed;
            temp.death = cs.death + temp.death;
            temp.recovered = cs.recovered + temp.recovered;
            raw[cs.country] = temp;
          }
          else {
            raw[cs.country] = cs;
          }

        })
        console.log(raw);
        return <GlobalDataSummary[]>Object.values(raw);

      })
    )
  }



}
