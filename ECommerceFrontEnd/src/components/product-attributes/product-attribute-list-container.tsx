import { connect } from "react-redux";
import ProductAttributeList from "./product-attribute-list";
import { getProductAttrLookupData, deleteProductAttrLookup, setCurrentRecord } from "../../actions";

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadList: (request) => dispatch(getProductAttrLookupData(request)),

        delete: (id) => dispatch(deleteProductAttrLookup(id)),

        setRecord: (record) => dispatch(setCurrentRecord(record))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductAttributeList as any);