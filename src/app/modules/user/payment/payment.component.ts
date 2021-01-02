import { Component, OnInit } from '@angular/core';
//Import Api loader
import { NgxSpinnerService } from "src/app/shared/services/spinner.service";;
import { Router } from "@angular/router";
import { HeaderService } from '../../../shared/services/header/header.service';
import { userService } from '../../../shared/services/user/user.service';
//Import notification toast
import { ToastrManager } from 'ng6-toastr-notifications';
import { footerService } from '../../../shared/services/footer/footer.service';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

@Component({
	selector: 'app-payment',
	templateUrl: './payment.component.html',
	styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
	userId: any;
	public payPalConfig?: IPayPalConfig;
	showSuccess: any;
	cardNumber: string;
	expiryMonth: string;
	expiryYear: string;
	cvc: string;
	message: string;
	constructor(private spinner: NgxSpinnerService, private router: Router, public headerService: HeaderService, private userService: userService, private toastr: ToastrManager, private footerService: footerService) {

		let currentUesr = localStorage.getItem("loginUser");
		let userData = JSON.parse(currentUesr);
		this.userId = userData.id;
	}

	ngOnInit() {
		this.headerService.loggedIn(true);
		this.footerService.hidefooter(true);
		this.initConfig();
	}


	private initConfig(): void {
		this.payPalConfig = {
			currency: 'USD',
			clientId: 'AfJ-ZvYtpFhXG_lgrx2Z_a1UTehzwzfG_ulMnnw8oABs4mDAqIRwcOK6ETisg6PAa-aPh0YECUJNHfAX',
			createOrderOnClient: (data) => <ICreateOrderRequest>{
				intent: 'CAPTURE',
				purchase_units: [
					{
						amount: {
							currency_code: 'USD',
							value: '66',
							breakdown: {
								item_total: {
									currency_code: 'USD',
									value: '66'
								}
							}
						},
						items: [
							{
								name: 'Enterprise Subscription',
								quantity: '1',
								category: 'DIGITAL_GOODS',
								unit_amount: {
									currency_code: 'USD',
									value: '66',
								},
							}
						]
					}
				]
			},
			advanced: {
				commit: 'true'
			},
			style: {
				label: 'paypal',
				layout: 'vertical'
			},
			onApprove: (data, actions) => {
				actions.order.get().then(details => {
				});
			},
			onClientAuthorization: (data) => {

				this.showSuccess = true;
			}
		};
	}


	openCheckout() {
		var handler = (<any>window).StripeCheckout.configure({
			key: 'pk_test_oi0sKPJYLGjdvOXOM8tE8cMa',
			locale: 'auto',
			token: function (token: any) {
			}
		});

		handler.open({
			name: 'Cfl',
			amount: 2000
		});

	}


	getToken() {
		this.message = 'Loading...';

		(<any>window).Stripe.card.createToken({
			number: this.cardNumber,
			exp_month: this.expiryMonth,
			exp_year: this.expiryYear,
			cvc: this.cvc
		}, (status: number, response: any) => {
			if (status === 200) {
				this.message = `Success! Card token ${response.card.id}.`;
			} else {
				this.message = response.error.message;
			}
		});
	}
}