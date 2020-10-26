import { connect } from "react-redux";
import { Loader } from "./loader";

/**
 * defines the state properties
 * @param state defines the state
 */
const mapStateToProps = state => {
    return {
        loading: state.layout.loading
    };
};

/**
 * define the dispatch actions
 * @param dispatch the actions to be dispatched
 */
const mapDispatchToProps = dispatch => {
    return {
    };
};

/**
 * container for loader component
 */
export default connect(mapStateToProps, mapDispatchToProps)(Loader);
