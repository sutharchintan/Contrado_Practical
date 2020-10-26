import { connect } from "react-redux";
import Header from "./header";
import { logoutUser } from '../../actions';

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logoutUser()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header as any);