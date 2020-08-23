import { connect } from "react-redux";
import  ErrorMessage  from "./error-message";
import { hideError } from "../../actions";

/**
 * defines the state properties
 * @param state defines the state
 */
const mapStateToProps = state => {
    return {
        showError: state.layout.showError,
        errorMessage: state.layout.errorMessage
    };
};

/**
 * define the dispatch actions
 * @param dispatch the actions to be dispatched
 */
const mapDispatchToProps = dispatch => {
    return {
        onClose: () =>
            dispatch(hideError())
    };
};

/**
 * container for error component
 */
export default connect(mapStateToProps, mapDispatchToProps)(ErrorMessage);
