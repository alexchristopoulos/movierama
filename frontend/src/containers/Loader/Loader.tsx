import React from 'react';
import { connect } from 'react-redux';
import mapStateToProps from '../../models/mapState';
import mapDispatchToProps from '../../models/mapDispatch';
import './Loader.css'

class Loader extends React.Component {

    props: any;

    render() {
        return (
            <div id="backdrop">
                <div className="text-center loading">
                    <div className="spinner-border" role="status">
                        <span className="sr-only"></span>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
