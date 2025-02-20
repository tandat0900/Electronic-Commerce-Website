import {
  Component,
  ElementRef,
  OnInit,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { Category, NavigationItem } from '../models/models';
import { RegisterComponent } from '../register/register.component';
import { NavigationService } from '../services/navigation.service';
import { UtilityService } from '../services/utility.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('modalTitle') modalTitle!: ElementRef;
  @ViewChild('container', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;
  cartItems: number = 0;
  userFullName: string = '';

  navigationList: NavigationItem[] = [];
  constructor(
    private navigationService: NavigationService,
    public utilityService: UtilityService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get Category List
    this.navigationService.getCategoryList().subscribe((list: Category[]) => {
      for (let item of list) {
        let present = false;
        for (let navItem of this.navigationList) {
          if (navItem.category === item.category) {
            navItem.subcategories.push(item.subCategory);
            present = true;
          }
        }
        if (!present) {
          this.navigationList.push({
            category: item.category,
            subcategories: [item.subCategory],
          });
        }
      }
    });

    // Cart
    if (this.utilityService.isLoggedIn()) {
      this.navigationService
        .getActiveCartOfUser(this.utilityService.getUser().id)
        .subscribe((res: any) => {
          this.cartItems = res.cartItems.length;
          this.userFullName = `${this.utilityService.getUser().firstName} ${this.utilityService.getUser().lastName}`;
        });
    }

    this.utilityService.changeCart.subscribe((res: any) => {
      if (parseInt(res) === 0) this.cartItems = 0;
      else this.cartItems += parseInt(res);
  });
  

  }

  openModal(name: string) {
    this.container.clear();

    let componentType!: Type<any>;
    if (name === 'login') {
      componentType = LoginComponent;
      this.modalTitle.nativeElement.textContent = 'Nhập thông tin đăng nhập';
    }
    if (name === 'register') {
      componentType = RegisterComponent;
      this.modalTitle.nativeElement.textContent = 'Nhập thông tin đăng ký';
    }

    this.container.createComponent(componentType);
  }

  
  
}
