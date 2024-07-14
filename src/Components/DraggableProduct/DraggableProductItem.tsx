import { motion } from "framer-motion";
import ProductPicker from "./ProductPicker";
import { useMeasurePosition } from "../../customHooks/useMeasurePosition";
import { useEffect, useState } from "react";

interface IDraggableProductItem{
    obj: any,
    updateOrder: any,
    updatePosition: any,
    ind: any,
    isVariant: any,
    selectedProduct: any,
    setSelectedProduct: any,
    selectedProductList: any,
    allSelectedProductList? : any,
    setSelectedProductList: any,
    handleCallbackProduct: any,
    handleCallbackProductList: any
    hideVariants: boolean,
    allHideVariant? : any,
    setHideVariants: any,
    handleCallbackVariants: any
    handleCallBackReorderStates: any
    handleCallBackDeleteStates: any
    handleCallBackDeleteVariantStates: any
    isCrossNecessary: any
    parentIndex? :any
}


export default function DraggableProductItem({ obj, updateOrder, updatePosition, ind, isVariant, selectedProduct,  selectedProductList, allSelectedProductList, setSelectedProduct, setSelectedProductList, handleCallbackProduct, handleCallbackProductList, hideVariants, allHideVariant, setHideVariants, handleCallbackVariants, handleCallBackReorderStates, handleCallBackDeleteStates, handleCallBackDeleteVariantStates, isCrossNecessary, parentIndex}: IDraggableProductItem) {
    const [isdragged, setIsDragged] = useState(false);
    const [marginTop, setMarginTop] = useState(0);
    const itemRef = useMeasurePosition((pos: any) => updatePosition(ind, pos));
    const previousSelectedProductList = ind > 0 ? allSelectedProductList[ind - 1] : undefined
    const previousHideVariant = ind > 0 ? allHideVariant[ind - 1] : undefined
    
    useEffect(()=>{
        let len = 0
        if (previousSelectedProductList &&  previousSelectedProductList[0] && previousSelectedProductList[0].children && previousSelectedProductList[0].children.length){
            for(let j = 0; j < previousSelectedProductList[0].children.length; j++)
               if(previousSelectedProductList[0].children[j].checked) 
                    len += 3
        }
        if(previousSelectedProductList) setMarginTop(len)
        if(previousHideVariant) setMarginTop(0)
    }, [previousHideVariant,
        selectedProductList, 
        hideVariants, 
        isdragged])

    useEffect(()=>{
        if(isdragged) {
          for(let i = 0; i < allHideVariant.length; i++) handleCallbackVariants(true, i)
          setMarginTop(0)
        }
    },[isdragged])

    return (
        <motion.div
        style={{
          zIndex: isdragged ? 2 : 1,
          height: isVariant ? '8vh' : '15vh',
          position: 'relative',
          marginTop: `${marginTop}em`,
          pointerEvents: isdragged ? 'none' : 'auto',
        }}
        
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={1} 
        layout
        ref={itemRef}
        onDragStart={() => setIsDragged(true)}
        onDragEnd={() => setIsDragged(false)}
        animate={{
          scale: isdragged ? 1.2 : 1
        }}
        onViewportBoxUpdate={(_, delta) => {
            isdragged && updateOrder(ind, delta.y.translate)
        }}
        drag="y"
      >
        <ProductPicker
          id={ind}
          parentIndex={parentIndex}
          obj={obj}
          isVariant={isVariant}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          selectedProductList={selectedProductList}
          setSelectedProductList={setSelectedProductList}
          handleCallbackProduct={handleCallbackProduct}
          handleCallbackProductList={handleCallbackProductList}
          hideVariants={hideVariants}
          setHideVariants={setHideVariants}
          handleCallbackVariants={handleCallbackVariants}
          handleCallBackReorderStates={handleCallBackReorderStates}
          handleCallBackDeleteStates={handleCallBackDeleteStates}
          handleCallBackDeleteVariantStates={handleCallBackDeleteVariantStates}
          isCrossNecessary={isCrossNecessary}
        />
      </motion.div>
    );
}