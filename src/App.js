import React from 'react';
import {  Row,  Input, Button, ListGroup, ListGroupItem} from 'reactstrap';
import {HandleChange, Icon} from './Utility';
import swal from 'sweetalert';
import Alarm from './Alarm';
import Complete from './Complete';

class App extends React.Component {
   constructor(props) {
     super(props)
     this.state = {
       top: -100,
       inputNew: '',
       deadTime:'',
       data: [
         {id:1, title:"meet mr.jack of all trads", checked: false, status: false, dueTime:'' },
         {id:2, title:"being at my best mood", checked: false, status: false, dueTime:''},
         {id:2, title:"thinking about cosmos absurdity", checked: false, status: false, dueTime: ''}
       ]
     }
   }

 
   componentDidMount() {
     setInterval(this.calcuteTime, 1000)
   }

   calcuteTime = () => {
     let currentTime = new Date().toTimeString().split(" ")[0]
     let str1 =   currentTime.split(":")[0] * 3600 + currentTime.split(":")[1] * 60 + currentTime.split(":")[2];
      
      this.state.data.map((el, index) => {
         let endTime = el.dueTime;
         let str2 =  endTime.split(":")[0] * 3600 + endTime.split(":")[1] * 60 + endTime.split(":")[2];          
        //  console.log(str1, str2)
         if(str1 === str2){
            console.log('equal')
           return ( this.setState( prevState => {
              let NewData = [...prevState.data]
              NewData[index].show = true
              return {
                data: NewData
              }
            }) )         
          }else return null 
       })    
   }

   add = () => {
     const deadTime= this.state.deadTime

     if(deadTime.split(":").lenght !== 3) {
           let arr = deadTime.split(":")
           arr.push('00')
           let str3 = arr.join(':')
           this.setState({
            deadTime: str3
           })
      }

     const value= this.state.inputNew.trim()
     if(value !== '' && deadTime !== ''){
     this.setState(prevState => {
      return {
        inputNew: '',
        deadTime: '',
        data: [...prevState.data , {id: prevState.data.lenght + 1,
                                    title: prevState.inputNew,
                                    dueTime: prevState.deadTime, 
                                    checked: false,
                                    status: false, 
                                    show: false,
                                    }]
      } 
    })  
}else(alert("please enter todo or deadtime"))
  }


  delete = (index) => {
    this.setState(prevState => {
      prevState.top=16;
      let NewData = [...prevState.data]
      NewData.splice(index, 1);
      return {
        data: NewData
      }
    }, () => {
     setTimeout(() => {
       this.setState({
           top: -100,
       })
   }, 3000)
   })   
  }


   edit = (index) => {
     swal({
       content: "input",      
     }).then(res => {  
       let NewState = this.state.data;
       const value = res.trim();
      if(value !== ''){
       NewState[index].title = res;
     }else{
       alert("please enter characters")
     }
       this.setState({
         data: NewState
       })
     }).catch(err => {
       console.log(err)
     })
   }
  
   handleChecked = (index) => {
    if(!this.state.data[index].show) {
     this.setState(prevState => {
       let NewData = [...prevState.data]      
       NewData[index].checked = true
       return {
         data : NewData
       }
     }, () => {
      setTimeout(() => {
       this.setState(prevState =>{
        let NewData = [...prevState.data]
        NewData[index].status = true
        return {
          data : NewData
        }
       })
       }, 5000);        
     }
     
     )} else return null }


     

  render() {
    return (
     <React.Fragment>    
       <div className="grid-container">
       <div><Complete data={this.state.data}/></div>
            <div className="column2">
            <div className="title"><div><Alarm/></div><h1 style={{color:"white" }}>Todo List</h1></div>
               <div className="todo">

                  <div style={{marginLeft:"63px", marginBottom:"20px"}}>
                     <Row>
                         <Input type="text" className="firstinput" placeholder="what do you want to do?" name="inputNew" value={this.state.inputNew} onChange={(e) => HandleChange.call(this, e)}/>
                         <Button className="btn-add" onClick={this.add} children={<Icon icon={'plus'}/>}/>   
                         <Input type="time" step='1' className="firstinput" value={this.state.deadTime}  name='deadTime' onChange={(e) => HandleChange.call(this, e)} />                
                    </Row> 
                  </div>

              
                 <div>
                  
                       <ListGroup>
                         
                         {
                           this.state.data.map((el, index) => {   
                            //  console.log(el.dueTime)
                             if(!el.checked)
                             {                                          
                             return (<ListGroupItem key={index} className={el.show ? 'group-item4': 'group-item3'}>
                                       
                                        <input type="checkbox" onChange={this.handleChecked.bind(this, index)} checked={el.checked} style={{marginRight:"7px", marginTop:"11px"}}></input>
                                        {el.title}
                                        <Button onClick={this.delete.bind(this, index)} className="float-right" style={{marginLeft:"5px"}} color="danger" children={<Icon icon={'trash'}/>}/>
                                        <Button onClick={this.edit.bind(this, index)} className="float-right" style={{marginLeft:"5px"}} color="info" children={<Icon icon={'pencil'}/>}/>
                                              
                                        </ListGroupItem>)
                                        
                           } else{
                             return null
                           }
                           })
                           
                         }
                         
                       </ListGroup>                     
                 </div>                            
               </div>
              </div>
              </div>

              <div style={{
                 backgroundColor:"#28A745",
                 color: "white",
                 padding: "16px",
                 position: "absolute",
                 top: `${this.state.top}px` ,
                 right: "16px",
                 zIndex: 100,
                 transition: "top 0.5s ease"
                         }} > <Icon icon={'bell'}/> your item successfully deleted </div>
     </React.Fragment>
    )
  }
}

export default App;
