import { Component } from '@angular/core';
import { Coordinates } from 'src/app/interfaces/coordinates';
import { LocationService } from '../services/location.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  constructor(private locationService: LocationService) {}
  cityName: string = '';
  city: Coordinates[] = [];
  markers: any[] = [];
  loader: boolean = false;
  hint: boolean = false;

  onSubmit(){
    if(this.cityName!=''){
      this.loader = true;
      this.locationService.getCoordinates(this.cityName).subscribe(data => {
        this.city = data;
      navigator.geolocation.getCurrentPosition(() => {
        this.center = {
          lat: this.city[0].latitude,
          lng: this.city[0].longitude,
        };
      });
      this.markers.push({
        position: {
          lat: this.city[0].latitude,
          lng: this.city[0].longitude,
        },
        title: 'Marker title ' + (this.markers.length + 1),
        info: 'Marker info ' + (this.markers.length + 1),
        options: {
          animation: google.maps.Animation.DROP,
        },
      })
      this.loader = false;
    })
  }else{
    this.hint = true;
  }
}
  zoom = 12;
  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    maxZoom: 20,
    minZoom: 8,
  };
}
