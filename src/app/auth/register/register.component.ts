import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Person} from '../../../../projects/concordiaApi/lib/models';
import {AuthService, CryptoJsService} from '../../core/services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  person: Person = {
    firstName: '',
    secondName: '',
    lastName: '',
    secondLastName: '',
    email: '',
    identification: '',
    phoneNumber: '',
    address: '',
    isActive: true,
    user: {
      username: '',
      email: '',
      password: '',
    }
  };

  emailConfirmation = '';
  password = '';

  registerForm: FormGroup;

  constructor(private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router,
              public crypto: CryptoJsService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      emailConfirmation: ['', Validators.required, Validators.email],
      password: ['', Validators.required]
    });
  }

  onRegister() {
    if (this.registerForm.value['email'] !== this.registerForm.value['emailConfirmation']) {
      return;
    }

    this.person.firstName = this.registerForm.value['firstName'];
    this.person.lastName = this.registerForm.value['lastName'];
    this.person.email = this.registerForm.value['email'];

    this.person.user.password = this.crypto.encode(this.password);
    this.person.user.email = this.person.email;
    this.person.user.username = this.person.email;
    this.authService.register(this.person);
  }

}
