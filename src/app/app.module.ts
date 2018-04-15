import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { GoogleMaps } from '@ionic-native/google-maps';
import { LocationProvider } from '../providers/location/location';
import { SpinnerUtilProvider } from '../providers/spinner-util/spinner-util';
import { AutoCompleteModule } from 'ionic2-auto-complete';
import { GooglePlacesProvider } from '../providers/google-places/google-places';
import { NativeGeocoder } from '@ionic-native/native-geocoder';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
       AutoCompleteModule,
        HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
      Geolocation,
      NativeGeocoder,
      GoogleMaps,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LocationProvider,
    SpinnerUtilProvider,
    GooglePlacesProvider
    
  ]
})
export class AppModule {}
