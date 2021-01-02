import { Pipe, PipeTransform } from '@angular/core';
import { dashboardService } from '../services/dashboard/dashboard.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { map, catchError } from 'rxjs/operators';



@Pipe({ name: 'imagePipe' })
export class ImagePipe implements PipeTransform {
	constructor(private dashboardService: dashboardService) { }

	public transform(value: string, parametes: any): Observable<string> {
		return this.dashboardService.getUserImage({ url: value, h: parametes.h, w: parametes.w }).pipe(
			map(response => {
				return response
			})
		);
	}
}

