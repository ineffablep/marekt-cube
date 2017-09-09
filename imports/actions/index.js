import { Meteor } from 'meteor/meteor';

export const actionCreator = (type, ...args) => {
    Meteor.call(type, ...args);
};

export const onHideMenu = (state, onData) => {
    const sideNavStyle = { width: '0' },
        mainStyle = { marginLeft: '0' };
    onData(null, { ...state, sideNavStyle, mainStyle });
};

export const onShowMenu = (state, onData) => {
    const sideNavStyle = { width: '250px' },
        mainStyle = { marginLeft: '250px' };
    onData(null, { ...state, sideNavStyle, mainStyle });
};

export const openTab = (state, onData, props) => {
    console.log(props);
    const showTabId = props.showTabId,
        tabs = JSON.parse(JSON.stringify(props.tabs));
    tabs.forEach(_ => {
        _.className = '';
    });
    const tab = tabs.find(_ => _.id === showTabId);
    tab.className = ' app-page-tab-active';
    const name = tab.name;
    onData(null, { ...state, showTabId, tabs, name });
};
