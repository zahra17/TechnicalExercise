import {StatusType  , ServiceData , BikePoints} from  '../types'

export interface RootState {
  home: IServicedata,
  search:ISearch
  
}

export interface IServicedata {
  serviceDatas: Array<ServiceData>,
  loading: boolean,
  error: boolean,
  
}

export interface ISearch {
  bikePoints: Array<BikePoints>,
  loading: boolean,
  error: boolean,
  
}

export interface IFilteredDisruption {
    filtered: Array<StatusType>
  }






  