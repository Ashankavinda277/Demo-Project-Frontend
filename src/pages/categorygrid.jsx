import React from 'react';
import { Link } from 'react-router-dom';
import CategoryCard from '../component/home/categories';
import '../css/home.css/categorygrid.css';

const categoriesData = [
  {
    slug: 'birthday-cakes',
    title: 'Birthday Cakes',
    count: 'Festive & Custom',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=700&q=80',
  },
  {
    slug: 'wedding-cakes',
    title: 'Wedding Cakes',
    count: 'Tiers of Elegance',
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=700&q=80',
  },
  {
    slug: 'chocolate-cakes',
    title: 'Chocolate Cakes',
    count: 'Rich Belgian Cocoa',
    image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=700&q=80',
  },
  {
    slug: 'signature-gateau-cakes',
    title: 'Signature Gateaux',
    count: 'Layered Masterpieces',
    image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=700&q=80',
  },
  {
    slug: 'muffins',
    title: 'Artisan Muffins',
    count: 'Freshly Baked Daily',
    image: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=700&q=80',
  },
  {
    slug: 'others',
    title: 'Cupcakes & Treats',
    count: 'Sweet Confections',
    image: 'https://images.unsplash.com/photo-1587668178277-295251f900ce?auto=format&fit=crop&w=700&q=80',
  },
];

function CategoryGrid() {
  return (
    <section className="category-section section-padding">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">Handcrafted Flavors</span>
          <h2>Shop by Category</h2>
          <p>
            From timeless classics to exquisite signature delights, explore our collections crafted to make every celebration unforgettable.
          </p>
        </div>

        <div className="category-grid">
          {categoriesData.map((cat) => (
            <Link key={cat.slug} to={`/categories/${cat.slug}`} className="category-link">
              <CategoryCard 
                title={cat.title} 
                subtitle={cat.count} 
                image={cat.image} 
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategoryGrid;