import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../services/user/user.service";
import { SignupUserRequest } from "../../interfaces/user/signup-user-request";
import { AuthRequest } from "../../interfaces/user/auth/auth-request";
import { CookieService } from "ngx-cookie-service";
import { MessageService } from "primeng/api";
import { Router } from "@angular/router";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy{
  private destroy$ = new Subject<void>()
  public loginCard: boolean = true
  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  })

  public signupForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

  constructor(private formBuilder: FormBuilder, private userService: UserService, private cookieService: CookieService,
              private messageService: MessageService, private router: Router) {
  }

  onSubimitLogin() {
    if (this.loginForm.value && this.loginForm.valid) {
      this.userService.authUser(this.loginForm.value as AuthRequest)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
        next: resp => {
          if (resp) {
            this.cookieService.set('USER_INFO', resp?.token)
            this.loginForm.reset()
            this.router.navigate(['/dashboard'])
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: `Login realizado com sucesso, bem vindo!`,
              life: 2000,
            })
          }
        },
        error: err => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: `Erro ao realizar o login`,
            life: 2000,
          })
          console.log('err', err)
        }
      })
    }
  }

  onSubmitSignupForm() {
    if (this.signupForm.valid && this.signupForm.value) {
      this.userService.signupUser(this.signupForm.value as SignupUserRequest)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
        next: (resp) => {
          if (resp) {
            this.signupForm.reset()
            this.loginCard = true
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: `Usuário cadastrado com sucesso`,
              life: 2000,
            })
          }
        },
        error: err => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: `Erro criar usuário!`,
            life: 2000,
          })
          console.log('err', err)
        }
      })
    }
  }

  resetForms() {
    this.signupForm.reset();
    this.loginCard = true;
  }

  resetFormsLogin() {
    this.loginForm.reset();
    this.loginCard = false;
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
