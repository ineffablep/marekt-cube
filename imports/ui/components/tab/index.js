import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';

class Tab extends Component {
    constructor(props) {
        super(props);
        this.onTabClick = this.onTabClick.bind(this);
        this.state = {
            selectedTabIndex: props.selectedTabIndex,
            tabs: props.tabs
        };
    }

    componentDidMount() {
        this.onTabClick(this.state.selectedTabIndex);
    }

    onTabClick(i) {
        const tabs = this.state.tabs;
        tabs.forEach(_ => _.className = '');
        const tab = tabs[i];
        tab.className = 'app-tab-active';
        this.setState({ selectedTabIndex: i, tabs: tabs });
        this.props.onClick(i);
    }

    renderContent() {
        return (
            <div className="app-tab-content">
                {this.props.children && this.props.children[this.state.selectedTabIndex]}
            </div>
        );
    }

    render() {
        return (
            <div className="app-tab-component">
                <div className="app-tabs">
                    {
                        this.state.tabs.map((_, i) =>
                            (<button key={uuid.v4()}
                                className={'app-tab ' + _.className}
                                style={{ width: (100 / this.state.tabs.length) + '%' }}
                                onClick={() => { this.onTabClick(i); }}>
                                <i className={_.icon + ' tab-icon'} />
                                <span className="tab-text ">  {_.name} </span>
                                {_.badge && _.badge > 0 && <span className="app-badge"> {_.badge} </span>}
                            </button>))
                    }
                </div>

                <div className="app-tabs-content">
                    {this.renderContent()}
                </div>

            </div>
        );
    }
}

Tab.propTypes = {
    selectedTabIndex: PropTypes.number,
    onClick: PropTypes.func,
    children: PropTypes.array,
    tabs: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        icon: PropTypes.string,
        badge: PropTypes.number,
        className: PropTypes.string
    }))
};

export default Tab;
