import {Injectable} from '@angular/core';

Injectable()
export class Constants {
    public get API_KEY(): string {
        return 'AIzaSyD-8pNLzA1MOtf0FZpiYIG6_cUOeI6w-YM';
    };
    public get PLACE_LIST_URL(): string {
        return "https://maps.googleapis.com/maps/api/place/autocomplete/json?";
    };
    public get PLACE_DETAIL_URL(): string {
        return "https://maps.googleapis.com/maps/api/place/details/json?";
    };
}