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

import ModManager from '../../apis/modmanager'
import WorkshopModList from './../../components/WorkshopMod';
import SaveButton from './../../components/saveButton';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';


const styled = withStyles(theme => ({
     root: {
      textAlign: 'center',
      //paddingTop: theme.spacing(1),
      
    },
    paper: {
      padding: "5%",
      
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalContent: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    }
  
  }));

class Modloader extends Component {
  constructor(props){
    super(props)
    this.state = {
      checkedA: false,
      ready: false,
      processing: true,
      dlcLoad: {"disabled_dlcs":[],"enabled_mods":[]},
      addMod: false
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

  removeMod = (index) => {
    var dlcs = this.state.dlcLoad;
    dlcs.enabled_mods.splice(index, 1);
    console.log("Removed at", index)
    console.log(dlcs)
    this.setState({...this.state, dlcLoad: dlcs})
  }

  saveList = async () => {
     // this.setState({...this.state, processing: true})
  }

  render() {
    var {classes} = (this.props);
    return (
    <ContentParticled>
      <React.Fragment>
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
        label="Use ModManager"
      />
        <br/><br/>
        <Button variant="contained" color="primary" disabled={!this.state.ready || this.state.processing}>
          Load Session from URL
        </Button>
        
        <br/><br/>
        <WorkshopModList list={this.state.dlcLoad} removeItem={this.removeMod} style={{width: "100%"}}/>
        <br/><br/>
        <Typography gutterBottom>
          <Link href="/home">Voltar</Link>
        </Typography>
        {this.state.processing ? <LinearProgress /> : ""}
        
      </div>
      <SaveButton onClick={this.saveList} loading={this.state.processing} disabled={!this.state.ready}/>
      <Fab color="primary" aria-label="add" onClick={()=>this.setState({...this.state, addMod:true})}>
        <AddIcon />
      </Fab>
      </Paper>

      
    <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={this.state.addMod}
        onClose={()=>this.setState({...this.state, addMod: false})}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={this.state.addMod}>
          <div className={classes.modalContent}>
            <h2 id="transition-modal-title">Transition modal</h2>
            <p id="transition-modal-description">react-transition-group animates me.</p>
          </div>
        </Fade>
      </Modal>
      </React.Fragment>
      
    </ContentParticled>);
    

  }

  

}
var render = styled(Modloader);
//render.

export default render;
