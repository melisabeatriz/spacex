import React from 'react';
import { Grid, Box } from '@material-ui/core';

export default function MissionKeys({text,color}) {
    return (
        <Grid
        container
        direction="row"
        alignItems="center"
        >
            <Box width={25} height={25} bgcolor={color} mr={2}/>
            <p>{text}</p>
        </Grid>
    )
}
