import react from 'react'
import CategoryCard from '../component/home/categories'
import '../css/home.css/categorygrid.css'

function CategoryGrid(){
    return(
        <div className="categoryGrid">
            <h1 className="text1">Shop By Categories</h1>
            <h3 className="text">"From timeless classics to signature delights, explore the flavors that make every occasion sweeter."</h3>
            <div className="row">
                <div className="col1">
                    <CategoryCard 
                      title="Birthday Cakes"
                    image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkBGSekzdDLaxj9MCrgroeaJb1aiaAzHOeog&s"
                    />
                  
                </div>
                <div className="col2">
                    <CategoryCard
                    title="Wedding Cakes"
                    image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnMU2YMhC8HEV_qXzaiLDfiXh2E-QiAItMpA&s"
                    />
                </div>
                <div className="col3">
                    <CategoryCard 
                    title="Cup Cakes"
                    image="https://bakewithshivesh.com/wp-content/uploads/2021/02/IMG_2671-scaled.jpg"
                    />
                </div>
                <div className="col4">
                    <CategoryCard 
                    title="Muffins"
                    image="https://www.rainbownourishments.com/wp-content/uploads/2024/02/vegan-chocolate-muffins-1.jpg"
                    />
                </div>
                <div className="col5">
                    <CategoryCard 
                    title="Chocolate Cakes"
                    image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkqFBqM0cGb-Odo4rurW8Qy46qkHd5UHCKPw&s"
                    />
                </div>
                <div className="col6">
                    <CategoryCard 
                    title="Signature Gateau Cakes"
                    image="https://caravanfresh.lk/wp-content/uploads/2024/12/Black-forest-Gateau-3.png"
                    />
                </div>
            </div>
        </div>
    )
};

export default CategoryGrid;