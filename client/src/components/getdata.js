import react from 'react'
import {useEffect, useState} from 'react'


export const Getdata = () =>{
    const [initialState, setInitialState] = useState([]);

    useEffect(()=>{
        fetch('/api/user/list').then(res=>{
            if(res.ok){
                return res.json()
            }
        }).then(jsonResponse => console.log(jsonResponse))
    }, []);
    return(<div>Stuff</div>)
}


export default Getdata

// import React from 'react';


// export default class Getdata extends React.Component {
//     state = {
//         loading: true,
//         users: null
//     }
//     async componentDidMount(){
//         const url = "/api/user/list";
//         const response = await fetch(url);
//         const data = await response.json();
//         this.setState({users: data, loading: false})
//     }
//     render() {
//         if (this.state.loading) {
//             return(<div>Loading...</div>)
//         }
//         return(
//             <div>{this.state.users}</div>   
//         )

//     }
    
// }



    
