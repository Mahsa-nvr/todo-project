import React from 'react';
import {  ListGroup, ListGroupItem} from 'reactstrap';

class Complete extends React.Component {


    render() {
        const data = this.props.data
        return (
           <React.Fragment>
               <div>
                   <div className="column2">
                   <div className="title2"><h1 style={{color: 'white', fontSize:"160%", paddingTop:'26px'}}>Completed</h1></div>
                   <div className="complete">
                   <ListGroup>
                         
                         {
                           data.map((el, index) => {             
                              if(el.checked) { 
                             return (
                             <ListGroupItem key={index}  className={el.status? 'group-item2' : 'group-item1'}>
                                 {el.title} 
                             </ListGroupItem>)            
                              }else {
                                return null
                            }})
    
                         }
                       
                         
                       </ListGroup>                     
                   </div>
                   </div>
               </div>
           </React.Fragment>
        )
    }
}

export default Complete;