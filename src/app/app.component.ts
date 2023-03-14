import { Component, OnInit } from '@angular/core';
import { PeopleService } from './services/people.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'soap-example';

  constructor(private peopleService: PeopleService) {}

  ngOnInit(): void {
    this.peopleService.getUser('1');
  }
}
