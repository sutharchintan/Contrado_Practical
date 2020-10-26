import { connect } from "react-redux";
import Login from "./login";
import { loginUser, showError } from '../../actions';

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (model) => dispatch(loginUser(model)),

        onMessage: (message) => dispatch(showError(message))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login as any);