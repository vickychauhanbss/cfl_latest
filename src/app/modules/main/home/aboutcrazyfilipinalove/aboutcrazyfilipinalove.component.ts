import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Location } from "@angular/common";
import { footerService } from '../../../../shared/services/footer/footer.service';
import { ChatService } from '../../../../shared/services/chat/chat.service';
import { Auth } from '../../../../interfaces/auth';
import { HeaderService } from '../../../../shared/services/header/header.service';
import { userService } from '../../../../shared/services/user/user.service';
import { Router } from "@angular/router";

@Component({
	selector: 'app-aboutcrazyfilipinalove',
	templateUrl: './aboutcrazyfilipinalove.component.html',
	styleUrls: ['./aboutcrazyfilipinalove.component.css']
})
export class AboutcrazyfilipinaloveComponent implements OnInit, AfterViewInit {
	url: any;
	currentLoggedInUser: any;
	noPageFound: boolean = false;
	urlLoading = true;
	@ViewChild('iframe', null) iframeRef: ElementRef;
	constructor(
		private sanitizer: DomSanitizer,
		private _location: Location,
		private _footerService: footerService,
		private chatService: ChatService,
		private header: HeaderService,
		private userService: userService,
		private _rndr: Renderer2,
		private _router : Router

	) { }

	ngOnInit() {
		this.header.showHeader.next(true);
		this._footerService.hideFooter.next(true);
		this.currentLoggedInUser = JSON.parse(localStorage.getItem("loginUser"));
		this.userService.get_user_profile_data({ 'user_id': this.currentLoggedInUser.id, 'loggedin_user': this.currentLoggedInUser.id }).subscribe((data: any) => {
			if (data.status == 'OK') {
				let currentUesr = localStorage.getItem("loginUser");
				let userData = JSON.parse(currentUesr);
				userData.plan_type = data.records.userData.plan_type
				this.header.updateUserPlan(data.records.userData.plan_type);
				localStorage.setItem("loginUser", JSON.stringify(userData));
			}
		}, error => {
		})

		//Male Links
		if (this.currentLoggedInUser.gender == '1') {
			//Category A
			if (this._location.path() == '/home/trustplus/apm') {
				this.ifUserHasTrust();
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/HKz128?time=' + new Date().getTime());
			}

			else if (this._location.path() == '/home/trustplus/price/apm') {
				this.ifUserHasTrust();
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/QH0169?time=' + new Date().getTime());
			}

			else if (this._location.path() == '/home/trustplus/checkout/apmp1') {
				this.ifUserHasTrust();
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/O9p183?email=' +
					this.currentLoggedInUser.email + '&time=' + new Date().getTime());
			}

			else if (this._location.path() == '/home/trustplus/checkout/apmp2') {
				this.ifUserHasTrust();
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/jxX185?email=' +
					this.currentLoggedInUser.email + '&time=' + new Date().getTime());
			}

