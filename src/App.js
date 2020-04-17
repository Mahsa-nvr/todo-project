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
       data: [
         {id:1, title:"meet mr.jack of all trads", checked: false, status: false},
         {id:2, title:"being at my best mood", checked: false, status: false},
         {id:2, title:"thinking about cosmos absurdity", checked: false, status: false}
       ]
     }
   }

   add = () => {
     const value= this.state.inputNew.trim()
     if(value !== ''){ 
     this.setState(prevState => {
      return {
        inputNew: '',
        data: [...prevState.data , {id: prevState.data.lenght + 1, title: prevState.inputNew, checked: false, status: false}]
      } 
     })
   }else(alert("please enter character"))
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
     
     )}


     

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
                    </Row> 
                  </div>

              
                 <div>
                  
                       <ListGroup>
                         
                         {
                           this.state.data.map((el, index) => {    
                             if(!el.checked)
                             {                                          
                             return (<ListGroupItem key={index} className='group-item3'>
                                       
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
