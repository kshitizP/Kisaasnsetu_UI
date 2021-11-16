import '../../styles/Products.css';
import {Link} from 'react-router-dom';

function Product(props) {
    let productData = props.data;
    const url = props.component === 'category' ? '/products/categories' : '/products/product_details';
    return (
        <div className="productGrid--item">
            <Link to={`${url}/${productData.slug}`}>
                <div className="productImage--wrapper">
                    <img src={productData.image} className="productImage" alt={`${productData.name}`}/>
                </div>
                <div className="productInfo--wrapper">
                    <h2 className="Base-text productInfo Heading u-h2">
                        {productData.name}
                    </h2>
                </div>
            </Link>
        </div>
    );
}

export default Product;