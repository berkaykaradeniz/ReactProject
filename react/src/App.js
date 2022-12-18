import { useState } from "react";
import $ from "jquery";
import "./App.css";
import Error from "./Error";

import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import 'bootstrap/dist/css/bootstrap.min.css';

//import validator from 'validator' 

function App() {
	const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
	const [result, setResult] = useState("");

  let errorCount = 0;
  let errorMessage = '';
  let createForm = 'http://localhost:8000/createForm.php';
  let getForms = 'http://localhost:8000/createForm.php';


  //BOOTSTRAP ENTEGRE ET 
  //JQUERY YERINE FETCH KULLAN
  //https://github.com/jackocnr/intl-tel-input
  //datatable ile kayıtları çek

	const handleChangeFullName = (e) => {
		setFullName(e.target.value);
	};
  const handleChangeEmail = (e) => {
		setEmail(e.target.value);
	};
  const handleChangePhoneNumber = (e) => {
		setPhoneNumber(e.target.value);
	};

  function checkEmpty(){
    let cantEmpty = "Can't Empty.";
    if (fullname === ''){
      errorMessage += 'Fullname ' + cantEmpty;
      errorCount++;
    }
    if (email === ''){
      errorMessage += 'Email ' + cantEmpty;
      errorCount++;
    }
    if (phonenumber === ''){
      errorMessage += 'PhoneNumber ' + cantEmpty;
      errorCount++;
    }
  }

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
/*
  function validatePhoneNumber (number) {
    const isValidPhoneNumber = validator.isMobilePhone(number)
    return isValidPhoneNumber
   }
   */

	const handleSumbit = (e) => { 
		e.preventDefault();
		const form = $(e.target);
    let message = 0;
  
    checkEmpty();//Checked empty inputs

    //Checked Email input
    if (!isValidEmail(email)) {
      errorMessage = 'Email is invalid';
      errorCount++;
    }
/*
    if (!validatePhoneNumber(phonenumber))
    {
      errorMessage = 'Phone Number is invalid';
      errorCount++;
    }
    */

    if (errorCount === 0)
    {
      //Create Form db after show message
      fetch(createForm , {
          method: 'POST',
          headers: { "Content-Type": "application/x-www-form-urlencoded" }, // set the content type
          body: form.serialize()
      })
      .then(resp => resp.json().then(data => ({status: resp.status, body: data})))
      .then(json => 
      {
          if (json.status == 200)//İf request success show fullname
            message = json.body.fullname + ' ' + json.body.message;           
          else
            message = json.body.message;           

          setResult(message);
      })
    }
    else
      setResult(errorMessage);
	};

	return (
    <Container className="p-3">
      <div className="App">
        <form onSubmit={(event) => handleSumbit(event)}>
          <div className="col-md-12">
            <div className="row">
              <h1> Form Registry </h1>
            </div>
            <div className="row offset-md-3">
              <div className="col-md-3"> Fullname : </div>
              <div className="col-md-4">
                <input className="form-control" type="text" id="fullname"name="fullname"	value={fullname} onChange={(event) => handleChangeFullName(event)}/>
              </div>
            </div>
            <div className="row mt-3 offset-md-3">
              <div className="col-md-3"> E-Mail : </div>
              <div className="col-md-4">
                <input className="form-control" type="text" id="email"name="email"	value={email} onChange={(event) => handleChangeEmail(event)}/>
              </div>
            </div>
            <div className="row mt-3 offset-md-3">
              <div className="col-md-3"> Phone Number : </div>
              <div className="col-md-4">
                <input className="form-control" type="text" id="phonenumber"name="phonenumber"	value={phonenumber} onChange={(event) => handleChangePhoneNumber(event)}/>
              </div>
            </div>
            <div className="row mt-3">
              <button className="form-control col-md-3" type="submit">Save Form</button>
            </div>
          </div>
        </form>

        <Error errors={result}/>

      </div>
    </Container>
	);
}

export default App;
