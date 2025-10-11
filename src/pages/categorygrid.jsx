import react from 'react'
import CategoryCard from '../component/home/categories'
import '../css/home.css/categorygrid.css'
import { Link } from 'react-router-dom';

function CategoryGrid(){
    return(
        <div className="categoryGrid">
            <h1 className="text1">Shop By Categories</h1>
            <h3 className="text">"From timeless classics to signature delights, explore the flavors that make every occasion sweeter."</h3>
            <div className="row">
                <div className="col1">
                    <Link to="/categories/birthday-cakes">
                    <CategoryCard 
                      title="Birthday Cakes"
                    image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkBGSekzdDLaxj9MCrgroeaJb1aiaAzHOeog&s"
                    />
                  </Link>
                  
                </div>
                <div className="col2">
                    <Link to="/categories/wedding-cakes">
                    <CategoryCard
                    title="Wedding Cakes"
                    image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnMU2YMhC8HEV_qXzaiLDfiXh2E-QiAItMpA&s"
                    />
                    </Link>
                </div>

                <div className="col3">
                    <Link to="/categories/cup-cakes">
                    <CategoryCard 
                    title="Cup Cakes"
                    image="https://bakewithshivesh.com/wp-content/uploads/2021/02/IMG_2671-scaled.jpg"
                    />
                    </Link>
                </div>

                <div className="col4">
                    <Link to="/categories/muffins">
                    <CategoryCard 
                    title="Muffins"
                    image="https://www.rainbownourishments.com/wp-content/uploads/2024/02/vegan-chocolate-muffins-1.jpg"
                    />
                    </Link>
                </div>
                
                <div className="col5">
                    <Link to="/categories/chocolate-cakes">
                    <CategoryCard 
                    title="Chocolate Cakes"
                    image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkqFBqM0cGb-Odo4rurW8Qy46qkHd5UHCKPw&s"
                    />
                    </Link>
                </div>

                <div className="col6">
                    <Link to="/categories/signature-gateau-cakes">
                    <CategoryCard 
                    title="Signature Gateau Cakes"
                    image="https://caravanfresh.lk/wp-content/uploads/2024/12/Black-forest-Gateau-3.png"
                    />
                    </Link>
                </div>
                
            </div>
        </div>
    )
};

export default CategoryGrid;