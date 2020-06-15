import React, {useState} from 'react';
import {Form,Card, Button,CardHeader,Dropdown,DropdownItem,DropdownMenu,FormGroup,Label,CardBody,Row,Col, DropdownToggle} from 'reactstrap'
import * as yup from 'yup';
import Axios from 'axios'


const OrderForm = () => {

    const validate = (event) => {
        yup.reach(schema, event.target.name)
            .validate(event.target.value)
            .then( valid => {
                setErrors({
                    ...errors, [event.target.name]:''
                })
            })
            .catch( errors => {
                console.log(errors)
                setErrors({...errors,
                [event.target.name]:errors.errors[0]})
            })
    }

    const [errors,setErrors] = useState({
        name:'',
        size:'',
        red:'',
        bbq:'',
        white:'',
        pepperoni:'',
        chicken:'',
        onion:'',        
        peppers:'',
        pineapple:'',
        bacon:'',
        tofu:'',   
        special:''  
    })

    const schema = yup.object().shape({
        name:yup.string().required('must include at least 2 characters').min(2),
        size:yup.string().required('size required'),
        red:yup.boolean(),
        bbq:yup.boolean(),
        white:yup.boolean(),
        pepperoni:yup.boolean(),
        chicken:yup.boolean(),
        onion:yup.boolean(),        
        peppers:yup.boolean(),
        pineapple:yup.boolean(),
        bacon:yup.boolean(),
        tofu:yup.boolean(),  
        special:yup.string()      
    })

    const [formdata, setFormdata] = useState({
        name:'',
        size:'',
        red:false,
        bbq:false,
        white:false,
        pepperoni:false,
        chicken:false,
        onion:false,        
        peppers:false,
        pineapple:false,
        bacon:false,
        tofu:false,
        special:''
    })

    const [dropdownOpen, setDropdownOpen]=useState(false)
   
    const toggle = () => {
        setDropdownOpen(isOpen => !isOpen)
    }

    const eventChange = (event) => {
        event.persist()
        validate(event)
        setFormdata({...formdata,
            [event.target.name]: event.target.type === 'checkbox'? event.target.checked: event.target.value 
        })
    }
   
    console.log(errors)
    return(
    
    <Card>
        <CardHeader>

        </CardHeader>
        <CardBody>
            <Form onSubmit={(event) => {
                event.preventDefault()
                schema.validate(formdata)
                Axios.post('https://reqres.in/api/users', formdata).then((resp) => {
                    console.log('response data:', resp.data)
                })
            }}>
                <FormGroup>
                    <input type='text' name='name' data-cy='name' value={formdata.name} onChange={eventChange} placeholder='Name here'></input>
                    {errors.name.length > 0? <p style={{color:"red"}}>**{errors.name}</p>:null}
                    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                        <DropdownToggle caret>{formdata.size === ''? 'choose size':formdata.size}</DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={ () => {
                                setFormdata({...formdata, size:'small'})
                            }}>
                                Small
                            </DropdownItem>
                            <DropdownItem onClick={ () => {
                                setFormdata({...formdata, size:'medium'})
                            }}>
                                Medium
                            </DropdownItem>
                            <DropdownItem onClick={ () => {
                                setFormdata({...formdata, size:'large'})
                            }}>
                                Large
                            </DropdownItem>
                            <DropdownItem onClick={ () => {
                                setFormdata({...formdata, size:'x-large'})
                            }}>
                                X Large
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </FormGroup>
                <FormGroup>
                <FormGroup>
                        <Label>
                            <input type ="checkbox" name='red' data-cy='red' value={formdata.red} onChange={eventChange}></input>
                            Red
                        </Label>
                    </FormGroup>
                    <FormGroup>
                        <Label>
                            <input type ="checkbox" name='bbq' data-cy='bbq' value={formdata.bbq} onChange={eventChange}></input>
                            BBQ
                        </Label>
                    </FormGroup>
                    <FormGroup>
                        <Label>
                            <input type ="checkbox" name='white' data-cy='white' value={formdata.white} onChange={eventChange}></input>
                            White
                        </Label>
                    </FormGroup>
                </FormGroup>
                
                <Col>
                <FormGroup>
                    <h4>Toppings</h4>
                    <FormGroup>
                        <Label>
                            <input  type ="checkbox" name='pepperoni' data-cy='pepperoni' value={formdata.pepperoni} onChange={eventChange}></input>
                            Pepperoni
                        </Label>
                    </FormGroup>
                    <FormGroup>
                        <Label>
                            <input type ="checkbox" name='chicken' data-cy='chicken' value={formdata.chicken} onChange={eventChange}></input>
                            Chicken
                        </Label>
                    </FormGroup>
                    <FormGroup>
                        <Label>
                            <input type ="checkbox" name='onion' data-cy='onion' value={formdata.onion} onChange={eventChange}></input>
                            onion
                        </Label>
                    </FormGroup>
                    <FormGroup>
                        <Label>
                            <input type ="checkbox" name='peppers' data-cy='peppers'value={formdata.peppers} onChange={eventChange}></input>
                            Peppers
                        </Label>
                    </FormGroup>
                    <FormGroup>
                        <Label>
                            <input  type ="checkbox" name='pineapple' data-cy='pineapple'value={formdata.pineapple} onChange={eventChange}></input>
                            Pineapple
                        </Label>
                    </FormGroup>
                    <FormGroup>
                        <Label>
                            <input type ="checkbox" name='bacon' data-cy='bacon'value={formdata.bacon} onChange={eventChange}></input>
                            Bacon
                        </Label>
                    </FormGroup>
                    <FormGroup>
                        <Label>
                            <input type ="checkbox" name='tofu' data-cy='tofu' value={formdata.tofu} onChange={eventChange}></input>
                            Tofu
                        </Label>
                    </FormGroup>
                    <Label check>
                     Special Instructions  <br/>  
                        <input name='special' type='text' onChange={eventChange} value={formdata.special}></input>
                   
                    </Label>
                </FormGroup>
                </Col>
                <Button data-cy='submit'>Done</Button>
            </Form>
        </CardBody>
    </Card>
    
    )
}

export default OrderForm