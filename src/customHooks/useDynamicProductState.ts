import { useState, useCallback } from 'react';

const useDynamicProductState = () => {
  const [states, setStates] = useState<any>(['Select Product']);

  const addNewState = useCallback(() => {
    setStates((prevStates: any)=> [...prevStates, 'Select Product']);
  }, []);

  const setStateAt = useCallback((index: any, value: any) => {
    setStates((prevStates: any) => {
      const newStates: any = [...prevStates];
      newStates[index] = value;
      return newStates;
    });
  }, []);

  const reorderStates = useCallback((index1: any, index2: any) => {
    setStates((prevStates: any) => {
      const newStates = [...prevStates];
      [newStates[index1], newStates[index2]] = [newStates[index2], newStates[index1]];
      return newStates;
    });
  }, []);


  const deleteStateAt = useCallback((index: any) => {
    setStates((prevStates: any) => prevStates.filter((_: any, i: any) => i !== index));
  }, []);

  return [states, addNewState, setStateAt, deleteStateAt, reorderStates];
};

export default useDynamicProductState;