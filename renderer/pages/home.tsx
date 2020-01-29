import React, { Component } from 'react'
import Header from '../components/Header'
import Center from '../components/Center'
import Particles from 'react-particles-js';
import { withStyles } from '@material-ui/styles';
import Link from "next/link";
import Typing from 'react-typing-animation';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Bounce from 'react-reveal/Bounce';
import NavigationIcon from '@material-ui/icons/Navigation';

var styles = withStyles(theme => ({
    root: {
        backgroundColor: "#039be5",
        color: "white",
        justifyContent: 'center',
        '& > *': {
            margin: theme.spacing(1),
          },
    },
    displayer: {
        textAlign: "center",
        fontSize: "xx-large"
    },
    buttonGo: {
        textAlign: "center",
        display: "flex",
        paddingLeft: "35%" //15%
        
    },
    inline: {
        display: "inline-block"
    }
    
}))




class Home extends Component<any, any> {
    constructor(props) {
        super(props)
    
        this.state = {
             finished: false
        }
    }
    
    render() {
        var {classes} = (this.props as any);
        
        return (
                <div>
                
                
            <div className={classes.root}>
            <Header />
            <Particles />
                    <Center>
                        <Typing className={classes.displayer} onFinishedTyping={()=>{this.setState({finished: true})}}>
                            <span>Welcome to SpaceKit<br/></span>
                            <span>Ready for mods
                            <Typing.Backspace count={4} />
                            saves
                            <Typing.Backspace count={5} />
                            everything you may need.
                            </span>
                            <Typing.Delay ms={500} />

                        </Typing>
                        <br/>
                            <br/>
                        <div className={classes.buttonGo}>
                            
                        <Bounce left when={this.state.finished}>
                        
                          <Link href="/mods">
                        <Button variant="contained" color="primary">
                                <NavigationIcon className={classes.extendedIcon} />
                                     Manage Mods
                            </Button>
                            </Link>
                          {/*  <Link href="/next">
                        <Button variant="contained" color="primary">
                                <NavigationIcon className={classes.extendedIcon} />
                                     Edit saves
                            </Button>
                            </Link>*/}
                            
                            </Bounce>
                        
                        
                        
                        
                        
                        </div>
                    </Center>
                </div>
            </div>
        )
    }
}

export default styles(Home)


