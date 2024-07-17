import { Grid, Stack } from "@mui/material"
import AddProduct from "./AddProduct"
import DraggableProduct from "../Components/DraggableProduct/DraggableProduct"
import { useEffect, useState } from "react"
import useDynamicProductListState from "../customHooks/useDynamicProductListState"
import useDynamicProductState from "../customHooks/useDynamicProductState"
import useDynamicHideVariantState from "../customHooks/useDynamicHideVariantState"

const ProductTable = () => {
    const [selectedProductList, addSelectedProductListState, setSelectedProductListStateAt, deleteSelectedProductListState, reorderSelectedProductListState] = useDynamicProductListState()
    const [selectedProduct, addSelectedProductState, setSelectedProductStateAt, deleteSelectedProductState, reorderSelectedProductState] = useDynamicProductState()
    const [hideVariants, addHideVariantState, setHideVariantStateAt, deleteHideVariantState, reorderHideVariantState] = useDynamicHideVariantState()
    const [isCrossNecessary, setIsCrossNecessary] = useState<boolean>(false)   
    const [colLen, setColLen] = useState<number>(0);

    const handleCallbackProduct = (selectedProduct: any, index: any) => {
        setSelectedProductStateAt(index, selectedProduct)
    }

    const handleCallbackProductList = (selectedProductList: any, index: any) => {
        setSelectedProductListStateAt(index, selectedProductList)
    }

    const handleCallbackVariants = (hidevar: any, index: any) => {
        setHideVariantStateAt(index, hidevar)
    }

    const handleCallBackElements = () => {
        addHideVariantState()
        addSelectedProductListState()
        addSelectedProductState()

        for(let i = 0; i < hideVariants.length; i++) handleCallbackVariants(true, i)
    }

    const handleCallBackReorderStates = async (index1: any, index2: any) =>{
        reorderHideVariantState(index1, index2)
        reorderSelectedProductListState(index1, index2)
        reorderSelectedProductState(index1, index2)
    }

    const handleCallBackDeleteStates = (index: any) => {
        deleteHideVariantState(index)
        deleteSelectedProductListState(index)
        deleteSelectedProductState(index)
    }

    const handleCallBackDeleteVariantStates = (parentIndex: any, childIndex: any)=>{
        const selectedLis = [...selectedProductList]
        const newChild = [...selectedLis[parentIndex][0].children]
        newChild.splice(childIndex, 1)
        selectedLis[parentIndex] = [{
            ...selectedLis[parentIndex][0],
            children: newChild,
        }]
        handleCallbackProductList(selectedLis[parentIndex], parentIndex)
    }

    useEffect(() => {
        if(hideVariants[hideVariants.length - 1]) setColLen(0)
        else setColLen(selectedProductList[selectedProductList.length - 1][0].children.filter((child: any) => child.checked === true).length * 3)
    }, [selectedProductList, hideVariants])

    useEffect(()=>{
        if(selectedProduct.length > 1) return setIsCrossNecessary(true)
        else setIsCrossNecessary(false)
    }, [selectedProduct])

    return (
        <div>
            <Grid container xs={12}>
                <Grid item xs={4.5} sx={{ padding: 2, color: '#000000E5', fontFamily: 'SF Pro Text', fontWeight: 500 }}>
                    Product
                </Grid>
                <Grid item xs={5.1} sx={{ padding: 2, color: '#000000E5', fontFamily: 'SF Pro Text', fontWeight: 500 }}>
                    Discount
                </Grid>
            </Grid>
            <Stack>
                <div key={selectedProductList.length}>
                    <DraggableProduct List={selectedProductList} isVariant={false} selectedProductList={selectedProductList} setSelectedProductList={setSelectedProductListStateAt} selectedProduct={selectedProduct} setSelectedProduct={setSelectedProductStateAt} handleCallbackProduct={handleCallbackProduct} handleCallbackProductList={handleCallbackProductList} hideVariants={hideVariants} setHideVariants={setHideVariantStateAt} handleCallbackVariants={handleCallbackVariants} handleCallBackReorderStates={handleCallBackReorderStates} handleCallBackDeleteStates={handleCallBackDeleteStates} handleCallBackDeleteVariantStates={handleCallBackDeleteVariantStates} isCrossNecessary={isCrossNecessary}/>
                </div>
                <Grid container xs={10} style={{ marginTop: `${colLen - (selectedProduct.filter((p: any)=>p === 'Select Product').length ? 1.5 : 0.5)}em` }}>
                    <AddProduct handleCallBackElements={handleCallBackElements} selectedProduct={selectedProduct} />
                </Grid>
            </Stack>
        </div>
    )
}

export default ProductTable