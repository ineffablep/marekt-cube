import React from 'react';
import { compose } from 'react-komposer';
import Loader from '../ui/components/loader';
import Alert from '../ui/components/alert';

const options = {
    loadingHandler: () => (<Loader />),
    errorHandler: (err) => (<Alert className="error" header="Error" message={err} />)
};
export default (state, actions, ...args) => {
    return compose((props, onData) => {
        actions.forEach(_ => {
            state[_.name] = () => _(state, onData,props);
        });
        onData(null, { ...state }, { ...options, ...args });
    });
};
