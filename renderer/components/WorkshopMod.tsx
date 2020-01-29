import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import isEqual from 'lodash.isequal';

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
            }}

        }
        
    }
    prevList = []

    componentDidUpdate = (prevProps)=>{
        if(!isEqual(this.prevList, this.props.list.enabled_mods)){
          this.prevList = [].concat(this.props.list.enabled_mods)
            console.log("render")
            this.renderMods()
            //this.setState({a: Math.random()})
        }
    }
    renderMods = async ()=>{
        
        var mods = await QueryWorkshop(this.props.list.enabled_mods.map((mod, index)=>{
            return mod.substring(8).replace(".mod", "")
        }))
        
        this.setState({...this.state, mods: (mods as QueryResponseObject)})
    }

    onRemove = (id) => () => {
        this.props.removeItem(id)
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
            <IconButton edge="end" aria-label="comments" onClick={this.onRemove(value)}>
              <DeleteIcon />
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