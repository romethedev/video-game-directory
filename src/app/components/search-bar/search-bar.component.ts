import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  //to pass in the input field from our form, we receive our form as an argument and we're using this router to navigate to a search page
  onSubmit(form: NgForm) {
    this.router.navigate(['search', form.value.search]); //we're extracting the value and the search from the form
  }

}
