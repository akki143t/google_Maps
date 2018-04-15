
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Geolocation } from '@ionic-native/geolocation';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


/*
  Generated class for the LocationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LocationProvider {

  constructor(private geolocation: Geolocation) {
    console.log('Hello LocationProvider Provider');
  }

    getLocation() {
					
					return this.geolocation.getCurrentPosition()
							
 	  }

}
