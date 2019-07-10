import { Component, OnInit,EventEmitter,Output } from '@angular/core';
import { FetchJSONService } from '../fetch-json.service';
import { Login } from '../Interfaces/Login';
import { User } from '../Interfaces/User';
import { Message } from '../Interfaces/Message';
import { Router,NavigationEnd } from '@angular/router';


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

// @Output userobject= new EventEmitter();
    usershow: string = "";
    firstName: string;
    lastName: string;
    mobileNo: string;
    idType: string;
    verification_id: string;
    drivingLicenseNum: string;
    userName: string;
    email: string;
    passwordregister: string;
    message: Message;
    wallet: string;

    // @Output() public loginEvent = new EventEmitter < User > ();


    constructor(private http: FetchJSONService, private router: Router) {

        if (localStorage.getItem('user') == null) {

            console.log("user not present");
            this.ifLogged = true;
            this.iftrue = true;


        } else {
			this.iftrue = false;
            if (JSON.parse(localStorage.getItem('user')).userId == 0) {
                this.router.navigate(['/admin'], {
                    queryParams: {}
                }).then(() => {


                });
            } else {

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
                        } else {

                            console.log("user is present");
                            this.ifLogged = false;
                            
                            this.iftrue = false;


                            this.router.navigate(['/dashboard'], {
                                queryParams: {}
                            }).then(() => {



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
		this.user=JSON.parse(localStorage.getItem('user'));
        this.usershow = JSON.parse(localStorage.getItem('user')).firstName;
        if (JSON.parse(localStorage.getItem('user')).firstName == null) {

            console.log("user not present");
            this.ifLogged = true;
            this.iftrue = true;
        } else {

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
this.usershow=JSON.parse(localStorage.getItem('user')).firstName;
                    window.location = "/dashboard";

                    this.iftrue = false;
                    this.ifLogged = false;

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
            mobileNo: this.mobileNo,
            govtIdType: this.idType,
            govtIdNum: this.verification_id,
            drivingLicenseNum: this.drivingLicenseNum,
            userName: this.userName,
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
                        id: this.userName,
                        password: this.passwordregister
                    };

                    this.http.getUser(login).subscribe(
                        (data) => {
                            this.user = data['body'];
                            console.log(this.user);
                            if (this.user.userId == null) {
                                console.log(this.user);
                                console.log("user not present");
                                this.ifLogged = true;
                            } else {
                                console.log(this.user);
                                console.log("user is present");
                                this.ifLogged = false;
                                localStorage.setItem('user', this.user.userName);

                            }
                        }
                    );
                    console.log("user is present");
                    this.ifLogged = false;

                }

            }
        );
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
        window.location = "/";


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
}
