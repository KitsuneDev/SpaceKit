import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles';
import Header from './Header';
import Particles from 'react-particles-js';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Center from './Center';

var styles = withStyles({
    root: {
        backgroundColor: "#039be5",
        color: "white",
        justifyContent: 'center',
        overflow: "hidden"
    },

    card: {
        minWidth: 275,
      },
      bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
      },
      title: {
        fontSize: 14,
      },
      pos: {
        marginBottom: 12,
      },
    
    
});

class ContentParticled extends Component {
    render() {
        var {classes} = (this.props as any);
        return (
            <div className={classes.root}>
                {(
                (this.props as any).header != false
                ? <Header />
                : null
                )}
                
                
                {this.props.children}
                
                <Particles />


            </div>
        )
    }
}

export default styles(ContentParticled);
