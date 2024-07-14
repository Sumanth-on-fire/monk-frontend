import { Button, Grid } from "@mui/material"

interface IAddProduct{
    handleCallBackElements: any,
    selectedProduct: any
}

const AddProduct = ({handleCallBackElements, selectedProduct}: IAddProduct) => {

    const getButtonStyles = (isDisabled: boolean) => ({
        color: isDisabled ? '#d3d3d3' : '#008060',
        borderColor: isDisabled ? '#d3d3d3' : '#008060',
        width: '20vw',
        padding: 10,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        backgroundColor: 'transparent'
    });
    
    const isDisabled = selectedProduct.filter((sp: any) => sp === 'Select Product').length;
    

    return (
        <Grid container xs={12} style={{justifyContent: 'flex-end', width:'54vw'}}>
            <Grid item xs={6.5}>
                <Button 
                   variant="outlined"
                   onClick={() => { handleCallBackElements() }}
                   disabled={isDisabled}
                   style={getButtonStyles(isDisabled)}>
                    Add Product
                </Button>
            </Grid>
        </Grid>
    )
}

export default AddProduct