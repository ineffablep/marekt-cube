import React from 'react';
import { Route, Switch } from 'react-router';
import Home from '../../pages/home';
import NotFound from '../../pages/notFound';
import OrdersPage from '../../pages/orders';

const Routes = () =>
    (<div className="app-routes">
        <Switch>
            <Route exact path="/" component={Home} title="Home" />
            <Route path="/orders" component={OrdersPage} />
            <Route path="*" component={NotFound} />
        </Switch>
    </div>);

export default Routes;
