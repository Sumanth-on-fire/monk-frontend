import { Grid } from "@mui/material"
import title from '../assets/monk.svg'

const Header = () => {
    return (
        <Grid container spacing={2} alignItems="center" style={{ padding: 10 }}>
            <Grid item xs={1.7} sm={0.8} md={0.7}>
                <img alt='' src={title} style={{ maxWidth: '100%' }} />
            </Grid>
            <Grid item xs={9} sm={10} md={11} style={{ textAlign: 'start', color: '#7E8185',  marginLeft: '-2vw' }}>
                Monk Upsell & Cross-sell
            </Grid>
        </Grid>
    )
}

export default Header
