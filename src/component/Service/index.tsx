import React from "react";
import { IService } from "./Service";
import { ServiceData } from "../../types";

const Service: React.FC<IService.IProps> = ({ service, setValue }) => {
  const { name, serviceTypes, lineStatuses } = service;
  const serviceTypesFiltered = serviceTypes.filter(
    (t: ServiceData) => t.name === "Night"
  );
  const disruptions = lineStatuses.filter((t: any) => t.statusSeverity !== 10);
  return (
    <div onClick={() => setValue(disruptions)}>
      <span data-testid="service-name">{name}</span>
      <span data-testid="service-type">
        {serviceTypesFiltered.length > 0 && " - evening  "}
      </span>
      <span data-testid="service-disruptions">
        {disruptions.length > 0 && " - disruptions  "}
      </span>
    </div>
  );
};

export default Service;
