import { connect } from "react-redux";
import ProductAttribute from "./product-attribute";
import { addProductAttrLookup, updateProductAttrLookup, setCurrentRecord, getProductCategoryDropDown } from '../../actions';

const mapStateToProps = state => {
    return {
        model: state.layout.currentRecord
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadCategories: () => dispatch(getProductCategoryDropDown()),

        addData: (model) => dispatch(addProductAttrLookup(model)),

        updateData: (model) => dispatch(updateProductAttrLookup(model)),

        clearRecord: () => dispatch(setCurrentRecord(undefined))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductAttribute as any);