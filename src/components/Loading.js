import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';

const Loading = () => {
    return (
        <div style={{paddingTop: '20%'}}>
         <h1> Loading...</h1>         
         <CircularProgress  />
        </div>
    )
}

export default Loading;