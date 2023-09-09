import { Component, OnInit } from '@angular/core';
import { SuggestedProduct } from '../models/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  suggestedProducts: SuggestedProduct[] = [
    {
      banerimage: 'Baner/1.png',
      category: {
        id: 0,
        category: 'Thiết bị điện tử',
        subCategory: 'di động',
      },
    },
    {
      banerimage: 'Baner/3.png',
      category: {
        id: 1,
        category: 'Thiết bị điện tử',
        subCategory: 'laptop',
      },
    },
    {
      banerimage: 'Baner/2.png',
      category: {
        id: 1,
        category: 'đồ đạc',
        subCategory: 'ghế',
      },
    },
    {
      banerimage: 'Baner/4.png',
      category: {
        id: 1,
        category: 'đồ đạc',
        subCategory: 'bàn',
      },
    },
    {
      banerimage: 'Baner/6.png',
      category: {
        id: 1,
        category: 'Thiết bị điện tử',
        subCategory: 'chuột',
      },
    },
    {
      banerimage: 'Baner/5.png',
      category: {
        id: 1,
        category: 'Thiết bị điện tử',
        subCategory: 'Bàn Phím',
      },
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
