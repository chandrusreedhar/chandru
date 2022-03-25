import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { NotificationService } from '@progress/kendo-angular-notification';
import { IEmployee, Product, shownumber } from '../app.model';
import { AppService } from '../app.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  @Input() selectedItem!: string;
  @ViewChild('favCheckbox') favCheckbox!: boolean;

  text = '';
  possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

  number = 5;
  lstshowNum: shownumber[] = [];
  mlshowNum: shownumber = new shownumber();
  showBtn = false;
  table = false;

  lstFavNum: shownumber[] = [];
  favNum: shownumber = new shownumber();
  unChecked!: shownumber[];
  unCheckNum!: any;
  newData: IEmployee[] = [];
  constructor(private _employeeService: AppService, private _cd: ChangeDetectorRef, private notificationService: NotificationService) {
   }

  ngOnInit() {
    if(this.selectedItem === 'Favourites'){
      this.favCheckbox = true;
    };
    this.employees = this._employeeService.getEmployees();

    this._employeeService.getDetails().subscribe((res) => {
      this.newData = res
    })
  }

  makeid() {
    for (var i = 4; i < 5; i++)
      this.text += this.possible.charAt(Math.floor(Math.random() * this.possible.length));
    return this.text;
  }
  show(){
    // console.log(this.makeid());
    this.table = true;
    const rndInt = Math.floor(Math.random() * this.number) + 1;
    switch(rndInt){
      case(1):
        this.mlshowNum.showNum = rndInt;
        this.mlshowNum.showValue = 'ONE';
        break;
      case(2):
      this.mlshowNum.showNum = rndInt;
      this.mlshowNum.showValue = 'TWO';
        break;
      case(3):
      this.mlshowNum.showNum = rndInt;
      this.mlshowNum.showValue = 'THREE';
        break;
      case(4):
        this.mlshowNum.showNum = rndInt;
        this.mlshowNum.showValue = 'FOUR';
        break;
      case(5):
        this.mlshowNum.showNum = rndInt;
        this.mlshowNum.showValue = 'FIVE';
        break;
      default:
        alert("Oops...! You clicked invalid Number");
        return;
    }
    if(this.mlshowNum.showNum <= 5)
    this.mlshowNum.checkbox = false;
    this.lstshowNum.push(this.mlshowNum)
    this.mlshowNum = new shownumber();
  }

  addToFav(lstshowNum: shownumber[], index: number, event: any){
    this.favNum.showValue = lstshowNum[index].showValue;
    this.favNum.showNum = lstshowNum[index].showNum;

    if(event.target.checked){
      this.favNum.checkbox = true;
      this.lstFavNum.push(this.favNum);
      this.favNum = new shownumber();
      this.notificationService.show({
        content: "Added to favourites",
        animation: { type: 'fade', duration: 500},
        type: { style: "success", icon: true },
        hideAfter: 1000
      });
    }
  }

  unCheck(lstshowNum: shownumber[], lstFavNum :shownumber[], event: any){
    if(!event.target.checked){
      this.unChecked = lstshowNum.filter(e => e.checkbox === false);
      this.unCheckNum = lstFavNum.findIndex(e=> e.showNum === this.unChecked[0].showNum);
      lstFavNum.splice(this.unCheckNum, 1);
      this.notificationService.show({
        content: "Removed from favourites",
        animation: { type: 'fade', duration: 500},
        type: { style: "info", icon: true },
        hideAfter: 1000
      });
    }
  }

  remove(){
    if(this.lstshowNum[this.lstshowNum.length - 1].checkbox.valueOf() === false){
      this.lstshowNum.splice(-1);
    }
    else{
      this.notificationService.show({
        content: "Can't undo because it added to favourites",
        animation: { type: 'fade', duration: 500},
        type: { style: "warning", icon: true },
        hideAfter: 1000
      });
    }
    if(this.lstshowNum.length < 1){
      this.table = false;
    }
  }

  removeFromFav(lstFavNum: shownumber[], index: number, event: any){
    if(!event.target.checked){
      lstFavNum[index].checkbox = false;
      this.unChecked = (lstFavNum.filter(a => a.checkbox === false));
      this.unCheckNum = this.lstshowNum.findIndex(e => e.showNum === this.unChecked[0].showNum);
      this.lstshowNum[this.unCheckNum].checkbox = false;
    }
    setTimeout(() => {
      lstFavNum.splice(index, 1);
    }, 500);
    this.notificationService.show({
      content: "Removed from favourites",
      animation: { type: 'fade', duration: 500},
      type: { style: "info", icon: true },
      hideAfter: 1000
    });
  }

  clearPage(){
    this.selectedItem = '';
  }

  // practice learning
  hasError = true;
  myColor = 'orange';

  multiStyle = {
    color: 'blue',
    fontStyle: 'italic',
    fontSize: '50px'
  }

  message = '';
  onClick(event: any){
    console.log(event);
    this.message = "Click button Works...!";
  }

  showLog(value: any){
    console.log(value)
  }

  myName = "";

  display = true;

  colors = ['Black', 'White', 'Green', 'Yellow'];

  name = "Angular";
  content = "Welcome to angular practice";
  obj = {
    firstname: 'Raj',
    lastname: 'Kumar'
  }

  date = new Date();

  // Dependency Injection
  employees: any[] = [];
  products!: Product[];
  getProducts(){
    this.products = this._employeeService.getProduct();
    console.log(this.products);
  }
}
