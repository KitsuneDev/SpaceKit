import React, {Component} from 'react';
import clsx from 'clsx';
import { createStyles, withStyles, Theme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = withStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
    },
    wrapper: {
      margin: 0,
      position: 'relative',
    },
    buttonSuccess: {
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[700],
      },
    },
    fabProgress: {
      color: green[500],
      position: 'absolute',
      top: -6,
      left: -6,
      zIndex: 1,
    },
    buttonProgress: {
      color: green[500],
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    }
  }),
);

class SaveButton extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state= {
        loading: false,
        success: false,
        disabled: true
    }
  }
  

  componentDidUpdate(prevProps){
      console.log(this.props)
      if(prevProps.loading != this.props.loading || prevProps.disabled != this.props.disabled){
        console.log("REPROP")
      this.setState({...this.state, loading: this.props.loading, disabled: this.props.disabled})

      if(prevProps.loading == true){
        this.setState({...this.state, disabled:false, success: true, loading: false})
        setTimeout(()=>this.setState({loading: this.props.loading, success: false, disabled: this.props.disabled}), 2000)
      }
      }
  }

  render() {
    const {classes} = this.props;

    
    const buttonClassname = clsx({
      [classes.buttonSuccess]: this.state.success,
      //[classes.fab]: true
    });
    /*React.useEffect(() => {
      return () => {
        clearTimeout(timer.current);
      };
    }, []);*/

    const handleButtonClick = () => {
      if (!this.state.loading) {
        this.setState({success: false, loading: true})
        this.props.onClick()
        /*timer.current = setTimeout(() => {
            this.setState({success: true, loading: false})

        }, 2000);*/
        
      }
    };

    return (<div className={classes.root}>
      <div className={classes.wrapper}>
        <Fab aria-label="save" color="primary" className={buttonClassname} onClick={handleButtonClick} disabled={this.state.disabled}>
          {this.state.success ? <CheckIcon /> : <SaveIcon />}
        </Fab>
        {this.state.loading && <CircularProgress size={68} className={classes.fabProgress} />}
      </div>
      {/*<div className={classes.wrapper}>
        <Button variant="contained" color="primary" className={buttonClassname} disabled={this.state.loading} onClick={handleButtonClick}>
          Accept terms
    </Button>
        {this.state.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
      </div>*/}
    </div>);
  }

}

export default useStyles(SaveButton);