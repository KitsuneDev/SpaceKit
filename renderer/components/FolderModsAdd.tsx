import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';


import { QueryWorkshop } from '../apis/QueryWorkshop';
import { QueryResponseObject } from '../apis/QueryWorkshop';


const useStyles =  withStyles(theme => ({
    root: {
        width: '100%',
        
        backgroundColor: theme.palette.background.paper,
      },
    
}))
class WorkshopModStub extends Component<any, any> {

    constructor(props){
        super(props)
        this.state = {
            mods: {response: {
                publishedfiledetails: []
            }},
            inputList: []

        }
        
    }

    componentDidUpdate = (prevProps)=>{
        if(prevProps.list !== this.props.list){
            console.log("render2")
            this.setState({...this.state, inputList: this.props.list})
            this.renderMods()
        }
    }
    renderMods = async ()=>{
        var mods = await QueryWorkshop(this.state.inputList.map((mod, index)=>{
            return mod.substring(8).replace(".mod", "")
        }))
        this.setState({...this.state, mods: (mods as QueryResponseObject)})
    }

    onAdd = (id) => () => {
        var inputList = this.state.inputList;
        inputList.splice(id, 1)
        this.setState({...this.state, inputList: inputList})
        this.renderMods();
    }
    render() {

        var {classes} = this.props;
        


  return (
    <List className={classes.root}>
    {(this.state.mods as QueryResponseObject).response.publishedfiledetails.map((mod, value) => {
        
      const labelId = `mod-list-label-${value}`;

      return (
        <ListItem key={value} role={undefined} dense button onClick={console.log}>
          <ListItemAvatar>
          <Avatar src={mod.preview_url}>
            
          </Avatar>
        </ListItemAvatar>
          <ListItemText id={labelId} primary={mod.title} />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="comments" onClick={this.onAdd(value)}>
              <AddIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      );
    })}
  </List>
  );
        
    }
}

export default useStyles(WorkshopModStub)
