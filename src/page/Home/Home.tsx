import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { fetchServiceStatus } from "../../reducer/home";
import Service from "../../component/Service";
import { IFilteredDisruption, RootState } from "../../interface";
import { StatusType, ServiceData } from "../../types";
import { Link } from "react-router-dom";

const Container = styled.div`
  background: #dddd;
  height: 100vh;
  padding: 15px;
`;

const Items = styled.div`
  display: flex;
  flex-direction: row;
`;
const MenuContainer = styled.div`
  flex: 0.5;
  > div {
    background: #000;
    color: #ddd;
    text-align: center;
    padding: 5px 0;
    margin-bottom: 6px;
    cursor: pointer;
  }
`;
const HeaderContainer = styled.div`
  flex: 0.5;
`;
const HeaderItems = styled.div`
  padding: 0 10px;
`;

const LinkContainer = styled.strong`
  > a {
    background: #00fdff;
    border: none;
    padding: 7px;
    display: block;
    text-align: center;
  }
`;

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const serviceDatas = useSelector(
    (state: RootState) => state.home.serviceDatas
  );
  const loading = useSelector((state: RootState) => state.home.loading);
  const error = useSelector((state: RootState) => state.home.error);
  const [filtered, setFilteredArray] = useState();

  const getServices = () => {
    dispatch(fetchServiceStatus() as any);
  };
  useEffect(() => getServices(), []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error! {error}</div>;
  }

  return (
    <Container>
      <Items>
        <MenuContainer>
          {serviceDatas &&
            Object.values(serviceDatas)
              .sort((a: ServiceData, b: ServiceData) =>
                a.modeName === b.modeName
                  ? a.name.localeCompare(b.name)
                  : a.modeName.localeCompare(b.modeName)
              )
              .map((service: ServiceData) => (
                <Service
                  service={service}
                  key={service.id}
                  setValue={setFilteredArray}
                />
              ))}
          <LinkContainer>
            <Link to="/Search"> Cycle Hire </Link>
          </LinkContainer>
        </MenuContainer>
        <HeaderContainer>
          {Array.isArray(filtered) ? <Header filtered={filtered} /> : ""}
        </HeaderContainer>
      </Items>
    </Container>
  );
};

export const Header: React.FC<IFilteredDisruption> = ({ filtered }) => {
  const status =
    filtered.length > 0 &&
    filtered.map((element: StatusType) => element.disruption);
  return (
    <HeaderItems>
      {status ? (
        <>
          <strong> Service currently suffering disruptions </strong>
          {status.map((item: any, index: number) => {
            return <span key={index}>{item.description}</span>;
          })}
        </>
      ) : (
        <div>No service disruptions</div>
      )}
    </HeaderItems>
  );
};

export default Home;
