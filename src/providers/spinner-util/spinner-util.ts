import { LoadingController } from 'ionic-angular';
import { Injectable } from '@angular/core';

/*
  Generated class for the SpinnerUtilProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SpinnerUtilProvider {

  constructor(public loadingCtrl: LoadingController) {
    console.log('Hello SpinnerUtilProvider Provider');
  }
  private loading = this.loadingCtrl.create({
          content: 'Please Wait!'
    });
    initializeLoader(){
      this.loading = this.loadingCtrl.create({});
      this.loading.present();
    }
    initializeLoaderConetnt(content: string){
      this.loading = this.loadingCtrl.create({
            content: content
      });
      this.loading.present();
    }
    dismissLoader(){
      this.loading.dismiss();
    }

}
