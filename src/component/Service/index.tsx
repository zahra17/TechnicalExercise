
import React from 'react';
import { IService } from './Service';

const Service: React.FC<IService.IProps> = ({ service, setValue }) => {
  const { name, serviceTypes, lineStatuses } = service;
  const filteredValue = serviceTypes.filter((t?: any) => t.name === 'Night');
  const disruptions = lineStatuses.filter((t?: any) => t.statusSeverity !== 10)


  return (
    <div
      onClick={() => setValue(disruptions)}
    >
      {name}
      {filteredValue.length > 0 && " - evening  "}
      {disruptions.length > 0 && " - disruptions  "}
    </div>
  );
};

export default Service;
