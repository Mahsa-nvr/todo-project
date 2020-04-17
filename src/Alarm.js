import React from 'react';
class Alarm extends React.Component{
    state = {
        top: -100,
        time: new Date()
    };

    componentDidMount() { 
        setInterval(this.tick, 1000)
        setTimeout(this.welcome, 3000)
    }
    tick = () => {
        this.setState({
            time: new Date()
        })
    };


    welcome = () => {
        this.setState({
            top: 93
        }, () => {
            setTimeout(() => {
                this.setState({
                    top: -100,
                })
            }, 5000)
           
        })
        
    }
   

    render() {
        
        return (
            <React.Fragment>
                
           <div>{this.state.time.toLocaleTimeString()}</div>
           <div style={{
               
                 position: 'absolute',
                backgroundColor:"#06d06b",
                color: "white",
                top: `${this.state.top}px` ,
                right: "16px",
                zIndex: 100,
                transition: "top 0.5s ease",
                width:"300px",
                marginRight: "246px",
                borderRadius: "3px"
           }}>Welcome To App</div>
           </React.Fragment>
        );
    }


}

export default Alarm;