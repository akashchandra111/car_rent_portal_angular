import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class LicenseUploadService {
	adminUrl: string = 'http://9.202.17.174:8081'
	//adminUrl: string = 'http://localhost:8081'

  constructor(private http: HttpClient) { }

  	pushFileToStorage(userId: string, file: File): Observable<HttpEvent<{}>> {
  		const formdata: FormData = new FormData();
  		formdata.append('file', file);
  		const req = new HttpRequest('POST', this.adminUrl + '/license_upload/' + userId, formdata, {
			reportProgress: true,
			responseType: 'text'
  			}
  		);
  		return this.http.request(req);
	}
}
