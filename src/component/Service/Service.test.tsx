import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import  Service  from '.'

const service = {
    name : "Bakerloo",
    serviceTypes : {
        "$type": "Tfl.Api.Presentation.Entities.LineServiceTypeInfo, Tfl.Api.Presentation.Entities",
        "name": "Regular",
        "uri": "/Line/Route?ids=Bakerloo&serviceTypes=Regular"
    },
    lineStatuses:[
        {
            "$type": "Tfl.Api.Presentation.Entities.LineStatus, Tfl.Api.Presentation.Entities",
            "id": 0,
            "statusSeverity": 10,
            "statusSeverityDescription": "Good Service",
            "created": "0001-01-01T00:00:00",
            "validityPeriods": []
        }
    ]
}


test('Render Service Item', () => {
  render(<Service service={service} setValue={jest.fn(x => x)} />)


  const serviceTitle = screen.getByTestId("service-name")
  expect(serviceTitle).toBeInTheDocument()

  const serviceType= screen.getByTestId("service-type")
  expect(serviceType).toBeInTheDocument()

  const serviceDisruptions= screen.getByTestId("service-disruptions")
  expect(serviceDisruptions).toBeInTheDocument()

})
