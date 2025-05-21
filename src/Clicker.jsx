import { useRef, useEffect, useState } from 'react'
import { ajax } from 'jquery'

export default function Clicker({increment, keyName, textColor})

{
    const [ count, setCount ] = useState(parseInt(localStorage.getItem(keyName) ?? 0))
    const buttonRef = useRef()

    const sendReceive = () => fetch("http://127.0.0.1:5000/sizer", {

        method: "GET",
        body: JSON.stringify({
            email: "<APP_USER_EMAIL>",
            appId: "<APPID>",
            developerKey: "<KEY>",
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content: "Hey ChatGPT, what's the capital of Portugal?",
                }
            ]
        })
    })

    async function getData() {
    const url = "http://127.0.0.1:5000/sizer";
    try {
        const response = await fetch(url, {method: "GET"})

        if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        console.log(json);
    } catch (error) {
        console.error(error.message);
    }
    }

    function performGet() {
        ajax({
            type: "GET",
            url: "http://127.0.0.1:5000/sizer",
            crossDomain:true,
            // dataType: "jsonp",
            data:{
                sc_mass : 2000,
                t_m_r : 0.125,
                dv : 5,
                prop : "Xe",
            },
            success:function(data)
            {
                console.log(data);
                
            }, 
            error:function(error){
                console.log('ajax Error ' + JSON.stringify(error));
            } 
        })
        
        
    }
    
    useEffect(() =>
    {
        buttonRef.current.style.backgroundColor = 'red'
        buttonRef.current.style.color = 'white'
        return () =>
        {
            console.log('disposed')
            localStorage.removeItem(keyName)
        }

    }, [])

    useEffect(() =>
    {
        localStorage.setItem(keyName, count)
    }, [ count ])


    const buttonClick = () =>
    {
        // sendReceive()
        // getData()
        performGet()
        console.log('clicked')
    }

    return <div>
        {/* <div style={{color : textColor}} >Click count: { count }</div> */}
        <button ref={buttonRef} onClick  ={ buttonClick }>THRUST ME BABY!</button>
    </div>
}