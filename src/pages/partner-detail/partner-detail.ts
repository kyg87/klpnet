import { Component } from '@angular/core';
import { NavController, NavParams,ToastController } from 'ionic-angular';
import { PARAMETERS } from '@angular/core/src/util/decorators';
import { Http, Headers, RequestOptions } from '@angular/http';
/**
 * Generated class for the PartnerDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-partner-detail',
  templateUrl: 'partner-detail.html',
})
export class PartnerDetailPage {
  _requestoptions: RequestOptions;
  item;
  constructor(public toastCtrl : ToastController,public navCtrl: NavController, public navParams: NavParams,
    public http: Http) {
    this.item = navParams.data.item;
    
    for(var i = 0; i < this.item.value.length;i++){
      this.item.value[i].readonly = true;
    }
    console.log(this.item)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PartnerDetailPage');
  }

  edit(idx,i)
  {
    console.log(i);
    
    if(i.readonly){
      console.log('수정 버튼 클릭')
      i.readonly = !i.readonly;
    }
    else{
      console.log('저장 버튼 클릭')
      this.editPart(idx,i);
      i.readonly = !i.readonly;
    }
  }

  editPart(idx,i){
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');

    this._requestoptions = new RequestOptions({

      headers: headers

    });

    var data ={
      _id : this.item._id,
      part: i,
      index: idx
    }

    return this.http.put('http://125.129.60.150:3000/klpnet/partner/'+this.item._id,data,this._requestoptions).map(res => res.json()).subscribe(
      data => this.onCompleteEditPart(data),
      error=>{
        alert("등록에러 : " + JSON.stringify(error))
      })
  }

  onCompleteEditPart(data){
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
