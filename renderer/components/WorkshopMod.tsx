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

import { shallowEqual } from 'recompose'; 


import { QueryWorkshop } from '../apis/QueryWorkshop';
import { QueryResponseObject } from '../apis/QueryWorkshop';

function clone(obj) {
  var copy;

  // Handle the 3 simple types, and null or undefined
  if (null == obj || "object" != typeof obj) return obj;

  // Handle Date
  if (obj instanceof Date) {
      copy = new Date();
      copy.setTime(obj.getTime());
      return copy;
  }

  // Handle Array
  if (obj instanceof Array) {
      copy = [];
      for (var i = 0, len = obj.length; i < len; i++) {
          copy[i] = clone(obj[i]);
      }
      return copy;
  }

  // Handle Object
  if (obj instanceof Object) {
      copy = {};
      for (var attr in obj) {
          if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
      }
      return copy;
  }

  throw new Error("Unable to copy obj! Its type isn't supported.");
}

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
    oldList = {"enabled_mods": []}
    componentWillReceiveProps = (prevProps)=>{
      console.log(this.oldList, this.props.list)
        if(prevProps.enabled_mods !== this.props.list.enabled_mods ){
            console.log("render-list", prevProps, this.props)
            this.renderMods()
            
        }
    }
    /*componentWillUpdate = (prevProps) => {
      console.log("I",this.oldList, this.props.list)
      if(prevProps.list.enabled_mods.lenght !== this.props.list.enabled_mods.lenght){
        console.log("render")
        this.renderMods()
    }*/
    
    /*componentWillReceiveProps = (prevProps)=>{
      console.log("newPRop");
      console.log(prevProps.list);
      console.log(this.props.list)
      if(shallowEqual(prevProps.list, this.props.list)){
        console.log("render")
        this.renderMods()
    }
    }*/

    renderMods = async ()=>{
      console.log("Rendering state for", this.props.list.enabled_mods)
      this.oldList = clone(this.props.list)
        var mods = await QueryWorkshop(this.props.list.enabled_mods.map((mod, index)=>{
            return mod.substring(8).replace(".mod", "")
        }))
        //var mods = {}
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
