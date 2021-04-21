import React from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

import "../../assets/css/Elementos/LoaderLarge.css";

class LoaderLarge extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            procesoFinalizado: false,
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        var procesoFinalizado = false;
        try {
            Object.entries(this.props.todos).forEach(
                ([key, value]) => {
                    var valuePrev  = prevProps.todos[key];
                    let isCreating = value.create && valuePrev && valuePrev.create && value.create.isCreating;
                    let isUpdating = value.update && valuePrev && valuePrev.update && value.update.isUpdating;
                    let isDeleting = value.delete && valuePrev && valuePrev.delete && value.delete.isDeleting;
                    if (isCreating || isUpdating || isDeleting) {
                        procesoFinalizado = true;
                    }
                    if (!isCreating && !isUpdating && !isDeleting) {
                        procesoFinalizado = false;
                    }

                }
            );
        } catch (e) {

        }

        if (this.props.blur !== procesoFinalizado) {
            this.props.setBlur(procesoFinalizado);
        }
    }

    render() {
        const {blur} = this.props;
        return (
            <div style={{display: blur ? "flex" : "none"}} className="contener_loader_18">
                <div className="rond_sup">
                    <div className="rond_mil">
                        <div className="rond_petit">
                            <div className="rond_mini"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        todos: state,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {}
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoaderLarge));
