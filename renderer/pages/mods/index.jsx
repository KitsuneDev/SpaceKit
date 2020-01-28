import React, {Component} from 'react';
import Head from 'next/head';
import { Theme, withStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from '../../components';
import ContentParticled from '../../components/Content'
import CardWrapper from '../../components/CardWrapper';
import Paper from '@material-ui/core/Paper'
import LinearProgress from '@material-ui/core/LinearProgress';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import ModManager from '../../apis/modmanger'
import { WorkshopModList } from './../../components/WorkshopMod';


const styled = withStyles(theme => ({
     root: {
      textAlign: 'center',
      //paddingTop: theme.spacing(1),
      
    },
    paper: {
      padding: "5%",
      
    }
  
  }));

class Modloader extends Component {
  constructor(props){
    super(props)
    this.state = {
      checkedA: false,
      ready: false,
      processing: true,
      dlcLoad: {"disabled_dlcs":[],"enabled_mods":[]}
    }
  }

  toggleModLoader = async (event) => {
    var newState = event.target.checked
    console.log(newState)
    this.setState({...this.state, ready: false, processing: true})
    
    await ModManager.ToggleModloader({"status": event.target.checked})
    await this.loadModList();
    this.setState({ ...this.state, checkedA: newState, ready: newState, processing: false });
    

  }

  loadModList = async () => {
    var dlcs = await ModManager.GetDLCLoads();
    this.setState({...this.state, dlcLoad: dlcs})
    
  }

  componentDidMount = async () => {
    
      console.log("Loading Page...")
      var isOn = await ModManager.QueryModloaderActive();
      console.log(isOn);
      var props = {
        checkedA: isOn,
        processing: false
      }
      await this.loadModList();
      this.setState({...this.state, ...props});
      
    
  }

  render() {
    var {classes} = (this.props);
    return (<ContentParticled>
      <Paper elevation={3} className={classes.paper}>
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
        <WorkshopModList list={this.state.dlcLoad} style={{width: "100%"}}/>
        <br/><br/>
        <Typography gutterBottom>
          <Link href="/home">Voltar</Link>
        </Typography>
        {this.state.processing ? <LinearProgress /> : ""}
        
      </div>
      </Paper>
    </ContentParticled>);

  }

  

}
var render = styled(Modloader);
//render.

export default render;
