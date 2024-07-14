import { Button, Grid, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import CloseIcon from '@mui/icons-material/Close';

interface IAddDiscount {
    childIndex: any,
    isVariant: any,
    handleDelete: any,
    isCrossNecessary: any,
    parentIndex?: any,
    handleCallBackDeleteVariantStates: any
    selectedProductList: any
}

const AddDiscount = ({ childIndex, isVariant, handleDelete, isCrossNecessary, parentIndex, handleCallBackDeleteVariantStates, selectedProductList }: IAddDiscount) => {
    const [isClicked, setIsClicked] = useState<boolean>(false)
    const [price, setPrice] = useState<number | null>(0)
    const dropDown = [{ val: '% off' }, { val: 'flat' }]
    useEffect(()=>{
        setIsClicked(false)
    },[selectedProductList])
    return (
        isClicked ?
            <Grid container xs={12} style={{ alignItems: 'center', marginTop: -5 }}>
                <Grid container xs={10}>
                    <Grid xs={5} item style={{ paddingRight: 5 }}>
                        <TextField onChange={(tar: any) => { setPrice(tar.value) }} style={{ color: '#000000CC', justifyContent: 'left', marginTop: 5 }} inputProps={{ style: { height: '0vh', color: '#000000CC', width: '4vw' } }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: isVariant ? '16px' : 'auto',
                                    '& fieldset': {
                                        borderColor: 'green',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'green',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'green',
                                    },
                                },
                                borderRadius: isVariant ? '16px' : 'auto'
                            }}
                            value={price} />
                    </Grid>
                    <Grid xs={5} item style={{ paddingRight: 5 }}>
                        <TextField select SelectProps={{ native: true }} style={{ color: '#000000CC', justifyContent: 'left', marginTop: 5 }} inputProps={{ style: { color: '#000000CC', padding: 5, width: '6vw', marginLeft: isVariant ? '1vw' : '0vw' } }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: isVariant ? '16px' : 'auto',
                                    '& fieldset': {
                                        borderColor: 'green',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'green',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'green',
                                    },
                                },
                                borderRadius: isVariant ? '16px' : 'auto'
                            }} >
                            {dropDown.map((option: any) => (
                                <option key={option.val} value={option.val}>
                                    {option.val}
                                </option>
                            ))}
                        </TextField>
                    </Grid>
                    {
                        isVariant ?
                            <Grid item xs={2} color={'#00000066'} sx={{ marginTop: '1.5vh', paddingLeft: !isVariant ? '0px' : '2vw' }} onClick={() => { handleCallBackDeleteVariantStates(parentIndex, childIndex) }}>
                                <CloseIcon />
                            </Grid>
                            :
                            isCrossNecessary ?
                                <Grid item xs={2} color={'#00000066'} sx={{ marginTop: '1.5vh', paddingLeft: !isVariant ? '0px' : '2vw' }} onClick={() => { handleDelete() }}>
                                    <CloseIcon />
                                </Grid>
                                :
                                <div></div>
                    }
                </Grid>
            </Grid>

            :

            <Grid container xs={12} style={{ alignItems: 'center' }}>
                <Grid item container xs={10}>
                    <Button variant="contained" onClick={() => { setIsClicked(!isClicked) }} style={{ background: '#008060', color: '#FFFFFF', fontFamily: 'SF Pro Text', height: '32.8px', width: '15vw' }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: isVariant ? '16px' : 'auto',
                                '& fieldset': {
                                    borderColor: 'green',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'green',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'green',
                                },
                            },
                            borderRadius: isVariant ? '16px' : 'auto'
                        }} >
                        Add Discount
                    </Button>
                </Grid>
            </Grid>
    )
}

export default AddDiscount