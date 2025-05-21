import { useRef, useEffect, useState } from 'react'
import { ajax } from 'jquery'
import { Slider, Grid, Input, Box, FormControlLabel, FormGroup, Checkbox, RadioGroup, FormControl, FormLabel, Radio } from '@mui/material'

export default function Clicker()

{
    const buttonRef = useRef()
    const sliderRef = useRef()

    const [ value, setValue ] = useState()
    const [ massValue, setMassValue ] = useState(2000)
    const [ thrustValue, setThrustValue ] = useState(0.125)
    const [ deltaValue, setDeltaValue ] = useState(5)
    const [ propValue, setPropValue ] = useState("Xe")

    const performGet = () => {
        ajax({
            type: "GET",
            url: "http://127.0.0.1:5000/sizer",
            crossDomain:true,
            data:{
                sc_mass : massValue,
                t_m_r : thrustValue,
                dv : deltaValue,
                prop : propValue,
            },

            success:function(data)
            {
                console.log(data)
                setValue(JSON.stringify(data))
                    let headers = Object.keys(data[0])
                    console.log(headers)
                    let table = ('<table>').append('<thead><tr></tr></thead><tbody></tbody>')

                    headers.forEach(header => table.find('thead tr').append(`<th>${header}</th>`))

                    data.forEach(row => {
                        let tr = ('<tr>');
                        headers.forEach(header => tr.append(`<td>{row[header]}</td>`));
                        table.find('tbody').append(tr)
                        
                })
                ('#table-container').html(table);

                
            }, 

            error:function(error){
                console.log('Oh bugger!' + JSON.stringify(error))
            } 
        })
         
    }

    if(value === undefined)
    {
        performGet()
    }



    const handleMassSliderChange = (event, newValue) => {
        setMassValue(newValue)
        performGet()
    }

    const handleMassInputChange = (event) => {
        setMassValue(event.target.value === '' ? 0 : Number(event.target.value))  
    }

    const handleMassBlur = () => {
        if (massValue < 0) {
        setMassValue(0)
        } else if (massValue > 4000) {
        setMassValue(4000)
        }
    }

    const handleThrustSliderChange = (event, newValue) => {
        setThrustValue(newValue)
        performGet()
    }

    const handleThrustInputChange = (event) => {
        setThrustValue(event.target.value === '' ? 0 : Number(event.target.value))  
    }

    const handleThrustBlur = () => {
        if (thrustValue < 0) {
        setThrustValue(0)
        } else if (thrustValue > 0.25) {
        setThrustValue(0.25)
        }
    }

    const handleDeltaSliderChange = (event, newValue) => {
        setDeltaValue(newValue)
        performGet()
    }

    const handleDeltaInputChange = (event) => {
        setDeltaValue(event.target.value === '' ? 0 : Number(event.target.value))  
    }

    const handleDeltaBlur = () => {
        if (deltaValue < 0) {
        setDeltaValue(0)
        } else if (deltaValue > 10) {
        setDeltaValue(10)
        }
    }

    const handlePropChange = (event) => {
        setPropValue(event.target.value)  
        performGet()
    }





    return <div>
        <button ref={buttonRef} onClick  ={ performGet }>THRUST ME BABY!</button>
         <Box sx={{ width: 250 }}>

            <Grid container spacing={2} sx={{ alignItems: 'center' }}>

                <Grid size="grow">
                    <Slider
                        value={typeof massValue === 'number' ? massValue : 0}
                        step= {10}
                        min= {10}
                        max= {4000}
                        onChange={handleMassSliderChange}
                        
                        aria-labelledby="input-slider"
                    />
                </Grid>

                <Grid>
                <Input
                    value={massValue}
                    size="small"
                    onChange={handleMassInputChange}
                    onBlur={handleMassBlur}
                    inputProps={{
                    step: 10,
                    min: 10,
                    max: 4000,
                    type: 'number',
                    'aria-labelledby': 'input-slider',
                    }}
                />
                </Grid>
            </Grid>
        </Box>

        <Box sx={{ width: 250 }}>

            <Grid container spacing={2} sx={{ alignItems: 'center' }}>

                <Grid size="grow">
                    <Slider
                        value={typeof thrustValue === 'number' ? thrustValue : 0}
                        step= {0.001}
                        min= {0}
                        max= {0.25}
                        onChange={handleThrustSliderChange}
                        
                        aria-labelledby="input-slider"
                    />
                </Grid>

                <Grid>
                <Input
                    value={thrustValue}
                    size="small"
                    onChange={handleThrustInputChange}
                    onBlur={handleThrustBlur}
                    inputProps={{
                    step: 0.001,
                    min: 0,
                    max: 0.25,
                    type: 'number',
                    'aria-labelledby': 'input-slider',
                    }}
                />
                </Grid>
            </Grid>
        </Box>

                 <Box sx={{ width: 250 }}>

            <Grid container spacing={2} sx={{ alignItems: 'center' }}>

                <Grid size="grow">
                    <Slider
                        value={typeof deltaValue === 'number' ? deltaValue : 0}
                        step= {0.1}
                        min= {0}
                        max= {10}
                        onChange={handleDeltaSliderChange}
                        
                        aria-labelledby="input-slider"
                    />
                </Grid>

                <Grid>
                <Input
                    value={deltaValue}
                    size="small"
                    onChange={handleDeltaInputChange}
                    onBlur={handleDeltaBlur}
                    inputProps={{
                    step: 0.1,
                    min: 0,
                    max: 10,
                    type: 'number',
                    'aria-labelledby': 'input-slider',
                    }}
                />
                </Grid>
            </Grid>
        </Box>

        <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Propellant</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="Xe"
                    name="radio-buttons-group"
                    onChange={handlePropChange}
                >
                    <FormControlLabel value="Xe" control={<Radio />} label="Xe" />
                    <FormControlLabel value="Kr" control={<Radio />} label="Kr" />

                </RadioGroup>
        </FormControl>
            <div>{value}</div>
    </div>
}