import { connect } from "react-redux";
import ProductCategory from "./product-category";
import { addProductCategory, updateProductCategory, setCurrentRecord } from '../../actions';

const mapStateToProps = state => {
    return {
        model: state.layout.currentRecord
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addData: (model) => dispatch(addProductCategory(model)),

        updateData: (model) => dispatch(updateProductCategory(model)),

        clearRecord: () => dispatch(setCurrentRecord(undefined))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCategory as any);