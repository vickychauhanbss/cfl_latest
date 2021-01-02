import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Location } from "@angular/common";
import { footerService } from '../../../../shared/services/footer/footer.service';
import { ChatService } from '../../../../shared/services/chat/chat.service';
import { Auth } from '../../../../interfaces/auth';
import { HeaderService } from '../../../../shared/services/header/header.service';
import { userService } from '../../../../shared/services/user/user.service';

@Component({
	selector: 'app-aboutcrazyfilipinalove',
	templateUrl: './aboutcrazyfilipinalove.component.html',
	styleUrls: ['./aboutcrazyfilipinalove.component.css']
})
export class AboutcrazyfilipinaloveComponent implements OnInit, AfterViewInit {
	url : any;
	currentLoggedInUser : any;
	constructor(
		private sanitizer: DomSanitizer,
		private _location : Location,
		private _footerService : footerService,
		private chatService: ChatService,
		private header : HeaderService,
		private userService: userService

	) { }

	ngOnInit() {
		// this.messageService.login('showHeaderSubscription');
		// this._footerService.hidefooter(true);
		this.header.showHeader.next(true);
		this._footerService.hideFooter.next(true);
		this.currentLoggedInUser = JSON.parse(localStorage.getItem("loginUser"));

		this.userService.get_user_profile_data({'user_id' :this.currentLoggedInUser.id, 'loggedin_user' :this.currentLoggedInUser.id}).subscribe((data: any) => {
			if(data.status == 'OK'){
				let currentUesr =  localStorage.getItem("loginUser");
				let userData = JSON.parse(currentUesr);
				userData.plan_type = data.records.userData.plan_type
				this.header.updateUserPlan(data.records.userData.plan_type);
				localStorage.setItem("loginUser", JSON.stringify(userData));
			}
			}, error => {
			console.log(error.status);
		})



		//About Welcome Page
		if(this._location.path() == '/home/trustplus/ap') {
			//For Male
			if(this.currentLoggedInUser.gender == 1) {
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/HKz128?time='+new Date().getTime());
			}
			if(this.currentLoggedInUser.gender == 2) {
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/XH9132?time='+new Date().getTime());
			}
		}

		//Membership page
		if(this._location.path() == '/home/trustplus/price/ap') {
			//For Male
			if(this.currentLoggedInUser.gender == 1) {
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/QH0169?time='+new Date().getTime());
			}

			if(this.currentLoggedInUser.gender == 2) {
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/Aad170?time='+new Date().getTime());
			}
		}

		if(this._location.path() == '/home/trustplus/checkout/app1') {
			//For Male
			if(this.currentLoggedInUser.gender == 1) {
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/O9p183?email='+
				this.currentLoggedInUser.email+'&time='+new Date().getTime());
			}

			if(this.currentLoggedInUser.gender == 2) {
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/P7N190?email='+
				this.currentLoggedInUser.email+'&time='+new Date().getTime());
			}
		}

		if(this._location.path() == '/home/trustplus/checkout/app2') {
			//For Male
			if(this.currentLoggedInUser.gender == 1) {
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/jxX185?email='+
				this.currentLoggedInUser.email+'&time='+new Date().getTime());
			}

			if(this.currentLoggedInUser.gender == 2) {
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/jKY184?email='+
				this.currentLoggedInUser.email+'&time='+new Date().getTime());
			}
		}

		if(this._location.path() == '/home/trustplus/checkout/app3') {
			//For Male
			if(this.currentLoggedInUser.gender == 1) {
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/XoG186?email='+
				this.currentLoggedInUser.email+'&time='+new Date().getTime());
			}

			if(this.currentLoggedInUser.gender == 2) {
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/LlG192?email='+
				this.currentLoggedInUser.email+'&time='+new Date().getTime());
			}
		}

		if(this._location.path() == '/home/centerstage/apupsm') {
			//For Male
			if(this.currentLoggedInUser.gender == 1) {
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/pzu146?time='+new Date().getTime());
			}

			if(this.currentLoggedInUser.gender == 2) {
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/fh9145?time='+new Date().getTime());
			}
		}

		if(this._location.path() == '/home/centerstage/price/apupsm') {
			//For Male
			if(this.currentLoggedInUser.gender == 1) {
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/EYD177?time='+new Date().getTime());
			}

			if(this.currentLoggedInUser.gender == 2) {
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/Ez3147?time='+new Date().getTime());
			}
		}

		if(this._location.path() == '/home/centerstage/checkout/apupsmp1') {
			//For Male
			if(this.currentLoggedInUser.gender == 1) {
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/pbQ187?email='+
				this.currentLoggedInUser.email+'&time='+new Date().getTime());
			}

			if(this.currentLoggedInUser.gender == 2) {
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/7TH195?email='+
				this.currentLoggedInUser.email+'&time='+new Date().getTime());
			}
		}

		if(this._location.path() == '/home/centerstage/checkout/apupsmp2') {
			//For Male
			if(this.currentLoggedInUser.gender == 1) {
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/8OT188?email='+
				this.currentLoggedInUser.email+'&time='+new Date().getTime());
			}

			if(this.currentLoggedInUser.gender == 2) {
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/4Td193?email='+
				this.currentLoggedInUser.email+'&time='+new Date().getTime());
			}
		}

		if(this._location.path() == '/home/centerstage/checkout/apupsmp3') {
			//For Male
			if(this.currentLoggedInUser.gender == 1) {
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/JXw189?email='+
				this.currentLoggedInUser.email+'&time='+new Date().getTime());
			}

			if(this.currentLoggedInUser.gender == 2) {
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/rKU194?email='+
				this.currentLoggedInUser.email+'&time='+new Date().getTime());
			}
		}

		if(this._location.path() == '/home/trustplus/bnp') {
			//For Male
			if(this.currentLoggedInUser.gender == 1) {
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/mhf150?time='+new Date().getTime());
			}

			if(this.currentLoggedInUser.gender == 2) {
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/lYB149?time='+new Date().getTime());
			}
		}

		if(this._location.path() == '/home/trustplus/price/bnp') {
			//For Male
			if(this.currentLoggedInUser.gender == 1) {
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/tKc171?time='+new Date().getTime());
			}

			if(this.currentLoggedInUser.gender == 2) {
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/uJy172?time='+new Date().getTime());
			}
		}

		if(this._location.path() == '/home/trustplus/checkout/bnp1') {
			//For Male
			if(this.currentLoggedInUser.gender == 1) {
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/H9U196?email='+
				this.currentLoggedInUser.email+'&time='+new Date().getTime());
			}

			if(this.currentLoggedInUser.gender == 2) {
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/pyV199?email='+
				this.currentLoggedInUser.email+'&time='+new Date().getTime());
			}
		}

		if(this._location.path() == '/home/trustplus/checkout/bnp2') {
			//For Male
			if(this.currentLoggedInUser.gender == 1) {
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/Cfn197?email='+
				this.currentLoggedInUser.email+'&time='+new Date().getTime());
			}

			if(this.currentLoggedInUser.gender == 2) {
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/dVy200?email='+
				this.currentLoggedInUser.email+'&time='+new Date().getTime());
			}
		}

		if(this._location.path() == '/home/trustplus/checkout/bnp3') {
			//For Male
			if(this.currentLoggedInUser.gender == 1) {
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/BEZ198?email='+
				this.currentLoggedInUser.email+'&time='+new Date().getTime());
			}

			if(this.currentLoggedInUser.gender == 2) {
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/kwZ201?email='+
				this.currentLoggedInUser.email+'&time='+new Date().getTime());
			}
		}

		if(this._location.path() == '/home/trustplus/centerstage/bnpups') {
			//For Male
			if(this.currentLoggedInUser.gender == 1) {
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/oV1162?time='+new Date().getTime());
			}

			if(this.currentLoggedInUser.gender == 2) {
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/Ay6161?time='+new Date().getTime());
			}
		}

		if(this._location.path() == '/home/trustplus/centerstage/price/bnpups') {
			//For Male
			if(this.currentLoggedInUser.gender == 1) {
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/bBS173?time='+new Date().getTime());
			}

			if(this.currentLoggedInUser.gender == 2) {
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/Yb9175?time='+new Date().getTime());
			}
		}

		if(this._location.path() == '/home/trustplus/centerstage/checkout/bnpupsp1') {
			//For Male
			if(this.currentLoggedInUser.gender == 1) {
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/kqx206?email='+
				this.currentLoggedInUser.email+'&time='+new Date().getTime());
			}

			if(this.currentLoggedInUser.gender == 2) {
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/F2r203?email='+
				this.currentLoggedInUser.email+'&time='+new Date().getTime());
			}
		}

		if(this._location.path() == '/home/trustplus/centerstage/checkout/bnpupsp2') {
			//For Male
			if(this.currentLoggedInUser.gender == 1) {
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/P6a207?email='+
				this.currentLoggedInUser.email+'&time='+new Date().getTime());
			}

			if(this.currentLoggedInUser.gender == 2) {
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/szl204?email='+
				this.currentLoggedInUser.email+'&time='+new Date().getTime());
			}
		}

		if(this._location.path() == '/home/trustplus/centerstage/checkout/bnpupsp3') {
			//For Male
			if(this.currentLoggedInUser.gender == 1) {
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/h9U208?email='+
				this.currentLoggedInUser.email+'&time='+new Date().getTime());
			}

			if(this.currentLoggedInUser.gender == 2) {
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/Ka5205?email='+
				this.currentLoggedInUser.email+'&time='+new Date().getTime());
			}
		}

		if(this._location.path() == '/home/centerstage/cupg') {
			//For Male
			if(this.currentLoggedInUser.gender == 1) {
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/TIY137?time='+new Date().getTime());
			}

			if(this.currentLoggedInUser.gender == 2) {
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/pfN139?time='+new Date().getTime());
			}
		}
		if(this._location.path() == '/home/centerstage/price/cupg') {
			//For Male
			if(this.currentLoggedInUser.gender == 1) {
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/oLm174?time='+new Date().getTime());
			}

			if(this.currentLoggedInUser.gender == 2) {
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/njY176?time='+new Date().getTime());
			}
		}
		if(this._location.path() == '/home/centerstage/checkout/cupgp1') {
			//For Male
			if(this.currentLoggedInUser.gender == 1) {
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/Rzp209?email='+
				this.currentLoggedInUser.email+'&time='+new Date().getTime());
			}

			if(this.currentLoggedInUser.gender == 2) {
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/oJp212?email='+
				this.currentLoggedInUser.email+'&time='+new Date().getTime());
			}
		}
		if(this._location.path() == '/home/centerstage/checkout/cupgp2') {
			//For Male
			if(this.currentLoggedInUser.gender == 1) {
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/F9J210?email='+
				this.currentLoggedInUser.email+'&time='+new Date().getTime());
			}

			if(this.currentLoggedInUser.gender == 2) {
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/Iop213?email='+
				this.currentLoggedInUser.email+'&time='+new Date().getTime());
			}
		}
		if(this._location.path() == '/home/centerstage/checkout/cupgp3') {
			//For Male
			if(this.currentLoggedInUser.gender == 1) {
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/eYu211?email='+
				this.currentLoggedInUser.email+'&time='+new Date().getTime());
			}

			if(this.currentLoggedInUser.gender == 2) {
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/tNA214?email='+
				this.currentLoggedInUser.email+'&time='+new Date().getTime());
			}
		}
		if(this._location.path() == '/home/successcentral/dcds') {
			//For Male
			if(this.currentLoggedInUser.gender == 1) {
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/2BA216?email='+
				this.currentLoggedInUser.email+'&time='+new Date().getTime());
			}

			if(this.currentLoggedInUser.gender == 2) {
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/Hwv215?email='+
				this.currentLoggedInUser.email+'&time='+new Date().getTime());
			}
		}

		this.chatService.login({'username':this.currentLoggedInUser.email, password:'111111'}).subscribe(
			(response: Auth) => {
			  console.log(response);
			  localStorage.setItem('userid', response.userId);
			},
			(error) => {
			  console.log(error);
			}
		);
	}

	ngAfterViewInit() {
		let documents : any = document.body;
		documents.style = 'overflow: hidden';
	}

	ngOnDestroy() {
		let documents : any = document.body;
		documents.style = '';
	}
}
