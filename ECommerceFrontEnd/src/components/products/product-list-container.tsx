import { connect } from "react-redux";
import ProductList from "./product-list";
import { getProducts, deleteProduct, setCurrentRecord } from '../../actions';

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadList: (request) => dispatch(getProducts(request)),

        delete: (id: number) => dispatch(deleteProduct(id)),

        setRecord: (record) => dispatch(setCurrentRecord(record))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList as any);