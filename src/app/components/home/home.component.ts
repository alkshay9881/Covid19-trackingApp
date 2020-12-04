import { GlobalDataSummary } from './../../models/global-data';
import { DataServiceService } from './../../services/data-service.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  totalConfirmed = 0;
  totalActive = 0;
  totalDeath = 0;
  totalRecovered = 0;
  globaldata: GlobalDataSummary[];

  constructor(private dataservice: DataServiceService) { }
  dynamicdate;
  ngOnInit(): void {




    this.dataservice.getGlobaldata()
      .subscribe(

        {
          next: (result) => {
            console.log(result);
            this.globaldata = result;
            result.forEach(cs => {

              if (!Number.isNaN(cs.confirmed)) {
                this.totalActive += cs.active;
                this.totalConfirmed += cs.confirmed;
                this.totalDeath += cs.death;
                this.totalRecovered += cs.recovered;
              }
            })

          }
        }

      )
  }

}
