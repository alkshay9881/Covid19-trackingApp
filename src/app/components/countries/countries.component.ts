import { GlobalDataSummary } from './../../models/global-data';
import { DataServiceService } from './../../services/data-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
  totalConfirmed = 0;
  totalActive = 0;
  totalDeath = 0;
  totalRecovered = 0;
  data: GlobalDataSummary[];
  countries: string[] = [];
  constructor(private service: DataServiceService) { }

  ngOnInit() {

    this.service.getGlobaldata().subscribe(result => {
      this.data = result;
      this.data.forEach(cs => {
        this.countries.push(cs.country)

      })

    })
  }
  updateValues(country: string) {
    console.log(country);

    this.data.forEach(cs => {
      if (cs.country == country)
        this.totalActive = cs.active,
          this.totalConfirmed = cs.confirmed,
          this.totalDeath = cs.death,
          this.totalRecovered = cs.recovered;

    })


  }


}


