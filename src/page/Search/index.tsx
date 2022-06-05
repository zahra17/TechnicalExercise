import React, { useCallback, useState, useEffect } from "react";
import { fetchSearchResult } from "../../reducer/search";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import styled from "styled-components";
import { RootState, IBikePoints } from "../../interface";
import { BikePoints } from "../../types";

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
  const bikePoints = useSelector((state: RootState) => state.search.bikePoints);
  const loading = useSelector((state: RootState) => state.search.loading);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([] as IBikePoints);

  const handleSearch = useCallback(
    debounce((value: string) => {
      if (!value) return;
      const savedSearchItems = JSON.parse(
        localStorage.getItem(value) as string
      );
      if (savedSearchItems) {
        setSearchResult(savedSearchItems);
      } else {
        dispatch(fetchSearchResult(value) as any);
        setSearchResult(bikePoints as IBikePoints);
      }
    }, 300),
    [searchTerm]
  );

  useEffect(() => {
    setSearchResult(bikePoints as IBikePoints);
  }, [bikePoints]);

  return (
    <div>
      <input
        value={searchTerm}
        onChange={(e) => {
          const { value } = e.target;
          setSearchTerm(value);
          handleSearch(value);
        }}
        type="text"
        placeholder="Search"
      />

      {loading ? (
        <div>loading ... </div>
      ) : (
        searchTerm !== "" && (
          <>
            <HeaderContainer>
              <strong>ID</strong>
              <strong>CommonName</strong>
              <strong>Coordinates</strong>
            </HeaderContainer>
            {Array.isArray(searchResult) && searchResult.length > 0 ? (
              searchResult.map((item: BikePoints, index: number) => {
                return (
                  <BodyContainer key={index}>
                    <span>{item.id}</span>
                    <span>{item.commonName}</span>
                    <span>
                      <span>{item.lat}</span>,<span>{item.lon}</span>
                    </span>
                  </BodyContainer>
                );
              })
            ) : (
              <div>No bike points found for {searchTerm}</div>
            )}
          </>
        )
      )}
    </div>
  );
};

export default Search;
