import { connect } from "react-redux";
import ProductList from "./product-list";
import { getProducts, deleteProduct, setCurrentRecord } from '../../actions';

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
      
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList as any);