import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Table from '../../components/table';
import uuid from 'uuid';

class Generic extends Component {
    constructor(props) {
        super(props);
        this.openTab = this.openTab.bind(this);
        this.state = {
            showTabId: props.showTabId
        };
    }

    render() {
        const { name, title, tabs, showTabId } = this.props;
        return (
            <div className="app-page generic">
                <header>
                    <h2> {name || title} </h2>
                </header>
                <div className="app-page-tabs">
                    {
                        tabs.map(_ =>
                            <button key={uuid.v4()}
                                className={'app-page-tab app-button' + _.className}
                                style={{ width: (100 / tabs.length) + '%' }}
                                onClick={() => {
                                    this.setState({ showTabId: _.id });
                                }}>
                                <i className={_.icon + ' page-tab-icon'} />
                                <span className="page-tab-text ">  {_.name} </span>
                                {_.badge && _.badge > 0 && <span className="app-badge"> {_.badge} </span>}
                            </button>)
                    }
                </div>

                <div className="app-page-tabs-content">
                    {
                        tabs.map(_ =>
                            <div key={uuid.v4()}>
                                {
                                    _.id === showTabId && <div className="app-page-tab-content">
                                        {
                                            _.content.map(comp =>
                                                <div className="app-page-tab-component" key={uuid.v4()}>
                                                    {comp.component.toLowerCase() === 'grid' &&
                                                        <Table {...comp.props} />
                                                    }
                                                </div>
                                            )
                                        }
                                    </div>
                                }
                            </div>
                        )
                    }
                </div>

            </div>
        );
    }
}

Generic.propTypes = {
    title: PropTypes.string,
    name: PropTypes.string,
    showTabId: PropTypes.string,
    tabs: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        icon: PropTypes.string,
        badge: PropTypes.number,
        className: PropTypes.string,
        content: PropTypes.arrayOf(PropTypes.shape({
            component: PropTypes.string,
            props: PropTypes.object
        }))
    }))
};

export default Generic;
