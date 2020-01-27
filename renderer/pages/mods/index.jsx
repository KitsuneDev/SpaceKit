import React, {Component} from 'react';
import Head from 'next/head';
import { Theme, withStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from '../../components';
import ContentParticled from '../../components/Content'
import CardWrapper from '../../components/CardWrapper';
import LinearProgress from '@material-ui/core/LinearProgress';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import { ToggleModloader, QueryModloaderActive } from '../../apis/modmanger'


const styled = withStyles(theme => ({
     root: {
      textAlign: 'center',
      paddingTop: theme.spacing(4),
    },
  
  }));

class Modloader extends Component {
  constructor(props){
    super(props)
    this.state = {
      checkedA: false,
      ready: false,
      processing: true
    }
  }

  toggleModLoader = event => {
    var newState = event.target.checked
    console.log(newState)
    this.setState({...this.state, ready: false, processing: true})
    ToggleModloader(event.target.checked).then(()=>{

      this.setState({ ...this.state, checkedA: newState, ready: newState, processing: false });
    })

  }

  componentDidMount = async () => {
    
      console.log("Loading Page...")
      var isOn = await QueryModloaderActive();
      console.log(isOn);
      var props = {
        checkedA: isOn,
        processing: false
      }
      this.setState({...this.state, ...props});
      
    
  }

  render() {
    var {classes} = (this.props);
    return (<ContentParticled>
      <CardWrapper>
      <Head>
        <title>Mod Manager</title>
      </Head>

      <div className={classes.root}>
        <Typography variant="h4" gutterBottom>
          Mod Manager
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          SpaceKit 2
        </Typography>

        <FormControlLabel
        control={
          <Switch checked={this.state.checkedA} onChange={this.toggleModLoader} value="checkedA" disabled={this.state.processing}/>
        }
        label="Secondary"
      />
        <br/><br/>
        <Button variant="contained" color="primary" disabled={!this.state.ready || this.state.processing}>
          Load Session from URL
        </Button>
        <br/><br/>
        <Typography gutterBottom>
          <Link href="/home">Voltar</Link>
        </Typography>
        {this.state.processing ? <LinearProgress /> : ""}
        
      </div>
      </CardWrapper>
    </ContentParticled>);

  }

  

}
var render = styled(Modloader);
//render.

export default render;
