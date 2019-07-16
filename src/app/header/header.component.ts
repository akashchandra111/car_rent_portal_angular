import { Component, OnInit,EventEmitter,Output } from '@angular/core';
import { FetchJSONService } from '../fetch-json.service';
import { Login } from '../Interfaces/Login';
import { User } from '../Interfaces/User';
import { Message } from '../Interfaces/Message';
import { Router, NavigationEnd } from '@angular/router';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';

// Static url for file upload server to get images of drivingLicenseNum
const uploadURL = 'http://localhost:4201/license/upload';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    username: string;
    password: string;
    user: User;
    ifLogged: boolean = true;
    ifAlert: boolean = false;
    iftrue: boolean = true;
	fileName: string;
	isForgotActivated: boolean = false;
	isMailSent: boolean = false;
	drivingLicenseNum: string;
// @Output userobject= new EventEmitter();
    usershow: string = "";
    firstName: string;
    lastName: string;
    mobileNum: string;
    idType: string;
    verification_id: string;
    driving_id: string;
    userNameregister: string;
    email: string;
    passwordregister: string;
    message: Message;
    wallet: string;

    // @Output() public loginEvent = new EventEmitter < User > ();
	// Used for uploading file on another [file upload server]
	public uploader: FileUploader = new FileUploader({url: uploadURL, itemAlias: 'photo'});;


    constructor(private http: FetchJSONService, private router: Router) {

        if (localStorage.getItem('user') == null) {

            console.log("user not present");
            this.ifLogged = true;
            this.iftrue = true;


        }
		else if(JSON.parse(localStorage.getItem('user'))!=null && localStorage.getItem('carid')!=null){
console.log("it us riunn");
			this.iftrue = false;
			this.ifLogged=false;
this.router.navigate(['/booking/'+localStorage.getItem("carid")], {
}).then(() => {
	this.ifLogged = false;
	this.iftrue = false;

this.usershow=JSON.parse(localStorage.getItem('user')).firstName;

});
	}
		else {
			this.iftrue = false;
if(JSON.parse(localStorage.getItem('user')).userId== "0") {
	console.log("routing to admins");
                this.router.navigate(['/admin']);
            }
			else if(JSON.parse(localStorage.getItem('user'))!=null && localStorage.getItem('carid')!=null){
	console.log("it is here");
	this.iftrue = false;
	this.ifLogged=false;
	this.router.navigate(['/booking/'+localStorage.getItem("carid")], {
	}).then(() => {
		this.ifLogged = false;
		this.iftrue = false;
	this.usershow=JSON.parse(localStorage.getItem('user')).firstName;

	});
		}


			 else {

                this.iftrue = false;


                let login: Login = {
                    id: JSON.parse(localStorage.getItem('user')).userId,
                    password: JSON.parse(localStorage.getItem('user')).password
                };
                this.http.getUser(login).subscribe(
                    (data) => {
                        this.usershow = this.firstName;
                        this.user = data['body'];

                        if (this.user.userId == null) {

                            console.log("user not present");
                            this.ifLogged = true;
                            this.iftrue = true;
                        }
						else if(JSON.parse(localStorage.getItem('user'))!=null && localStorage.getItem('carid')!=null){
						console.log("on 3rd");
							this.iftrue = false;
							this.ifLogged=false;
						this.router.navigate(['/booking/'+localStorage.getItem("carid")], {
						}).then(() => {
							this.ifLogged = false;
							this.iftrue = false;

						this.usershow=JSON.parse(localStorage.getItem('user')).firstName;
						});
						}
						else {

                            console.log("user is present");
                            this.ifLogged = false;

                            this.iftrue = false;
this.usershow = JSON.parse(localStorage.getItem('user')).firstName;

                            this.router.navigate(['/dashboard'], {

                            }).then(() => {
this.usershow = JSON.parse(localStorage.getItem('user')).firstName;


                            });

                        }
                    }
                );

            }


        }

        this.router.events.subscribe((ev) => {
            if (this.user.userId == null) {

                console.log("user not present");
                this.ifLogged = true;
                this.iftrue = true;

            } else {

                console.log("user is present");
                this.ifLogged = false;
                this.iftrue = false;

            }
        });

    }


    activate() {
        if (this.user.userId == null) {

            console.log("user not present");
            this.ifLogged = true;
            this.iftrue = true;

        } else {

            console.log("user is present");
            this.ifLogged = false;
            this.iftrue = false;

        }

    }




    ngOnInit() {
		// File uploading code to accept user drivingLicenseNum image
		this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
		this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
	 		console.log('file uploaded: ', item, status, response);
			alert('File uploaded successfully');
 		};

		this.user=JSON.parse(localStorage.getItem('user'));
        this.usershow = JSON.parse(localStorage.getItem('user')).firstName;
        if (JSON.parse(localStorage.getItem('user')).firstName == null) {

            console.log("user not present");
            this.ifLogged = true;
            this.iftrue = true;
        }
		else if(JSON.parse(localStorage.getItem('user'))!=null && localStorage.getItem('carid')!=null){
		console.log("4th place");
			this.iftrue = false;
			this.ifLogged=false;
		this.router.navigate(['/booking/'+localStorage.getItem("carid")], {
		}).then(() => {

			this.ifLogged = false;
			this.iftrue = false;

		this.usershow=JSON.parse(localStorage.getItem('user')).firstName;

		});
		}
		else {

            console.log("user is present");
            this.ifLogged = false;

            this.iftrue = false;

        }

    }




    getlogin() {
        let login: Login = {
            id: this.username,
            password: this.password
        };
        this.http.getUser(login).subscribe(
            (data) => {

                this.user = data['body'];

                if (this.user.userId == null) {

                    console.log("user not present");
                    this.ifLogged = true;
                    this.iftrue = true;
                    this.ifAlert = true;
                } else {


                    console.log(this.user);
                    console.log("user is present");
                    this.ifLogged = false;

                    this.iftrue = false;
                    this.ifAlert = false;
                    localStorage.setItem('user', JSON.stringify(this.user));
					if(JSON.parse(localStorage.getItem('user')).userId == "0") {
						console.log("routing to admins");
					                window.location.href="/admin"
					            }
								else{
this.usershow=JSON.parse(localStorage.getItem('user')).firstName;
this.router.navigate(['/dashboard'], {
}).then(() => {
this.usershow=JSON.parse(localStorage.getItem('user')).firstName;

});
                    this.iftrue = false;
                    this.ifLogged = false;
}

}
			}
        );
    }


    register() {
        let ranNo = Math.floor(100000000 + Math.random() * 900000000).toString();
        let userregister: User = {
            userId: ranNo,
            firstName: this.firstName,
            lastName: this.lastName,
            mobileNum: this.mobileNum,
            govtIdType: this.idType,
            govtIdNum: this.verification_id,
            drivingLicenseNum: this.driving_id,
            userName: this.userNameregister,
            password: this.passwordregister,
            email: this.email,
            wallet: 0

        };

        this.http.register(userregister).subscribe(
            (data: Message) => {
                this.message = data;
                console.log(this.message);
                console.log("reg");
                if (this.message.status == null) {




                    console.log("user not present");
                    this.ifLogged = true;

                } else {
                    let login: Login = {
                        id: this.userNameregister,
                        password: this.passwordregister
                    };
					this.http.getUser(login).subscribe(
			            (data) => {

			                this.user = data['body'];

			                if (this.user.userId == null) {

			                    console.log("user not present");
			                    this.ifLogged = true;
			                    this.iftrue = true;
			                    this.ifAlert = true;
			                } else {


			                    console.log(this.user);
			                    console.log("user is present");
			                    this.ifLogged = false;

			                    this.iftrue = false;
			                    this.ifAlert = false;
			                    localStorage.setItem('user', JSON.stringify(this.user));
								if(JSON.parse(localStorage.getItem('user')).userId == "0") {
									console.log("routing to admins");
								                window.location.href="/admin";
								            }
											else{
			this.usershow=JSON.parse(localStorage.getItem('user')).firstName;
			window.location.href="/dashboard";
			                    this.iftrue = false;
			                    this.ifLogged = false;
			}

			}
						}
			        );

}
});

}

    logout() {
        console.log("logout running");


        console.log(this.message);
        console.log("logout");
        this.iftrue = true;
        console.log(this.iftrue);
        this.ifLogged = true;
        localStorage.removeItem('user');
        localStorage.clear();
        window.location.href= "/";


    }
	booking(){
		this.router.navigate(['/choose_car'], {
			queryParams: {}
		}).then(() => {
this.usershow=JSON.parse(localStorage.getItem('user')).firstName;

		});
	}

	history(){
		this.router.navigate(['/history'], {
			queryParams: {}
		}).then(() => {
this.usershow=JSON.parse(localStorage.getItem('user')).firstName;

		});
	}
	walletroute(){
		this.router.navigate(['/wallet'], {
			queryParams: {}
		}).then(() => {
this.usershow=JSON.parse(localStorage.getItem('user')).firstName;

		});
	}

	profile(){
		this.router.navigate(['/user_profile'], {
			queryParams: {}
		}).then(() => {
this.usershow=JSON.parse(localStorage.getItem('user')).firstName;

		});
	}

	openForgotBox()	{
		console.log("Forgot Box: " + this.isForgotActivated);
		if(this.isForgotActivated)	this.isForgotActivated = false;
		else	this.isForgotActivated = true;
	}

	sendForgotMail()	{
		this.http.recoverAccount(this.drivingLicenseNum).subscribe(
			(data)=>	{
				this.message = data['body'];
				console.log("sendForgotMail():");
				console.log(this.message);
				if(this.message.status == "success")	{
					
				}
				else	{

				}
			}
		);
	}

	titleclick(){
		console.log("titleclick");
		localStorage.removeItem('carid');
		if(JSON.parse(localStorage.getItem('user')).userId== "0") {
		window.location.href="/admin";
		}else{


		this.router.navigate(['/dashboard']);
}
	}
}
