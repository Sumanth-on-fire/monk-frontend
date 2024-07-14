import { useState, useCallback } from 'react';

const useDynamicProductListState = () => {
  const [states, setStates] = useState<any>([[]]);

  const addNewState = useCallback(() => {
    setStates((prevStates: any)=> [...prevStates, []]);
  }, []);

  const setStateAt = useCallback((index: any, value: any) => {
    setStates((prevStates: any) => {
      const newStates: any = [...prevStates];
      newStates[index] = value;
      return newStates;
    });
  }, []);

  const deleteStateAt = useCallback((index: any) => {
    setStates((prevStates: any) => prevStates.filter((_: any, i: any) => i !== index));
  }, []);

  
  const reorderStates = useCallback((index1: any, index2: any) => {
    setStates((prevStates: any) => {
      const newStates = [...prevStates];
      [newStates[index1], newStates[index2]] = [newStates[index2], newStates[index1]];
      return newStates;
    });
  }, []);




  return [states, addNewState, setStateAt, deleteStateAt, reorderStates];
};

export default useDynamicProductListState;