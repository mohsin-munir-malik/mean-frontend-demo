import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { BackendService } from "../services/backend.service";
import { ActivatedRoute, Router } from "@angular/router";
import { User } from "../User";

@Component({
  selector: "app-edit-component",
  templateUrl: "./edit-component.component.html",
  styleUrls: ["./edit-component.component.css"]
})
export class EditComponentComponent implements OnInit {
  public firstname: string;
  public lastname: string;
  public email: string;
  public user: User;
  public submitted: boolean = false;
  public loading = false;
  public emailError;
  private editForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private backend: BackendService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      firstname: ["", [Validators.required, Validators.minLength(5)]],
      lastname: ["", [Validators.required, Validators.minLength(5)]],
      email: ["", [Validators.required, Validators.email]]
    });

    let id = this.route.snapshot.params.id;
    this.backend.getUser(id).subscribe(m => {
      this.user = m;
      this.editForm.controls.firstname.setValue(this.user.firstName);
      this.editForm.controls.lastname.setValue(this.user.lastName);
      this.editForm.controls.email.setValue(this.user.email);
    });
  }
  public get f() {
    return this.editForm.controls;
  }
  public onSubmit(): void {
    this.submitted = true;
    if (this.editForm.invalid) {
      return;
    } else {
      this.loading = true;
      this.firstname = this.f.firstname.value;
      this.lastname = this.f.lastname.value;
      this.email = this.f.email.value;
      let id = this.route.snapshot.params.id;
      this.backend
        .editUser(id, this.firstname, this.lastname, this.email)
        .subscribe(
          m => {
            this.router.navigateByUrl("/list");
          },
          error => {
            this.loading = false;
            this.emailError = error.error.email;
          }
        );
    }
  }
}
