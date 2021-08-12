import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';


const styles = {
    thumb: {
        display : 'none',
      },
      active: {},
      track: {
        height: 1.5,
        backgroundColor : '#00a0e3'
      },
      rail: {
        height: 1.5,
        opacity: 0.8,
        backgroundColor: '#cacaca',
      },
      mark: {
        backgroundColor: '#cacaca',
        height: 8,
        width: 8,
        borderRadius : '50%',
        marginTop: -3,
      },
      markActive: {
        opacity: 1,
        backgroundColor: '#00a0e3',
      },
      markLabel : {
          color : '#000000',
          fontSize : 11,
          top : 15,
          width : 45,
          fontWeight : '500',
          display : 'block',
          whiteSpace : 'normal',
          wordWrap : 'break-word',
          textAlign : 'center',
          fontFamily : 'Open Sans',
          fontWeight : '600',
          transform : 'translateX(-40%)'
      }
}

const YottolSlider = withStyles({
    root: {
      width : 240,
      color: '#00a0e3',
      height: 2,
      padding: '5px 0',
    },
    ...styles
  })(Slider);

const YottolSliderVertical = withStyles({
  root: {
    width : 2,
    height : 200
  },
  rail: {
    height: 200,
    opacity: 0.8,
    backgroundColor: '#cacaca',
  },
})(Slider);

  const YottolSliderShort = withStyles({
    root: {
      width : 120,
      color: '#00a0e3',
      height: 2,
      padding: '5px 0',
    },
    ...styles
    
  })(Slider);

  
export class CustomSlider extends React.PureComponent {
    render() {
        
        if(!this.props.short)
        {
            if(this.props.orientation === 'vertical')
            {
              return (
                <>
                    <YottolSliderVertical 
                        min={this.props.min} 
                        max={this.props.max} 
                        defaultValue={this.props.value} 
                        marks={this.props.marks} 
                        valueLabelDisplay="off" 
                        disabled
                    />
                    
                </>
              )
            }
            else
            {
              return (
                <>
                    <YottolSlider 
                        min={this.props.min} 
                        max={this.props.max} 
                        defaultValue={this.props.value} 
                        marks={this.props.marks} 
                        valueLabelDisplay="off" 
                        orientation='horizontal'
                        disabled
                    />
                </>
              )
            }
        }

        else
        {
            return (
                <>
                    <YottolSliderShort 
                        min={this.props.min} 
                        max={this.props.max} 
                        defaultValue={this.props.value} 
                        marks={this.props.marks} 
                        valueLabelDisplay="off" 
                        disabled
                    />
                </>
            )
        }
        
    }
}

export default CustomSlider;
