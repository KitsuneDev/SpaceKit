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

import axios from 'axios'
import Dialog from 'react-bootstrap-dialog'

import NoSsr from '@material-ui/core/NoSsr'
import dynamic from 'next/dynamic'
import SteamWorkshopSubscriber from '../../apis/WorkshopSubscribe'

import ModManager from '../../apis/modmanager'
import FolderModList from '../../components/FolderModsAdd'
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
    },
    fab: {
      margin: 0,
      top: 'auto',
      right: 20,
      bottom: 20,
      left: 'auto',
      position: 'fixed',
    },
    fab2: {
      
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 90,
        left: 'auto',
        position: 'fixed',
      
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
    this.setState({ready: false, processing: true})
    
    await ModManager.ToggleModloader({"status": event.target.checked})
    await this.loadModList()
    this.setState({  checkedA: newState, ready: newState, processing: true });
    //this.setState({  checkedA: newState});
    

  }

  loadModList = async () => {
    var dlcs = await ModManager.GetDLCLoads();
    console.log("GODDLC", dlcs)
    this.setState({dlcLoad: dlcs})
    setTimeout(()=>{ //TODO: Make it work without this hack
      this.forceUpdate()
      this.setState({processing: false})
    }, 300)
  }

  componentDidMount = async () => {
    
      console.log("Loading Page....")
      var isOn = await ModManager.QueryModloaderActive();
      console.log(isOn);
      var props = {
        checkedA: isOn,
        ready: isOn,
        processing: false
      }
      await this.loadModList();
      this.setState(props);
      
    
  }

  loadFromUrl = async () => {
    //import("../../apis/WorkshopSubscribe")//, async (SteamWorkshopSubscriber)=>{
      //const SteamWorkshopSubscriber = dynamic(() => import('../../apis/WorkshopSubscribe'))
    let subscriber = new SteamWorkshopSubscriber();

    this.setState({ready: false, processing: true})
    console.log(this.dialog)
    try {
    let prompt = await this.prompt("URL to a ModList file:")
    let req = await axios.get(prompt)
    let mods = req.data
    for (const modFile of mods.enabled_mods) {
      if(!await ModManager.FileExists(modFile)){
        let mod = modFile.replace("mod/ugc_", "").replace(".mod", "");
        console.log("Subscribe for", mod)
        let subsc = await subscriber.subscribe(mod);
        console.log(subsc)
      }
      else {
        console.log("Mod Exists::", modFile)
      }
    }
  


    this.setState({dlcLoad: mods, ready: true, processing: false})


    this.saveList();
  } catch {
    this.dialog.showAlert('Could not complete request.')
    this.setState({ready: true, processing: false})
  }
    
    
  //});
  }

  prompt = (Text) => {
    return new Promise((resolve, reject)=> {
      this.dialog.show({
        body: Text,
        prompt: Dialog.TextPrompt(),
        actions: [
          Dialog.CancelAction((di)=>reject("cancel")),
          Dialog.OKAction((dialog) => {
            const result = dialog.value
            resolve(result)
            
          }),
          
        ],
        onHide: (dialog) => {
          //dialog.hide()
          //reject("Action was cancelled")
        }
      })
    })
  }


  addMod = (id) => {
    var dlcs = this.state.dlcLoad;
    var enabled_mods = [...dlcs.enabled_mods]
    enabled_mods.push("mod/"+id)
    console.log("Added mod", id)
    dlcs.enabled_mods = enabled_mods;
    console.log(dlcs)
    this.setState({...this.state, dlcLoad: dlcs})

    this.saveList()
  }

  removeMod = (index) => {
    var dlcs = this.state.dlcLoad;
    var enabled_mods = [...dlcs.enabled_mods]
    enabled_mods.splice(index, 1);
    console.log("Removed at", index)
    dlcs.enabled_mods = enabled_mods;
    console.log(dlcs)
    this.setState({...this.state, dlcLoad: dlcs})
  }

  saveList = async () => {
     // this.setState({...this.state, processing: true})
     console.log(this.state)
     //if(this.state.ready){
     this.setState({ready: false, processing: true})
     await ModManager.SaveDLCLoad(this.state.dlcLoad)
     this.setState({ready: true, processing: false})
     console.log("Saved")
     //}
  }

  render() {
    var {classes} = (this.props);
    return (
    <ContentParticled>
      <React.Fragment>
      
      <Paper elevation={3} className={classes.paper}>
      <Head>
        <title>Mod Manager</title>
        <link
  rel="stylesheet"
  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
  integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
  crossorigin="anonymous"
/>
      </Head>
      <Dialog ref={(el) => { this.dialog = el }} />

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
        <NoSsr>
        <Button variant="contained" color="primary" disabled={!this.state.ready || this.state.processing} onClick={this.loadFromUrl}>
          Load Session from URL
        </Button>
        </NoSsr>
        
        <br/><br/>
        {console.log("RL:",this.state.dlcLoad)}
        <WorkshopModList list={this.state.dlcLoad} removeItem={this.removeMod} style={{width: "100%"}}/>
        <br/><br/>
        <Typography gutterBottom>
          <Link href="/home">Voltar</Link>
        </Typography>
        {this.state.processing ? <LinearProgress /> : ""}
        
      </div>
      <div className={classes.fab2}>
      <SaveButton onClick={this.saveList} loading={this.state.processing} disabled={this.state.processing}  />
      </div>
      <Fab color="primary" aria-label="add" onClick={()=>this.setState({...this.state, addMod:true})} disabled={this.state.processing} className={classes.fab}>
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
            <FolderModList addMod={this.addMod}></FolderModList>
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
