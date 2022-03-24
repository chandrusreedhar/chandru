export declare type mode = {
  viewMode: 'login' | 'signup' | 'home';
  Data?: any;
}

export class Login{
  email = "admin@gmail.com";
  password!: string;
}

export class shownumber{
  showNum: number = 0;
  showValue: string = '';
  checkbox!: boolean;
}

// drawer menu
export const drawerItems = {
  parents: [
    {
      text: "Practice",
      icon: "k-i-inbox",
      expanded: false,
      selected: false,
      children: true
    },
    {
      text: "Notifications",
      icon: "k-i-bell",
      expanded: false,
      selected: false,
      children: true
    },
    {
      text: "Calendar",
      icon: "k-i-calendar",
      expanded: false,
      children: false,
      selected: false
    },
    {
      text: "Attachments",
      icon: "k-i-hyperlink-email",
      expanded: false,
      children: false,
      selected: false
    }
  ],

  practice: [
    {
      text: "MyWorks",
      icon: "k-i-information",
      children: false,
      selected: false,
      level: 1
    },
    {
      text: "Favourites",
      icon: "k-i-star-outline",
      children: false,
      selected: false,
      level: 1
    }
  ],

  notifications: [
    {
      text: "CREATE",
      icon: "k-i-question",
      selected: false,
      level: 1,
    },
    {
      text: "LIST",
      icon: "k-i-palette",
      selected: false,
      level: 1,
    }
  ]
}


export class Product{
  constructor(id: number, name: string, price: number){
    this.id = id;
    this.name = name;
    this.price = price;
  }

  id: number;
  name: string;
  price: number;
}


export interface IEmployee{
  id: number,
  name: string,
  age: number
}
