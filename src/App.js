import React from 'react';
import { Nav, NavItem,NavLink, Row,  Input, Button, ListGroup, ListGroupItem} from 'reactstrap';
import {HandleChange, Icon} from './Utility';
import swal from 'sweetalert';
import Alarm from './Alarm';

class App extends React.Component {
   constructor(props) {
     super(props)
     this.state = {
       show: true,
       inputNew: '',
       data: [
         {id:1, title:"one", statusDone: false},
         {id:2, title:"two", statusDone: false}
       ]
     }
   }

   add = () => {
     this.setState(prevState => {
      return {
        inputNew: '',
        data: [...prevState.data , {id: prevState.data.lenght + 1, title: prevState.inputNew}]
      }
     })
   }

   delete = (index) => {
     this.setState(prevState => {
       let NewData = [...prevState.data]
       NewData.splice(index, 1);
       return {
         data: NewData
       }
     })
   }


   edit = (index) => {
     swal({
       content: "input",
     }).then(res => {
       let NewState = this.state.data;
       NewState[index].title = res;
       this.setState({
         data: NewState
       })
     }).catch(err => {
       console.log(err)
     })
   }
  
   done = (index) => {
    this.setState(prevState => {
      prevState.statusDone =! prevState.statusDone
    })
    console.log(this.state.statusDone)
   }


  render() {
    return (
     <React.Fragment>
       <div><Alarm/></div>
       <div className="grid-container">
            <div className="title"><h1 style={{color:"white" }}>Todo List</h1></div>
               <div className="todo">

                  <div style={{marginLeft:"63px", marginBottom:"20px"}}>
                  <Row>
                         <Input type="text" className="firstinput" placeholder="what do you do?" name="inputNew" value={this.state.inputNew} onChange={(e) => HandleChange.call(this, e)}/>
                         <Button className="btn-add" onClick={this.add} children={<Icon icon={'plus'}/>}/>                   
                  </Row>  

                  <Nav tabs>
                    <NavItem className="nav1">
                      <NavLink onClick={() => this.setState({show: true })}>
                        undone
                      </NavLink>
                    </NavItem>
                    <NavItem className="nav1">
                      <NavLink onClick={() => this.setState({show: false})}>
                        done
                      </NavLink>
                    </NavItem>
                  </Nav>

                 </div>

         {this.state.show? 
                 <div >
                  
                       <ListGroup>
                         
                         {
                           this.state.data.map((el, index) => {
                             return <ListGroupItem key={index} style={{marginBottom:"5px", padding:"7px"}}>
                                        <input type="checkbox"></input>
                                        {el.title}
                                        <Button onClick={this.delete.bind(this, index)} className="float-right" style={{marginLeft:"5px"}} color="danger" children={<Icon icon={'trash'}/>}/>
                                        <Button onClick={this.edit.bind(this, index)} className="float-right" style={{marginLeft:"5px"}} color="info" children={<Icon icon={'pencil'}/>}/>
                                        <Button onClick={this.done.bind(this, index)} className="float-right" color="success" children={<Icon icon={'check'}/>}/>
                                    </ListGroupItem> 
                           })
                         }
                         
                       </ListGroup>
                      
                 </div> : 
                
                 <div>

                   <Input/>
                   </div>
               
                 }



               </div>
              </div>
     </React.Fragment>
    )
  }
}

export default App;
