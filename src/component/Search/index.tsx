
import React, { useCallback, useState } from 'react';
import { fetchSearchResult } from '../../reducer/search';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash/debounce';
import styled from 'styled-components';
import { RootState } from '../../interface'

const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    border: 1px solid #999;
    background: #000;
    color: #fff;
    padding: 5px;
    margin-top: 10px;
`;

const BodyContainer = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    border: 1px solid #555;
    padding: 3px;
`;

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const bikePoints = useSelector((state: RootState) => state.search.bikePoints)
  const loading = useSelector((state: RootState) => state.search.loading)
  const error = useSelector((state: RootState) => state.search.error)

  const handleSearch = useCallback(
    debounce(value => {
      dispatch(fetchSearchResult(value) as any)
    }, 300),
    [searchTerm]
  )

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error! {error}</div>
  }

  return (
    <div >
      <input
        value={searchTerm}
        onChange={e => {
          const { value } = e.target
          setSearchTerm(value)
          handleSearch(value)

        }}
        type="text"
        placeholder="Search"
      />

      {searchTerm !== "" &&
        <>
          <HeaderContainer>
            <strong>ID</strong>
            <strong>CommonName</strong>
            <strong>Coordinates</strong>
          </HeaderContainer>
          {bikePoints.length > 0 ? bikePoints.map((item?: any, index?: any) =>
            <BodyContainer key={index}>
              <span>{item.id}</span>
              <span>{item.commonName}</span>
              <span>{(item.lat, item.lon)}</span>
            </BodyContainer>)
            :

            <div>No bike points found for {searchTerm}</div>}
        </>
      }


    </div>
  )

};

export default Search;
