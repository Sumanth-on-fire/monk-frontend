import { useState, useRef } from "react";
import { clamp, distance } from "popmotion";
import { arrayMoveImmutable } from "array-move";

export function usePositionReorder(initialState : any, callback: any, isvar: any) {
  const [order, setOrder] = useState(initialState);
  const positions: any = useRef([]).current;
  const updatePosition: any = (i: any, offset: any) => (positions[i] = offset);
  const updateOrder = (i: any, dragOffset: any) => {
    const targetIndex = findIndex(i, dragOffset, positions);
    if(!isvar && targetIndex !== i) callback(i, targetIndex).then(()=>{setOrder(arrayMoveImmutable(order, i, targetIndex));})
    else if(isvar && targetIndex !== i) setOrder(arrayMoveImmutable(order, i, targetIndex));
  };

  return [order, updatePosition, updateOrder];
}

const buffer = 30;

export const findIndex = (i: any, yOffset: any, positions: any) => {
  let target = i;
  const { top, height } = positions[i];
  const bottom = top + height;

  if (yOffset > 0) {
    const nextItem = positions[i + 1];
    if (nextItem === undefined) return i;

    const swapOffset =
      distance(bottom, nextItem.top + nextItem.height / 2) + buffer;
    if (yOffset > swapOffset) target = i + 1;

  } else if (yOffset < 0) {
    const prevItem = positions[i - 1];
    if (prevItem === undefined) return i;

    const prevBottom = prevItem.top + prevItem.height;
    const swapOffset = distance(top, prevBottom - prevItem.height / 2) + buffer;
    if (yOffset < -swapOffset) target = i - 1;
  }

  return clamp(0, positions.length, target);
};
