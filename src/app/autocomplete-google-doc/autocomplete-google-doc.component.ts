import {
  Component,
  OnInit,
  ViewChild,
  NgZone,
  ElementRef,
} from '@angular/core';
import { MapsAPILoader, AgmMap } from '@agm/core';
declare var google: any;

interface Location {
  lat: number;
  lng: number;
}

@Component({
  selector: 'app-autocomplete-google-doc',
  templateUrl: './autocomplete-google-doc.component.html',
  styleUrls: ['./autocomplete-google-doc.component.css'],
})
export class AutocompleteGoogleDocComponent implements OnInit {
  public rideTime: any;
  public rideDistance: any;
  showCarType: boolean = false;
  showDirections: boolean = false;
  service: any;
  travelMode: any;
  defaultBounds: any;
  public location: Location = {
    lat: 36.8503643,
    lng: 10.1491687,
  };
  originPlaceId: any;
  destinationPlaceId: any;

  @ViewChild(AgmMap, { static: true }) map: AgmMap;

  @ViewChild('originInput') public inputElementRef: ElementRef;

  @ViewChild('destinationInput') public destinationElementRef: ElementRef;

  constructor(public mapsApiLoader: MapsAPILoader, public ngZone: NgZone) {}

  ngOnInit() {
    this.mapsApiLoader.load().then(() => {
      this.travelMode = google.maps.TravelMode.DRIVING;
      this.service = new google.maps.DistanceMatrixService();
      const defaultBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(36.679607, 9.924002),
        new google.maps.LatLng(36.974768, 10.493471)
      );
      const options = {
        bounds: defaultBounds,
        types: ['establishment'],
        strictBounds: true,
      };
      const originAutocomplete = new google.maps.places.Autocomplete(
        this.inputElementRef.nativeElement,
        options
      );
      const me = this;
      originAutocomplete.setFields(['geometry']);
      originAutocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = originAutocomplete.getPlace();
          if (!place.geometry) {
            window.alert('Please select an option from the dropdown list.');
            return;
          }
          me.originPlaceId = place.geometry.location;
          if (this.originPlaceId && this.destinationPlaceId) {
            this.showDirections = true;
          }
        });
      });

      const destinationAutocomplete = new google.maps.places.Autocomplete(
        this.destinationElementRef.nativeElement,
        options
      );
      destinationAutocomplete.setFields(['geometry']);
      destinationAutocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = destinationAutocomplete.getPlace();
          if (!place.geometry) {
            window.alert('Please select an option from the dropdown list.');
            return;
          }
          this.destinationPlaceId = place.geometry.location;
          if (this.originPlaceId && this.destinationPlaceId) {
            this.showDirections = true;
          }
        });
      });
    });
  }
  travalDetail() {
    const me = this;
    var origin = new google.maps.LatLng(
      this.originPlaceId.lat(),
      this.originPlaceId.lng()
    );
    var destination = new google.maps.LatLng(
      this.destinationPlaceId.lat(),
      this.destinationPlaceId.lng()
    );
    this.service.getDistanceMatrix(
      {
        origins: [origin],
        destinations: [destination],
        travelMode: this.travelMode,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false,
      },
      (response, status) => {
        if (status !== 'OK') {
          alert('Error was: ' + status);
        } else {
          me.rideTime = response.rows[0].elements[0].duration;
          me.rideDistance = response.rows[0].elements[0].distance;
          me.showCarType = true;
        }
      }
    );
  }
}
