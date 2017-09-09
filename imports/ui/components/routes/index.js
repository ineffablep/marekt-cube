import React from 'react';
import { Route, Switch } from 'react-router';
import Home from '../../pages/home';
import NotFound from '../../pages/notFound';
import {GenericPage} from '../../pages/generic';
import OrderProps from '../../../../resources/json/data/orders.json';
const Routes = () =>
    <div className="app-routes">
        <Switch>
            <Route exact path="/" component={Home} title="Home" />
            <Route path="/orders" render={() => <GenericPage {...OrderProps} />} />
            <Route path="*" component={NotFound} />} />
        </Switch>
    </div>;

export default Routes;
