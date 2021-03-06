import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { filterByItemType } from "../redux/actions";
import { getFilteredProductsByItemType } from "../utils/dbManagement";

function Toggle() {
  const Box = styled.div`
    display: flex;
    position: absolute;
    top: 90px;
  `;
  const Inactive = styled.div`
    width: 60px;
    height: 30px;
    transition: background-color 0.1s ease-in-out;
    place-self: center;
    background-color: #f2f0fd;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #1ea4ce;
  `;

  const Active = styled.div`
    width: 60px;
    height: 30px;
    transition: background-color 0.1s ease-in-out;
    place-self: center;
    background-color: #1ea4ce;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
  `;

  const [appState, changeState] = useState<{
    activeObject: any;
    objects: any;
    inActiveObject: any;
  }>({
    activeObject: { id: 1, key: "mug" },
    inActiveObject: {},
    objects: [
      { id: 1, key: "mug" },
      { id: 2, key: "shirt" },
    ],
  });

  const dispatch = useDispatch();
  
  useEffect(() => {
    const getFilteredProductsWrapper = async () => {
      const filteredProducts = await getFilteredProductsByItemType(
        appState.activeObject.key
      );
      dispatch(filterByItemType(filteredProducts));
    };
    getFilteredProductsWrapper();
  }, [dispatch, appState.activeObject.key]);

  const toggleActive = (index: any) => {
    changeState({ ...appState, activeObject: appState.objects[index] });
  };

  const toggleActiveStyles = (index: any, key: any) => {
    if (appState.objects[index].id === appState.activeObject.id) {
      return (
        <Active key={index} onClick={() => toggleActive(index)}>
          <span>{key}</span>
        </Active>
      );
    } else {
      return (
        <Inactive key={index} onClick={() => toggleActive(index)}>
          <span>{key}</span>
        </Inactive>
      );
    }
  };

  return (
    <Box>
      {appState.objects.map((elements: any, index: number) =>
        toggleActiveStyles(index, elements.key)
      )}
    </Box>
  );
}
export default Toggle;
