import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Subscription } from 'rxjs';
import { MessageService } from '../../eventservice';
import { Router } from "@angular/router";
import { HeaderService } from '../../shared/services/header/header.service';

@Component({
	selector: 'app-content-layout',
	templateUrl: './content-layout.component.html',
	styleUrls: ['./content-layout.component.scss']
})
export class ContentLayoutComponent implements OnInit {
	private overlayContainer: OverlayContainer;
	public theme = 'my-light-theme';
	public visible: boolean = true;
	public hideFooter: boolean = false;
	message: any;
	subscription: Subscription;
	constructor(private messageService: MessageService, private router: Router, public headerService: HeaderService, private cd: ChangeDetectorRef) {
		// subscribe to home component messages
		this.messageService.change.subscribe((msg) => {
			if (msg == 'hideHeaderFooter') {
				this.visible = false;
				this.cd.detectChanges();
			} else if (msg == 'showHeaderSubscription') {
				this.visible = true;
				this.cd.detectChanges();
				this.headerService.loggedIn(true);
			} else {
				this.visible = true;
				this.cd.detectChanges();
			}
		})
	}

	ngOnInit() {
		if (this.router.url == '/home/onboarding') {
			this.visible = false;
		}

		if (this.overlayContainer) {
			this.overlayContainer.getContainerElement().classList.add(this.theme);
		}
	}
}
