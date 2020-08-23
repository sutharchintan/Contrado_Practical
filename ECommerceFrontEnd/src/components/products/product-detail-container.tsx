import { connect } from "react-redux";
import ProductDetail from "./product-detail";
import { addProduct, updateProduct, setCurrentRecord, getProductCategoryDropDown } from '../../actions';

const mapStateToProps = state => {
    return {
        model: state.layout.currentRecord
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addData: (model) => dispatch(addProduct(model)),

        updateData: (model) => dispatch(updateProduct(model)),

        loadCategories: () => dispatch(getProductCategoryDropDown()),

        clearRecord: () => dispatch(setCurrentRecord(undefined))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail as any);