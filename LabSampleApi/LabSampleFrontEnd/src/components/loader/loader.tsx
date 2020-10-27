import React from 'react';
import { CircularProgress } from '@material-ui/core';

interface Props {
    loading: boolean;
}

export const Loader = (props: Props) => {
    return props.loading ? <div style={{ position: "fixed", height: "100%", width: "100%", opacity: 0.5, backgroundColor: "black", zIndex: 9999, top: 0 }}>
        <CircularProgress color="primary" style={{ width: '5rem', height: '5rem', zIndex: 99999, position: "absolute", top: "50%", left: "50%" }} />
    </div> : null
}