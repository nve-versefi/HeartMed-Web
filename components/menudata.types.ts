// menudata.types.ts
export interface Service {
  serviceName: string;
  servicePath: string;
}

export interface Problem {
  name: string;
  imageUrl: string;
  services: Service[];
}

export interface SubMenuItem {
  name: string;
  path: string;
  imagePath:string;
  imageUrl: string; // Ensure this property is included if required
  problems?: Problem[];
}

export interface MenuItem {
  id: number;
  title: string;
  path: string;
  image: string;
  newTab: boolean;
  submenu: SubMenuItem[];
}