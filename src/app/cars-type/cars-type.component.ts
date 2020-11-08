import { Component, OnInit, Input } from '@angular/core';
import { priceCalculator } from '../functions';
@Component({
  selector: 'app-cars-type',
  templateUrl: './cars-type.component.html',
  styleUrls: ['./cars-type.component.scss'],
})
export class CarsTypeComponent implements OnInit {
  @Input() timeLengthInput: any;
  @Input() distanceInput: any;
  BaseCarPrice: any;
  HighEndCarPrice: any;
  PremiumCarPrice: any;

  constructor() {}
  ngOnInit() {
    var basePrice = priceCalculator({
      distance: this.distanceInput.value,
      time: this.timeLengthInput.value,
    });
    this.BaseCarPrice = basePrice;
    this.HighEndCarPrice = Math.floor(basePrice * 3);
    this.PremiumCarPrice = Math.floor(basePrice * 7);
  }
}
