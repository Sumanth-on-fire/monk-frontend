import { usePositionReorder } from '../../customHooks/usePositionReorder';
import DraggableProductItem from './DraggableProductItem';

interface IDraggableProduct{
    List: any,
    isVariant: any,
    selectedProduct: any,
    setSelectedProduct: any, 
    selectedProductList: any,
    setSelectedProductList: any,
    handleCallbackProduct: any,
    handleCallbackProductList: any,
    hideVariants: any,
    setHideVariants: any
    handleCallbackVariants: any
    handleCallBackReorderStates: any,
    handleCallBackDeleteStates: any,
    handleCallBackDeleteVariantStates: any,
    isCrossNecessary: any
    parentIndex ? : any
}

function DraggableProduct({List, isVariant, selectedProduct, selectedProductList, setSelectedProduct, setSelectedProductList, handleCallbackProduct, handleCallbackProductList, hideVariants, setHideVariants, handleCallbackVariants, handleCallBackReorderStates, handleCallBackDeleteStates, handleCallBackDeleteVariantStates, isCrossNecessary, parentIndex}: IDraggableProduct) {
    const [updatedList, updatePosition, updateOrder] = usePositionReorder(List, handleCallBackReorderStates, isVariant);

    return (
        isVariant ?
        <ul className="container">
            {updatedList.map((obj: any, index: any) => (
                <DraggableProductItem
                    key={JSON.stringify(obj)}
                    parentIndex={parentIndex}
                    ind={index}
                    updateOrder={updateOrder}
                    updatePosition={updatePosition}
                    obj={obj}
                    isVariant={isVariant}
                    allSelectedProductList={selectedProductList}
                    allHideVariant={hideVariants}
                    selectedProduct={selectedProduct}
                    setSelectedProduct={setSelectedProduct}
                    setSelectedProductList ={setSelectedProductList}
                    selectedProductList={selectedProductList}
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
            ))}
        </ul>
        
        :

        <ul className="container">
        {updatedList.map((obj: any, index: any) => (
                <DraggableProductItem
                key={JSON.stringify(obj)}
                parentIndex={index}
                ind={index}
                updateOrder={updateOrder}
                updatePosition={updatePosition}
                obj={obj}
                isVariant={isVariant}
                selectedProduct={selectedProduct[index]}
                setSelectedProduct={setSelectedProduct}
                setSelectedProductList ={setSelectedProductList}
                selectedProductList={selectedProductList[index]}
                allSelectedProductList={selectedProductList}
                handleCallbackProduct={handleCallbackProduct}
                handleCallbackProductList={handleCallbackProductList}
                hideVariants={hideVariants[index]}
                allHideVariant={hideVariants}
                setHideVariants={setHideVariants}
                handleCallbackVariants={handleCallbackVariants}
                handleCallBackReorderStates={handleCallBackReorderStates}
                handleCallBackDeleteStates={handleCallBackDeleteStates}
                handleCallBackDeleteVariantStates={handleCallBackDeleteVariantStates}
                isCrossNecessary={isCrossNecessary}
            />
))}
    </ul>
    );
}

export default DraggableProduct