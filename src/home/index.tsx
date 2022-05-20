
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { fetchServiceStatus } from '../reducer/home'
import Service from '../component/Service'
import Search from '../component/Search'
import {IFilteredDisruption} from '../interface'


const Container = styled.div`
  background: #dddd;
  height: 100vh;
  padding:15px;
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
  }
`;
const HeaderContainer = styled.div`
  flex: 0.5;
`;
const HeaderItems = styled.div`
  padding:0 10px;
`;

const Button = styled.button`
  background: #00fdff;
  border: none;
  width: 100%;
  padding: 7px;
`;

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const serviceDatas = useSelector((state: any) => state.home.serviceDatas)
  const loading = useSelector((state: any) => state.home.loading)
  const error = useSelector((state: any) => state.home.error)
  const [filtered, setFilteredArray] = useState();
  const [activeSearch, setActiveSearch] = useState(false);

  const getServices = () => {
    dispatch(fetchServiceStatus() as any);
  };
  useEffect(() => getServices(), []);

  const onActiveSearch = () => {
    setActiveSearch(true)
  }

  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error! {error}</div>
  }


  return (
    <Container>
      {!activeSearch ?
        <Items>
          <MenuContainer>            
              {
                serviceDatas && Object.values(serviceDatas).sort((a?: any, b?: any) => (a.modeName === b.modeName) ? a.name.localeCompare(b.name) : a.modeName.localeCompare(b.modeName))
                  .map((service?: any) => <Service service={service} key={service.id} setValue={setFilteredArray} />)
              }            
            <Button onClick={onActiveSearch} >
              Cycle Hire
            </Button>
          </MenuContainer>
          <HeaderContainer>
          {
            Array.isArray(filtered) ?
              <Header filtered={filtered} />
              : ""
          }
            </HeaderContainer>
        </Items>
        :
        <Search />
      }
    </Container>
  );
}


export const Header: React.FC<IFilteredDisruption> = ({ filtered }) => {
  const status = filtered.length > 0 && filtered.map((element?: any) => element.disruption)

  return (
    <HeaderItems>
      {
        status ?
          <>
            <strong>Service currently suffering disruptions </strong>
            {
              status.map((column?: any, index?: any) => <span key={index}>{column.description}</span>)
            }
          </>
          :
          <div>No service disruptions</div>
      }
    </HeaderItems>
  )
}


export default Home;
