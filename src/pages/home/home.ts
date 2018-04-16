import {
    Component,
    ViewChild,
    ElementRef
} from '@angular/core';
import {
    NavController,
    Platform
} from 'ionic-angular';
import {
    GoogleMaps,
    GoogleMap,
    LatLng,
    GoogleMapsEvent,
    GoogleMapOptions
} from '@ionic-native/google-maps';
import {
    LocationProvider
} from '../../providers/location/location';
import {
    SpinnerUtilProvider
} from '../../providers/spinner-util/spinner-util';
import {
    GooglePlacesProvider
} from '../../providers/google-places/google-places';
import {
    AutoCompleteComponent
} from 'ionic2-auto-complete';
import {
    NativeGeocoder,
    NativeGeocoderReverseResult,
    NativeGeocoderForwardResult
} from '@ionic-native/native-geocoder';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    @ViewChild('searchbar')
    searchbar: AutoCompleteComponent;

    @ViewChild('map')
    private mapElement: ElementRef;
    private map: GoogleMap;
    private location: LatLng;
    private infoWindowTitle: any;
    private mapOptions: GoogleMapOptions;
    constructor(private platform: Platform,
        private googleMaps: GoogleMaps, private locationProvider: LocationProvider, private spinnerUtil: SpinnerUtilProvider, public googlePlaces: GooglePlacesProvider, private nativeGeocoder: NativeGeocoder) {
        this.location = new LatLng(42.346903, -71.135101);
        this.mapOptions = {

            controls: {
                'compass': true,
                'myLocationButton': true,
                'myLocation': true, // (blue dot)
                'indoorPicker': true,
                'zoom': true, // android only
                'mapToolbar': true // android only
            },

            gestures: {
                scroll: true,
                tilt: true,
                zoom: true,
                rotate: true
            },

        }
    }

    ionViewDidLoad() {
        this.platform.ready().then(() => {
            this.initMarkerPosition();
        });
    }

    initMarkerPosition() {
        this.spinnerUtil.initializeLoader();
        this.locationProvider.getLocation().then((data) => {
            if (data) {
                this.location.lat = data.coords.latitude;
                this.location.lng = data.coords.longitude;
            }
            this.initMap();
            this.spinnerUtil.dismissLoader();
        }).catch((error) => {
            console.log('Error getting location', error);
            // this.initMap();
            this.spinnerUtil.dismissLoader();
        });


    }

    initMap() {

        let element = this.mapElement.nativeElement;
        this.map = this.googleMaps.create(element, this.mapOptions);

        this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
            this.locateMapCamera();

        });

        this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe(
            (data) => {
                this.location.lat = data[0].lat;
                this.location.lng = data[0].lng;
                this.infoWindowTitle = "";
                this.locateMapCamera();

            }
        );

    }

    addMarker() {

        this.map.clear().then(() => {
            this.map.addMarker({
                title: this.infoWindowTitle,
                icon: 'red',
                animation: 'DROP',
                position: {
                    lat: this.location.lat,
                    lng: this.location.lng
                }
            }).then(marker => {
                this.addMapCircle();
            });

        })

    }

    addMapCircle() {

        this.map.addCircle({
            'center': this.location,
            'radius': 500,
            'strokeColor': '#AA00FF',
            'strokeWidth': 5,
            'fillColor': '#880000'
        }).then(circle => {

            let options = {
                target: circle.getBounds(),
                zoom: 18
            };

            this.map.moveCamera(options);
        });



    }


    onAutoComplete(event: any) {
        this.spinnerUtil.initializeLoader();
        this.googlePlaces.getPlaceDetails(event['place_id']).subscribe((data) => {
            if (data) {
                this.location.lat = data['geometry'].location.lat;
                this.location.lng = data['geometry'].location.lng;

            }
            this.locateMapCamera();

            this.spinnerUtil.dismissLoader();
        });

    }


    locateMapCamera() {

        let options = {
            target: this.location,
            zoom: 8
        };

        this.map.moveCamera(options);
        this.getLocationTitle();
    }

    getLocationTitle() {

        this.nativeGeocoder.reverseGeocode(this.location.lat, this.location.lng)
            .then((result: NativeGeocoderReverseResult) => {
                let res = result[0];
                this.infoWindowTitle = "";
                this.infoWindowTitle = (res['subLocality'] + "," + res['locality'] + "," + res['administrativeArea'] + "," + res['countryName']).replace(/undefined,/g, '');
                this.searchbar.writeValue(this.infoWindowTitle);
                this.searchbar.searchbarElem.value = this.infoWindowTitle;
                this.addMarker();

            })
            .catch((error: any) => console.log(error));


        /*  
            
         this.googlePlaces.getPlaceName(this.location).subscribe((data)=>{
              if(data){
                  
                 this.infoWindowTitle = data[0].formatted_address;
                }
           
          });
            
        */
    }
}