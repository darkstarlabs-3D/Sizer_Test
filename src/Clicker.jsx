import { useRef, useEffect, useState } from 'react'
import { ajax } from 'jquery'

export default function Clicker()

{
    const buttonRef = useRef()

    const [ value, setValue ] = useState()

    const performGet = () => {
        ajax({
            type: "GET",
            url: "http://127.0.0.1:5000/sizer",
            crossDomain:true,
            data:{
                sc_mass : 2000,
                t_m_r : 0.125,
                dv : 5,
                prop : "Xe",
            },

            success:function(data)
            {
                setValue(JSON.stringify(data))
                console.log(value)
            }, 

            error:function(error){
                console.log('Oh bugger!' + JSON.stringify(error))
            } 
        })
         
    }



    return <div>
        <button ref={buttonRef} onClick  ={ performGet }>THRUST ME BABY!</button>
        <div>{value}</div>
    </div>
}