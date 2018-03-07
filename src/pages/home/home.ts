import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { PartnerDetailPage } from '../partner-detail/partner-detail'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  _requestoptions: RequestOptions;
  items;
  items2;
  constructor(public navCtrl: NavController,
    public http: Http) {
      this.initPartnerList();
  }

  initPartnerList() {
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');


    this._requestoptions = new RequestOptions({

      headers: headers

    });

    return this.http.get('http://125.129.60.150:3000/klpnet/partner', this._requestoptions).map(res => res.json()).subscribe(
      data => this.onCompleteGetEvent(data),
      error => {
        alert("등록에러 : " + JSON.stringify(error))
      }
    )
  }

  onCompleteGetEvent(data) {
    this.items = data.value;
    this.items2 = data.value;
    console.log(data)
  }

  initializeItems() {
    this.items = [
      'Amsterdam',
      'Bogota',
      'Buenos Aires',
      'Cairo',
      'Dhaka',
      'Edinburgh',
      'Geneva',
      'Genoa',
      'Glasglow',
      'Hanoi',
      'Hong Kong',
      'Islamabad',
      'Istanbul',
      'Jakarta',
      'Kiel',
      'Kyoto',
      'Le Havre',
      'Lebanon',
      'Lhasa',
      'Lima',
      'London',
      'Los Angeles',
      'Madrid',
      'Manila',
      'New York',
      'Olympia',
      'Oslo',
      'Panama City',
      'Peking',
      'Philadelphia',
      'San Francisco',
      'Seoul',
      'Taipeh',
      'Tel Aviv',
      'Tokio',
      'Uelzen',
      'Washington'
    ];
  }
  getItems(ev) {
    // Reset items back to all of the items
    //this.initializeItems();
    this.items = this.items2;
    // set val to the value of the ev target
    var val = ev.target.value;
    console.log(val)
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        console.log(val)
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  openNavDetailsPage(item)
  {
    this.navCtrl.push(PartnerDetailPage, { item: item });
  }

}
