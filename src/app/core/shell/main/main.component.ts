import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { routerTransition } from './../../../shared/router.animations';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [routerTransition]
})

export class MainComponent implements OnInit {

  @HostBinding('@routerTransition')

  public get childRouteTransition() { return this.activatedRoute.snapshot;}

  constructor(public activatedRoute: ActivatedRoute) { }

  ngOnInit() { }

}
