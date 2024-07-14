import { Grid, Link, Stack, TextField } from "@mui/material"
import SelectProduct from "../../Products/SelectProduct"
import AddDiscount from "../../Products/AddDiscount"
import productPicker from "../../assets/productpicker.svg"
import { useEffect, useState } from "react"
import DraggableProduct from "./DraggableProduct"
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface IProductPicker {
    id: number,
    obj: any,
    isVariant: boolean
    selectedProduct: any,
    setSelectedProduct: any,
    selectedProductList: any,
    setSelectedProductList: any,
    handleCallbackProduct: any,
    handleCallbackProductList: any,
    hideVariants: boolean
    setHideVariants: any,
    handleCallbackVariants: any,
    handleCallBackReorderStates: any,
    handleCallBackDeleteStates: any,
    handleCallBackDeleteVariantStates: any,
    isCrossNecessary: boolean
    parentIndex? : any
}

const ProductPicker = ({ id, obj, isVariant, selectedProduct, selectedProductList, setSelectedProduct, setSelectedProductList, handleCallbackProduct, handleCallbackProductList, hideVariants, setHideVariants, handleCallbackVariants, handleCallBackReorderStates, handleCallBackDeleteStates, handleCallBackDeleteVariantStates, isCrossNecessary, parentIndex}: IProductPicker) => {
   
    const [variantList, setVariantList] = useState<any>([])

    useEffect(() => {
        const focusedList = selectedProductList.filter((p: any) => selectedProduct.includes(p.name))
        let varLis: any = []
        for (let i = 0; i < focusedList.length; i++) {
            if (focusedList[i].children && focusedList[i].children.length) {
                for (let j = 0; j < focusedList[i].children.length; j++) {
                    if(focusedList[i].children[j].checked === true)
                    varLis.push(focusedList[i].children[j])
                }
            }
        }
        setVariantList(varLis)
    }, [selectedProduct, selectedProductList])

    const handleDelete = () => {
        handleCallBackDeleteStates(id)
    }


    return (
        isVariant ?
            <Stack>
                <Grid container xs={12} style={{ alignItems: 'center' }} columnGap={2}>
                    <Grid item xs={0.1} style={{ whiteSpace: 'pre', alignItems: 'center' }}>
                        <img src={productPicker} alt="" style={{ paddingTop: '1vh' }} />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField style={{ color: '#00000080', width: '15vw', justifyContent: 'left', }} sx={{ borderRadius: '16px', '& .MuiOutlinedInput-root': { borderRadius: '16px', } }} inputProps={{ style: { height: '0vh', textAlign: 'start' } }} disabled value={obj.name} />
                    </Grid>
                    <Grid item xs={4}>
                        <AddDiscount childIndex={id} isVariant={isVariant} handleDelete={handleDelete} isCrossNecessary={isCrossNecessary} parentIndex={parentIndex} handleCallBackDeleteVariantStates={handleCallBackDeleteVariantStates} selectedProductList={selectedProductList}/>
                    </Grid>
                </Grid>
            </Stack>

            :

            <Stack rowGap={1}>
                <Grid container xs={12} style={{ alignItems: 'center' }} columnGap={0.1}>
                    <Grid item xs={0.1} style={{ whiteSpace: 'pre', alignItems: 'center' }}>
                        <img src={productPicker} alt="" style={{ paddingTop: '0.8vh' }} />
                    </Grid>
                    <Grid item xs={1} sx={{color: '#000000CC', fontFamily: 'SF Pro Text, sans-serif'}}>
                        {`${id + 1}.`}
                    </Grid>
                    <Grid item xs={5}>
                        <SelectProduct id={id} obj={obj} handleCallbackProduct={handleCallbackProduct} handleCallbackProductList={handleCallbackProductList} selectedProductList={selectedProductList} setSelectedProductList={setSelectedProductList} selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} />
                    </Grid>
                    <Grid item xs={4}>
                        <AddDiscount childIndex={id} isVariant={isVariant} handleDelete={handleDelete} isCrossNecessary={isCrossNecessary} handleCallBackDeleteVariantStates={handleCallBackDeleteVariantStates} selectedProductList={selectedProductList}/>
                    </Grid>
                </Grid>
                {
                    selectedProduct && variantList.length ?
                        <>
                            <Grid container xs={12} style={{ justifyContent: 'flex-end' }}>
                                <Grid item container xs={4.8} style={{ padding: '10' }} columnGap={0.1}>
                                    <Grid item>
                                        <Link style={{color: '#006EFF'}}>{`${hideVariants ? 'Show' : 'Hide'} variants`}</Link>
                                    </Grid>
                                    <Grid item style={{marginTop: -2, color: '#006EFF'}}>
                                        <div onClick={() => handleCallbackVariants(!hideVariants, id)}>{!hideVariants ? <ExpandLessIcon /> : <ExpandMoreIcon />}</div>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <div key={variantList.length}>
                            {
                                !hideVariants && 
                                <Grid container xs={12} style={{ marginLeft: '5vw' }}>
                                        <Grid item xs={12} style={{ overflow: 'unset', height: '20vh' }}>
                                            <DraggableProduct List={variantList} isVariant={true} parentIndex={id} selectedProduct={selectedProduct} setSelectedProduct={selectedProduct} selectedProductList={selectedProductList} setSelectedProductList={setSelectedProductList} handleCallbackProduct={handleCallbackProduct} handleCallbackProductList={handleCallbackProductList} hideVariants={hideVariants} setHideVariants={setHideVariants} handleCallbackVariants={handleCallbackVariants} handleCallBackReorderStates={handleCallBackReorderStates} handleCallBackDeleteStates={handleCallBackDeleteStates} handleCallBackDeleteVariantStates={handleCallBackDeleteVariantStates} isCrossNecessary={isCrossNecessary}/>
                                        </Grid>
                                    </Grid>
                            }
                            </div>
                        </>
                        :
                        null
                }
            </Stack>
    )
}

export default ProductPicker