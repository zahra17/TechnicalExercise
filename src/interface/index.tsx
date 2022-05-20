import React from 'react'
import {StatusType} from  '../types'

export interface IFilteredDisruption {
    filtered: Array<StatusType>
  }

export  interface IServiceData {
    $type:string,
    id:string,
    name:string,
    modeName:string
    disruptions:Array<unknown>
    created:string
    modified:string
    lineStatuses:Array<unknown>
    routeSections:Array<unknown>
    serviceTypes:Array<unknown>
    crowding:object
}


  