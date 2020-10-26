import { connect } from "react-redux";
import ProductList from "./product-list";
import { getLabSamples, getViewLabSamples, addLabSample, updateLabSample, showError } from '../../actions';

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getSamples: (request: any) => dispatch(getLabSamples(request)),

        viewSamples: (request: any) => dispatch(getViewLabSamples(request)),

        addSample: (model) => dispatch(addLabSample(model)),

        updateSample: (model) => dispatch(updateLabSample(model)),

        onMessage: (message) => dispatch(showError(message))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList as any);