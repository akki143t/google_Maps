import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AutoCompleteService} from 'ionic2-auto-complete';
import {Observable} from 'rxjs/Observable';
import {Constants} from './constant';
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

    constructor(public http: HttpClient, public constant: Constants) {
    }


    getResults(keyword: string) {

        var apiUrl = this.constant.PLACE_LIST_URL + "input=" + keyword + "&types=geocode&language=en&key=" + this.constant.API_KEY;

        return this.http.get(apiUrl)
            .map(result => {
                var res: any;
                res = result;
                if (res.status == "OK") {
                    return res.predictions
                }
            });
    }

    getPlaceDetails(placeId: any) {
        var apiUrl = this.constant.PLACE_DETAIL_URL + "placeid=" + placeId + "&key=" + this.constant.API_KEY;
        return this.http.get(apiUrl)
            .map(result => {
                let body = result;
                return body["result"] || {};

            })
            .catch(this.handleError);

    }

    private handleError(error: Response | any) {
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

    getPlaceName(pos: any) {
        var apiUrl = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + pos.lat + "," + pos.lng + "+&sensor=false";
        return this.http.get(apiUrl)
            .map(result => {
                let body = result;
                return body["result"] || {};

            })
            .catch(this.handleError);
    }
}