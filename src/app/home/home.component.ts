import { Component, OnInit } from '@angular/core';
import {  DrawerSelectEvent } from '@progress/kendo-angular-layout';
import { drawerItems } from '../app.model';
import { AppService } from '../app.service';
import { signUp } from '../signup/signup.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private ser: AppService) {
    const array: number[] = [0,1,2,3,4,5,6,7,8,9,10];
    console.log(array.fill(5, 4, 6))
   }
  drawerExpanded = true;
  details?: signUp;
  ngOnInit(): void {
    this.ser.viewMode.subscribe((res) => {
      this.details = res.Data;
    });
  }

  selected = "";
  items = drawerItems.parents;
  itemIndex!: number;

  onSelect(ev: DrawerSelectEvent): void{
    this.selected = ev.item.text;

    const item = this.items.find((e, index) => {
      this.itemIndex = index;
      return e.text === ev.item.text;
    })

    item?.expanded ? (item.expanded = false) : (item!.expanded = true);

    if (ev.item.text === "Practice") {
      item?.expanded
        ? this.addChildren(drawerItems.practice)
        : this.removeChildren(drawerItems.practice);
    }
    if (ev.item.text === "Notifications") {
      item?.expanded
        ? this.addChildren(drawerItems.notifications)
        : this.removeChildren(drawerItems.notifications);
    }
  }

  public addChildren(children: Array<any>) {
    this.items.splice(this.itemIndex + 1, 0, ...children);
  }

  public removeChildren(children: Array<any>) {
    this.items.splice(this.itemIndex + 1, children.length);
  }

  opened = false;
  open() {
    this.opened = true;
  }
  close() {
    this.opened = false;
  }

  logout(){
    this.opened = false;
    this.ser.viewMode.next({viewMode: 'login', Data: this.details});
  }
}