			else if (this._location.path() == '/home/trustplus/checkout/apmp3') {
				this.ifUserHasTrust();
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/XoG186?email=' +
					this.currentLoggedInUser.email + '&time=' + new Date().getTime());
			}

			else if (this._location.path() == '/home/centerstage/apupsm') {
				this.hasPlanTwoActive();
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/pzu146?time=' + new Date().getTime());
			}

			else if (this._location.path() == '/home/centerstage/price/apupsm') {
				this.hasPlanTwoActive();
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/EYD177?time=' + new Date().getTime());
			}

			else if (this._location.path() == '/home/centerstage/checkout/apupsmp1') {
				this.hasPlanTwoActive();
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/pbQ187?email=' +
					this.currentLoggedInUser.email + '&time=' + new Date().getTime());
			}

			else if (this._location.path() == '/home/centerstage/checkout/apupsmp2') {
				this.hasPlanTwoActive();
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/8OT188?email=' +
					this.currentLoggedInUser.email + '&time=' + new Date().getTime());
			}

			else if (this._location.path() == '/home/centerstage/checkout/apupsmp3') {
				this.hasPlanTwoActive();
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/JXw189?email=' +
					this.currentLoggedInUser.email + '&time=' + new Date().getTime());
			}

			// Category B
			else if (this._location.path() == '/home/trustplus/bnpm') {
				this.ifUserHasTrust();
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/mhf150?time=' + new Date().getTime());
			}

			else if (this._location.path() == '/home/trustplus/price/bnpm') {
				this.ifUserHasTrust();
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/tKc171?time=' + new Date().getTime());
			}

			else if (this._location.path() == '/home/trustplus/checkout/bnpm1') {
				this.ifUserHasTrust();
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/H9U196?email=' +
					this.currentLoggedInUser.email + '&time=' + new Date().getTime());
			}

			else if (this._location.path() == '/home/trustplus/checkout/bnpm2') {
				this.ifUserHasTrust();
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/Cfn197?email=' +
					this.currentLoggedInUser.email + '&time=' + new Date().getTime());
			}

			else if (this._location.path() == '/home/trustplus/checkout/bnpm3') {
				this.ifUserHasTrust();
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/BEZ198?email=' +
					this.currentLoggedInUser.email + '&time=' + new Date().getTime());
			}

			else if (this._location.path() == '/home/trustplus/centerstage/bnpupsm') {
				this.hasPlanTwoActive();
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/oV1162?time=' + new Date().getTime());
			}

			else if (this._location.path() == '/home/trustplus/centerstage/price/bnpupsm') {
				this.hasPlanTwoActive();
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/bBS173?time=' + new Date().getTime());
			}

			else if (this._location.path() == '/home/trustplus/centerstage/checkout/bnpupsmp1') {
				this.hasPlanTwoActive();
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/kqx206?email=' +
					this.currentLoggedInUser.email + '&time=' + new Date().getTime());
			}

			else if (this._location.path() == '/home/trustplus/centerstage/checkout/bnpupsmp2') {
				this.hasPlanTwoActive();
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/P6a207?email=' +
					this.currentLoggedInUser.email + '&time=' + new Date().getTime());
			}

			else if (this._location.path() == '/home/trustplus/centerstage/checkout/bnpupsmp3') {
				this.hasPlanTwoActive();
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/h9U208?email=' +
					this.currentLoggedInUser.email + '&time=' + new Date().getTime());
			}

			//Category C
			else if (this._location.path() == '/home/centerstage/cupgm') {
				this.checkIfUserHasDirectUpgrade();
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/TIY137?time=' + new Date().getTime());
			}
			else if (this._location.path() == '/home/centerstage/price/cupgm') {
				this.checkIfUserHasDirectUpgrade();
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/oLm174?time=' + new Date().getTime());
			}
			else if (this._location.path() == '/home/centerstage/checkout/cupgmp1') {
				this.checkIfUserHasDirectUpgrade();
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/Rzp209?email=' +
					this.currentLoggedInUser.email + '&time=' + new Date().getTime());
			}
			else if (this._location.path() == '/home/centerstage/checkout/cupgmp2') {
				this.checkIfUserHasDirectUpgrade();
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/F9J210?email=' +
					this.currentLoggedInUser.email + '&time=' + new Date().getTime());
			}
			else if (this._location.path() == '/home/centerstage/checkout/cupgmp3') {
				this.checkIfUserHasDirectUpgrade();
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/eYu211?email=' +
					this.currentLoggedInUser.email + '&time=' + new Date().getTime());
			}
			//Category D
			else if (this._location.path() == '/home/successcentral/dcdsm') {
				this.ifDownSell();
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/2BA216?email=' +
					this.currentLoggedInUser.email + '&time=' + new Date().getTime());
			}
			else {
				this.noPageFound = true;
			}
		}

		//Female Links
		else if (this.currentLoggedInUser.gender == '2') {
			if (this._location.path() == '/home/trustplus/apfi') {
				this.ifUserHasTrust();
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/XH9132?time=' + new Date().getTime());
			}

			else if (this._location.path() == '/home/trustplus/price/apfi') {
				this.ifUserHasTrust();
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/Aad170?time=' + new Date().getTime());
			}

			else if (this._location.path() == '/home/trustplus/checkout/apfip1') {
				this.ifUserHasTrust();
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/P7N190?email=' +
					this.currentLoggedInUser.email + '&time=' + new Date().getTime());
			}

			else if (this._location.path() == '/home/trustplus/checkout/apfip2') {
				this.ifUserHasTrust();
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/jKY184?email=' +
					this.currentLoggedInUser.email + '&time=' + new Date().getTime());
			}

			else if (this._location.path() == '/home/trustplus/checkout/apfip3') {
				this.ifUserHasTrust();
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/LlG192?email=' +
					this.currentLoggedInUser.email + '&time=' + new Date().getTime());
			}

			else if (this._location.path() == '/home/centerstage/apupsfi') {
				this.hasPlanTwoActive();
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/fh9145?time=' + new Date().getTime());
			}

			else if (this._location.path() == '/home/centerstage/price/apupsfi') {
				this.hasPlanTwoActive();
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/Ez3147?time=' + new Date().getTime());
			}

			else if (this._location.path() == '/home/centerstage/checkout/apupsfip1') {
				this.hasPlanTwoActive();
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/7TH195?email=' +
					this.currentLoggedInUser.email + '&time=' + new Date().getTime());
			}

			else if (this._location.path() == '/home/centerstage/checkout/apupsfip2') {
				this.hasPlanTwoActive();
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/4Td193?email=' +
					this.currentLoggedInUser.email + '&time=' + new Date().getTime());
			}

			else if (this._location.path() == '/home/centerstage/checkout/apupsfip3') {
				this.hasPlanTwoActive();
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/rKU194?email=' +
					this.currentLoggedInUser.email + '&time=' + new Date().getTime());
			}

			else if (this._location.path() == '/home/trustplus/bnpfi') {
				this.ifUserHasTrust();
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/lYB149?time=' + new Date().getTime());
			}

			else if (this._location.path() == '/home/trustplus/price/bnp') {
				this.ifUserHasTrust();
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/uJy172?time=' + new Date().getTime());
			}

			else if (this._location.path() == '/home/trustplus/checkout/bnpfi1') {
				this.ifUserHasTrust();
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/pyV199?email=' +
					this.currentLoggedInUser.email + '&time=' + new Date().getTime());
			}

			else if (this._location.path() == '/home/trustplus/checkout/bnpfi2') {
				this.ifUserHasTrust();
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/dVy200?email=' +
					this.currentLoggedInUser.email + '&time=' + new Date().getTime());
			}

			else if (this._location.path() == '/home/trustplus/checkout/bnpfi3') {
				this.ifUserHasTrust();
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/kwZ201?email=' +
					this.currentLoggedInUser.email + '&time=' + new Date().getTime());
			}

			else if (this._location.path() == '/home/trustplus/centerstage/bnpupsfi') {
				this.hasPlanTwoActive();
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/Ay6161?time=' + new Date().getTime());
			}

			else if (this._location.path() == '/home/trustplus/centerstage/price/bnpupsfi') {
				this.hasPlanTwoActive();
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/Yb9175?time=' + new Date().getTime());
			}

			else if (this._location.path() == '/home/trustplus/centerstage/checkout/bnpupsfip1') {
				this.hasPlanTwoActive();
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/F2r203?email=' +
					this.currentLoggedInUser.email + '&time=' + new Date().getTime());
			}

			else if (this._location.path() == '/home/trustplus/centerstage/checkout/bnpupsfip2') {
				this.hasPlanTwoActive();
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/szl204?email=' +
					this.currentLoggedInUser.email + '&time=' + new Date().getTime());
			}

			else if (this._location.path() == '/home/trustplus/centerstage/checkout/bnpupsfip3') {
				this.hasPlanTwoActive();
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/Ka5205?email=' +
					this.currentLoggedInUser.email + '&time=' + new Date().getTime());
			}

			//Category C

			else if (this._location.path() == '/home/centerstage/cupgfi') {
				this.checkIfUserHasDirectUpgrade();
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/pfN139?time=' + new Date().getTime());
			}
			else if (this._location.path() == '/home/centerstage/price/cupgfi') {
				this.checkIfUserHasDirectUpgrade();
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/njY176?time=' + new Date().getTime());
			}
			else if (this._location.path() == '/home/centerstage/checkout/cupgfip1') {
				this.checkIfUserHasDirectUpgrade();
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/oJp212?email=' +
					this.currentLoggedInUser.email + '&time=' + new Date().getTime());
			}
			else if (this._location.path() == '/home/centerstage/checkout/cupgfip2') {
				this.checkIfUserHasDirectUpgrade();
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/Iop213?email=' +
					this.currentLoggedInUser.email + '&time=' + new Date().getTime());
			}
			else if (this._location.path() == '/home/centerstage/checkout/cupgfip3') {
				this.checkIfUserHasDirectUpgrade();
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/tNA214?email=' +
					this.currentLoggedInUser.email + '&time=' + new Date().getTime());
			}

			//Category D
			else if (this._location.path() == '/home/successcentral/dcdsfi') {
				//For Male
				this.ifDownSell();
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/Hwv215?email=' +
					this.currentLoggedInUser.email + '&time=' + new Date().getTime());
			}
			else {
				this.noPageFound = true;
			}
		}

		this.chatService.login({ 'username': this.currentLoggedInUser.email, password: '111111' }).subscribe(
			(response: Auth) => {
				localStorage.setItem('userid', response.userId);
			});
	}

	ifUserHasTrust() {
		let hasPlanOne = this.currentLoggedInUser.subscriptions.find(x=>x.backend_plan_id == '1');
		let hasPlanThree = this.currentLoggedInUser.subscriptions.find(x=>x.backend_plan_id == '3');
		if(hasPlanOne != undefined || hasPlanThree != undefined) {
			this._router.navigate(['home/dashboard']);
		}
	}

	hasPlanTwoActive() {
		let hasPlanTwo = this.currentLoggedInUser.subscriptions.find(x=>x.backend_plan_id == '1');
		if(hasPlanTwo == undefined) {
			this._router.navigate(['home/dashboard']);
		}
	}

	checkIfUserHasDirectUpgrade() {
		let hasPlanOne = this.currentLoggedInUser.subscriptions.find(x=>x.backend_plan_id == '1');
		let hasPlanTwo = this.currentLoggedInUser.subscriptions.find(x=>x.backend_plan_id == '2');
		let hasPlanThree = this.currentLoggedInUser.subscriptions.find(x=>x.backend_plan_id == '3');
		if(hasPlanOne != undefined || hasPlanTwo != undefined || hasPlanThree != undefined) {
			this._router.navigate(['home/dashboard']);
		}
	}

	ifDownSell() {
		let hasPlanFour = this.currentLoggedInUser.subscriptions.find(x=>x.backend_plan_id == '4');
		if(hasPlanFour != undefined ||this.currentLoggedInUser.subscriptions.length == 0) {
			this._router.navigate(['home/dashboard']);
		}
	}

	ngAfterViewInit() {
		let documents: any = document.body;
		documents.style = 'overflow: hidden';
		this._rndr.listen(this.iframeRef.nativeElement, 'load', (e) => { this.urlLoading = false });
	}

	ngOnDestroy() {
		let documents: any = document.body;
		documents.style = '';
	}
}
