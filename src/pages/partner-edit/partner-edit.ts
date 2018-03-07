import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
/**
 * Generated class for the PartnerEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-partner-edit',
  templateUrl: 'partner-edit.html',
})
export class PartnerEditPage {
  _requestoptions: RequestOptions;
  name : any;
  colName : any;
  colList : any;
  constructor(
    public toastCtrl : ToastController,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public http: Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PartnerEditPage');
    this.GetPartnerCol();
  }
  /** 
   * 점검 소재지 추가
  */
  GetPartnerCheck(){
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');

    this._requestoptions = new RequestOptions({

      headers: headers

    });

    return this.http.get('http://125.129.60.150:3000/klpnet/partner/'+this.name,this._requestoptions).map(res => res.json()).subscribe(
      data => this.onCompleteGetPartnerCheck(data),
      error=>{
        alert("등록에러 : " + JSON.stringify(error))
      })
  }
  onCompleteGetPartnerCheck(data){
    
    console.log(data);
    if(data == null){
      console.log('추가하자')
      this.addPartner();
    }
    else{
      this.showToast('이미 있다','bottom');
    }
  }
  /** 
   * 칼럼 추가
  */
  GetPartnerColCheck(){
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');

    this._requestoptions = new RequestOptions({

      headers: headers

    });

    return this.http.get('http://125.129.60.150:3000/klpnet/partnerCol/'+this.colName,this._requestoptions).map(res => res.json()).subscribe(
      data => this.onCompleteGetPartnerColCheck(data),
      error=>{
        alert("등록에러 : " + JSON.stringify(error))
      })
  }
  onCompleteGetPartnerColCheck(data){
    
    console.log(data);
    if(data == null){
      console.log('추가하자')
      this.addCol();
    }
    else{
      this.showToast('이미 있다','bottom');
    }
  }


  GetPartnerCol(){
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');

    this._requestoptions = new RequestOptions({

      headers: headers

    });

    return this.http.get('http://125.129.60.150:3000/klpnet/partnerCol',this._requestoptions).map(res => res.json()).subscribe(
      data => this.onCompleteGetPartnerCol(data),
      error=>{
        alert("등록에러 : " + JSON.stringify(error))
      })
  }
  onCompleteGetPartnerCol(data){
    
    this.colList = data.value
    console.log(this.colList);
    //this.partnerColUpdate();
  }


  addPartner(){
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');

    this._requestoptions = new RequestOptions({

      headers: headers

    });
    

    var temp = {
      'title':this.name
    }

    return this.http.post('http://125.129.60.150:3000/klpnet/partner',temp,this._requestoptions).map(res => res.json()).subscribe(
      data => this.onCompleteaddPartner(data),
      error=>{
        alert("등록에러 : " + JSON.stringify(error))
      })
  }
  onCompleteaddPartner(data){
    this.showToast('추가했습니다','bottom');
    console.log(data);
    this.partnerAddColUpdate(data._id);
    //this.partnerColUpdate();
  }

  addCol(){
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');

    this._requestoptions = new RequestOptions({

      headers: headers

    });

    var temp = {
      'key':this.colName,
      'value':''
    }

    return this.http.post('http://125.129.60.150:3000/klpnet/partnerCol',temp,this._requestoptions).map(res => res.json()).subscribe(
      data => this.onCompleteaddCol(data),
      error=>{
        alert("등록에러 : " + JSON.stringify(error))
      })
  }
  onCompleteaddCol(data){

    this.showToast('추가했습니다.','bottom');
    this.GetPartnerCol();
    this.partnerColUpdate();
  }

  partnerColUpdate(){
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');

    this._requestoptions = new RequestOptions({
      headers: headers
    });

    //console.log('colList' + JSON.stringify(this.colList))
    var temp =[{
      key : this.colName,
      value: ''
    }]

    return this.http.put('http://125.129.60.150:3000/klpnet/partner',temp,this._requestoptions).map(res => res.json()).subscribe(
      data => this.onCompleteapartnerColUpdate(data),
      error=>{
        alert("등록에러 : " + JSON.stringify(error))
      })
  }
  onCompleteapartnerColUpdate(data){
    console.log(data);
  }


  partnerAddColUpdate(id){
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');

    this._requestoptions = new RequestOptions({
      headers: headers
    });

    return this.http.put('http://125.129.60.150:3000/klpnet/partnerAdd/'+id,this.colList,this._requestoptions).map(res => res.json()).subscribe(
      data => this.onCompletePartnerAddColUpdate(data),
      error=>{
        alert("등록에러 : " + JSON.stringify(error))
      })
  }
  onCompletePartnerAddColUpdate(data){
    console.log(data);
  }

  

 


  showToast(message: string, position: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: position
    });

    toast.present(toast);
  }

}
