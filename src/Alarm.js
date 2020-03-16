import React from 'react';

class Alarm extends React.Component {
constructor(props) {
    super(props)
    this.state={
        count: 0
    }
}

 render() {
     const {count} = this.state
     return (
         <div>
             <div>Current Count : {count}</div>
         </div>
     )
 }


 componentDidMount() {
     this.myInterval = setInterval(() => {
        this.setState(prevState => ({
            count:  prevState.count + 1
        }))
     }, 1000)   
 }

 componentWillUnmount() {
     clearInterval(this.myInterval)
 }

}


export default Alarm;