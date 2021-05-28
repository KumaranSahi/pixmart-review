import LandingImage from './LandingImage/LandingImage'
import BestDeals from './BestDeals/BestDeals'
import Catagorical from './Catagorical/Catagorical'

const LandingPage=()=>{
    return(
        <div style={{marginBottom:"4rem"}}>
            <LandingImage/>
            <BestDeals/>
            <Catagorical/>
        </div>
    )
}


export default LandingPage;