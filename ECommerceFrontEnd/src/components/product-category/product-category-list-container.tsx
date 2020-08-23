import { connect } from "react-redux";
import ProductCategoryList from "./product-category-list";
import { getProductCategories, deleteProductCategory, setCurrentRecord } from '../../actions';

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadList: (request) => dispatch(getProductCategories(request)),

        delete: (id) => dispatch(deleteProductCategory(id)),

        setRecord: (record) => dispatch(setCurrentRecord(record))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCategoryList as any);