import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';


import { QueryWorkshop } from '../apis/QueryWorkshop';
import { QueryResponseObject } from '../apis/QueryWorkshop';
export class WorkshopModList extends Component<any, any> {
    render() {
        console.log(this.props)
        return (
            <div>
                
                
                    <WorkshopMod list={this.props.list}/>
                
            </div>
        )
    }
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
        this.renderMods()
    }

    componentDidUpdate = async (prevProps)=>{
        if(prevProps.list !== this.props.list){
            await this.renderMods()
        }
    }
    renderMods = async ()=>{
        var mods = await QueryWorkshop(this.props.list.enabled_mods.map((mod, index)=>{
            return mod.substring(8).replace(".mod", "")
        }))
        this.setState({...this.state, mods: (mods as QueryResponseObject)})
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
            <IconButton edge="end" aria-label="comments">
              <CommentIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      );
    })}
  </List>
  );
        
    }
}

var WorkshopMod = useStyles(WorkshopModStub)
//export WorkshopMod;