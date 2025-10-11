import Featurecard from   '../component/Featurecard'

function Featuregrid() {
    return(
        <div className="featurecard">
            <div className="row">
                <div className="col1">
                    <Featurecard 
                    icon="https://cdn-icons-png.flaticon.com/512/3035/3035067.png"
                    title="Hygiene & Safety"
                    description="Prepared in a sanitized kitchen with the highest standards."
                    />
                </div>
                <div className="col2">
                    <Featurecard 
                    icon="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnbBHMuojLbMo3uDF0WUhTw515Xi8f4D5SdA&s"
                    title="Affordable Prices"
                    description="Premium taste without breaking the budget"
                    />
                </div>
                <div className="col3">
                    <Featurecard 
                    icon="https://www.shutterstock.com/image-vector/bestseller-business-vector-icon-isolated-600nw-1059233234.jpg"
                    title="Customer Favorites"
                    description="Discover the most-loved picks by our happy customers"
                    />
                </div>
            </div>
        </div>
    )
}

export default Featuregrid