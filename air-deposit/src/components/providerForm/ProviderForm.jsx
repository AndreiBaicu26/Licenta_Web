import React from "react";
import {Button, Form, FormInput, FormGroup, ModalHeader, ModalBody, Modal, FormFeedback, ModalFooter } from "shards-react";
import { saveProvider } from "../../firebase/utils";


const initState = {
    open:false,
    name:{
        invalid: false,
        nameValue:""
    },
    email:{
        invalid: false,
        emailValue:""
    },
    phone:{
        invalid: false,
        phoneValue:""
    }
}

class ProviderForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = initState;
    }


    mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

 handleEmailChange = (event) =>{
    const email = event.target.value;

    if(email.match(this.mailformat)){
        this.setState({email:{emailValue: email, invalid:false}});
    }else{
        this.setState({email:{emailValue: email, invalid:true}});
    }

}

handleNameChange = (event) =>{
    const name = event.target.value;

    if(name.length > 3){
        this.setState({name:{nameValue: name, invalid:false}});
    }else{
        this.setState({name:{nameValue: name, invalid:true}});
    }

}

handlePhoneChange = (event) =>{
    const phoneNo = event.target.value;

    if(phoneNo.length > 3){
        this.setState({phone:{phoneValue: phoneNo, invalid:false}});
    }else{
        this.setState({phone:{phoneValue: phoneNo, invalid:true}});
    }

}




changeState = () =>{
    this.setState(initState);
    this.setState({open:true})
}



saveProvider = async ()=>{
    if(this.state.name.invalid === false &&
        this.state.email.invalid === false &&
        this.state.phone.invalid === false){
            const provider = {name: this.state.name.nameValue, email: this.state.email.emailValue, phone: this.state.phone.phoneValue};
           
            const result = await saveProvider(provider)
            this.props.toggle();
            if(result === true){
                alert ("success")
            }else {
                alert("Provider already exists")
            }
        }
}
 


    render() {
        if (this.props.open === true && this.state.open === false) {
      
            this.changeState();
          } else if (this.props.open === false && this.state.open === true) {
            this.setState({ open: false });
          }
        return (
            <div>
                <Modal size="sm" open={this.props.open} toggle={this.props.toggle}>
                    <ModalHeader>Insert Provider Info</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup row={true}>
                                <FormInput
                                    placeholder="Provider name"
                                    name="provName"
                                    invalid={this.state.name.invalid}
                                    onChange = {(e)=>this.handleNameChange(e)}
                                ></FormInput>
                                <label className="ml3 mb0" htmlFor="provName">
                                    Provider Name
                                 </label>
                                <FormFeedback invalid>Invalid provider Name</FormFeedback>
                            </FormGroup>

                            <FormGroup row={true}>
                                <FormInput
                                    className=""
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                    invalid={this.state.email.invalid}
                                    onChange = {(e)=>this.handleEmailChange(e)}
                                ></FormInput>

                                <label className="ml3 mb0" htmlFor="email">
                                    Email
                                </label>
                                <FormFeedback invalid>Invalid Email</FormFeedback>
                            </FormGroup>

                            <FormGroup row={true}>
                                <FormInput
                                invalid = {this.state.phone.invalid}
                                    className=""
                                    type="text"
                                    placeholder="Phone number"
                                    name="phone"
                                    onChange = {(e)=>this.handlePhoneChange(e)}
                                ></FormInput>

                                <label className="ml3 mb0" htmlFor="phone">
                                    Phone number
                                </label>
                                <FormFeedback invalid>Invalid phone number</FormFeedback>
                            </FormGroup>
                            

                        </Form>
                    </ModalBody>
                    <ModalFooter >
                        <div className="w-100 h-100 flex justify-center">
                            <Button onClick = {()=>this.saveProvider()}>
                                Save Provider
                            </Button>
                        </div>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }

}


export default ProviderForm;