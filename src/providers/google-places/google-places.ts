import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AutoCompleteService} from 'ionic2-auto-complete';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
/*
  Generated class for the GooglePlacesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GooglePlacesProvider implements AutoCompleteService {
 labelAttribute = "description";
     public  API_KEY='AIzaSyD-8pNLzA1MOtf0FZpiYIG6_cUOeI6w-YM';

constructor(public http: HttpClient) {
    console.log('Hello GooglePlacesProvider Provider');
  }
    
    
    getResults(keyword:string) {
        
     var apiUrl = "https://maps.googleapis.com/maps/api/place/autocomplete/json?input="+keyword+"&types=geocode&language=en&key="+this.API_KEY;
        
    return this.http.get(apiUrl)
      .map(result =>{
          var res : any;
          res = result;
        if(res.status == "OK"){
             return res.predictions
        }
         
           
        });
  }
    
    getPlaceDetails(placeId:any){
            var apiUrl = "https://maps.googleapis.com/maps/api/place/details/json?placeid="+placeId+"&key="+this.API_KEY;
				return this.http.get(apiUrl)
                    .map(result =>{
                         let body = result;
                            return body["result"] || { };
                        
                    })
						.catch(this.handleError);
		 
        }
    
    private handleError (error: Response | any) {
		  let errMsg: string;
		  if (error instanceof Response) {
			const err = error || '';
			errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
		  } else {
			errMsg = error.message ? error.message : error.toString();
		  }
		  console.error(errMsg);
			// this.spinnerUtil.dismissLoader();
		  return Observable.throw(errMsg);
		}

     getPlaceName(pos:any){
            var apiUrl = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+pos.lat+","+pos.lng+"+&sensor=false";
				return this.http.get(apiUrl)
                    .map(result =>{
                         let body = result;
                            return body["result"] || { };
                        
                    })
						.catch(this.handleError);
       
		 
        }
    
    
}
