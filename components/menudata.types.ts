// menudata.types.ts

export interface Service {
    serviceName: string;
    servicePath: string;
  }
  
  export interface SubMenuItem {
    name: string;
    imageUrl: string;
    path: string;
    services?: Service[];
  }
  
  export interface MenuItem {
    id: number;
    title: string;
    path: string;
    image: string;
    newTab: boolean;
    submenu: SubMenuItem[];
  }