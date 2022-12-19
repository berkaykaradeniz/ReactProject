import { useState, useEffect } from "react";
import $ from "jquery";
import "./App.css";
import Error from "./Error";

import Container from 'react-bootstrap/Container';
import BootstrapTable from 'react-bootstrap-table-next';
import PhoneInput, {isValidPhoneNumber} from 'react-phone-number-input'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-phone-number-input/style.css'


function App() {  
	const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
	const [result, setResult] = useState("");
  const [product, setProduct] = useState([]);

  let errorCount = 0;
  let errorMessage = '';
  let createForm = 'http://localhost:8000/createForm.php';
  let getForms = 'http://localhost:8000/getForms.php';

  const columns = [{
    dataField: 'fullname',
    text: 'Fullname'
  }, {
    dataField: 'email',
    text: 'Email'
  }, {
    dataField: 'phonenumber',
    text: 'Phonenumber'
  }];

  function setDatatable(){
    $.ajax({
      type: "POST",
      url: getForms,
      success(data) {
        setProduct(data);
      },
    }); 
  }

  useEffect(() => {
    setDatatable();
  }, []);
  
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

	const handleSumbit = (e) => { 
		e.preventDefault();
    let message = 0;
  
    checkEmpty();//Checked empty inputs

    //Checked Email input
    if (!isValidEmail(email)) {
      errorMessage = 'Email is invalid';
      errorCount++;
    }

    if (!isValidPhoneNumber(phonenumber))
    {
      errorMessage = 'PhoneNumber is invalid';
      errorCount++;
    }

    if (errorCount === 0)
    {
      //Create Form db after show message
      fetch(createForm , {
          method: 'POST',
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: 'fullname=' + fullname + '&email=' + email + '&phonenumber=' + phonenumber
      })
      .then(resp => resp.json().then(data => ({status: resp.status, body: data})))
      .then(json => 
      {
          if (json.status === 200)//İf request success show fullname
            message = json.body.fullname + ' ' + json.body.message;           
          else
            message = json.body.message;           

          setResult(message);
          setDatatable();
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
                <PhoneInput
                    country="TR"
                    defaultCountry="TR"
                    className="form-control"
                    placeholder="+90"
                    value={phonenumber}
                    onChange={setPhoneNumber}/>
                  </div>
            </div>
        
            <div className="row mt-3">
              <button className="form-control button button-primary col-md-3" type="submit">Save Form</button>
            </div>
          </div>
        </form>

        <Error errors={result}/>

      </div>
      <BootstrapTable keyField='id' data={product} columns={columns}/>

    </Container>
	);
}

export default App;
