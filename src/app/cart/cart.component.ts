import { Component, OnInit } from '@angular/core';
import { Cart, Payment } from '../models/models';
import { NavigationService } from '../services/navigation.service';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  usersCart: Cart = {
    id: 0,
    user: this.utilityService.getUser(),
    cartItems: [],
    ordered: false,
    orderedOn: '',
    
  };

  usersPaymentInfo: Payment = {
    id: 0,
    user: this.utilityService.getUser(),
    paymentMethod: {
      id: 0,
      type: '',
      provider: '',
      available: false,
      reason: '',
    },
    totalAmount: 0,
    shipingCharges: 0, // Set shipping charges to 0
    amountReduced: 0,
    amountPaid: 0,
    createdAt: '',
  };

  usersPreviousCarts: Cart[] = [];

  constructor(
    public utilityService: UtilityService,
    private navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    // Get Cart
    this.navigationService
      .getActiveCartOfUser(this.utilityService.getUser().id)
      .subscribe((res: any) => {
        this.usersCart = res;

        // Calculate Payment
        this.utilityService.calculatePayment(
          this.usersCart,
          this.usersPaymentInfo
        );
      });

    // Get Previous Carts
    this.navigationService
      .getAllPreviousCarts(this.utilityService.getUser().id)
      .subscribe((res: any) => {
        this.usersPreviousCarts = res;
      });
  }
  removeItemFromCart(productId: number) {
    this.navigationService.removeFromCart(this.utilityService.getUser().id, productId)
      .subscribe((res: any) => {
        // Refresh cart after removing item
        this.refreshCart();
      });
  }

  refreshCart() {
    this.navigationService.getActiveCartOfUser(this.utilityService.getUser().id).subscribe((res: any) => {
      this.usersCart = res;
  
      // Recalculate Payment
      this.utilityService.calculatePayment(this.usersCart, this.usersPaymentInfo);
  
      // Update cart items count in header
      this.utilityService.changeCart.next(this.usersCart.cartItems.length); // Update with the number of remaining cart items
    });
  }
}
