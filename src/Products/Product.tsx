import { Grid, Stack } from "@mui/material"
import ProductTable from "./ProductTable"

const Product = () => {
    return (
        <Grid container xs={12} style={{textAlign: 'center', justifyContent: 'center'}}>
            <Stack style={{alignItems: 'start', marginTop: '10vh'}}>
                <Grid style={{marginLeft: '5vw', color: '#202223', fontFamily: 'SF Pro Text', fontWeight: 600, }}>
                    Add Products
                </Grid>
                <Grid style={{width: '65vw'}}>
                    <ProductTable/>
                </Grid>
            </Stack>
        </Grid>
    )
}

export default Product