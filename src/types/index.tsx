export type StatusType = {
  $type: string;
  affectedRoutes: Array<any>;
  affectedStops: Array<any>;
  disruption: Array<any>;
  category: string;
  categoryDescription: string;
  closureText: string;
  created: string;
  description: string;
}

export type ServiceData = {
  $type: string;
  id: string;
  name: string;
  modeName: string;
  disruptions: Array<unknown>;
  created: string;
  modified: string;
  lineStatuses: Array<unknown>;
  routeSections: Array<unknown>;
  serviceTypes: Array<unknown>;
  crowding: object;
}

export type BikePoints = {
  id: string;
  commonName: string;
  lat: string;
  lon: string;
}
