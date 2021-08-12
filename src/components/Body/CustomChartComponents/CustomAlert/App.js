import React from 'react';
import { Alert } from './CustomAlert';

class App extends React.PureComponent {
    render() {
        return (
            <button onClick={()=>{Alert({
                TitleText : 'Warning',
                Message : 'Something wrong here...',
                Band : true,
                BandColor : '#00a0e3',
                BoxColor : '#ffffff',
                TextColor : '#000000',
                AutoClose : {
                    Active : true,
                    Line : true,
                    LineColor : '#00a0e3',
                    Time : 5
                }
            })}}>Click To Open Popup</button>
        )
    }
}

export default App;
