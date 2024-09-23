import React, { useState } from 'react'
import { useRef } from 'react';

function Signup() {
    let profilePicInputRef = useRef();
    let firstNameInputRef = useRef();
    let lastNameInputRef = useRef();
    let ageInputRef = useRef();
    let emailInputRef = useRef();
    let mobileNoInputRef = useRef();
    let passwordInputRef = useRef();

    let [ProfilePic,setProfilePic] = useState("./images/no image.png")


    let onSingupJSON = async ()=>{

        let myHeaders = new Headers();
        myHeaders.append("content-type","application/json");

        let dataTosend = {
            firstName:firstNameInputRef.current.value,
            lastName:lastNameInputRef.current.value,
            age:ageInputRef.current.value,
            email:emailInputRef.current.value,
            mobileNo:mobileNoInputRef.current.value,
            password:passwordInputRef.current.vaue
        }
        
        let reqOptions = {
            method:"POST",
            headers:myHeaders,
            body:JSON.stringify(dataTosend),
        };

        let JSONData = await fetch("http://localhost:9898/signup",reqOptions);
        let JSOData = await JSONData.json();
        console.log(JSOData);
        alert(JSOData.message);
        
    };

    let onSignupURLEncoded = async ()=>{
        
        let myHeaders = new Headers();
        myHeaders.append("content-type","application/x-www-form-urlencoded");
        
        let dataTosend = new URLSearchParams();
        dataTosend.append("firstName",firstNameInputRef.current.value);
        dataTosend.append("lastName",lastNameInputRef.current.value);
        dataTosend.append("age",ageInputRef.current.value);
        dataTosend.append("email",emailInputRef.current.value);
        dataTosend.append("mobileNo",mobileNoInputRef.current.value);
        dataTosend.append("password",passwordInputRef.current.value);

     let reqOptions = {
        method:"POST",
        headers: myHeaders,
        body:dataTosend
     }

     let JSONData = await fetch("http://localhost:9898/signup",reqOptions);
     let JSOData = await JSONData.json();
     console.log(JSOData);
     alert(JSOData.message);


    };
    let onSignupFormData = async ()=>{
        
       
        
        let dataTosend = new FormData();
        
         for(let i=0;i<profilePicInputRef.current.files.length;i++){
            dataTosend.append("profilePic",profilePicInputRef.current.files[i]);
         }
        dataTosend.append("firstName",firstNameInputRef.current.value);
        dataTosend.append("lastName",lastNameInputRef.current.value);
        dataTosend.append("age",ageInputRef.current.value);
        dataTosend.append("email",emailInputRef.current.value);
        dataTosend.append("mobileNo",mobileNoInputRef.current.value);
        dataTosend.append("password",passwordInputRef.current.value);

     let reqOptions = {
        method:"POST",
        body:dataTosend,
     }

     let JSONData = await fetch("http://localhost:9898/signup",reqOptions);
     let JSOData = await JSONData.json();
     console.log(JSOData);
     alert(JSOData.message);


    };
  return (
    <div>
        <form>
        <div>
                <label>Upload Profile pic</label>
                <input  ref = {profilePicInputRef} type="file" accept='image/*'
                multiple onChange={(eventObj)=>{

                    let selectedImagePath = URL.createObjectURL
                    (eventObj.target.files[0]);

                    setProfilePic(selectedImagePath);
                }}></input>
                <br></br>
                <img class="profilePicPreview" src={ProfilePic}></img>
            </div>  
            <div>
                <label>First Name :</label>
                <input ref = {firstNameInputRef}></input>
            </div>
            <div>
                <label>Last Name :</label>
                <input ref = {lastNameInputRef}></input>
            </div>
            <div>
                <label>Age   :</label>
                <input ref = {ageInputRef}></input>
            </div>
            <div>
                <label>Email :</label>
                <input ref = {emailInputRef}></input>
            </div>
            <div>
                <label>Mobile No :</label>
                <input ref = {mobileNoInputRef}></input>
            </div>
            <div>
                <label>Password</label>
                <input ref = {passwordInputRef}></input>
            </div>
           <div>
            <button type="button" onClick={()=>{
                onSingupJSON();
            }}>Submit(JSON)</button>

            <button type="button" onClick={()=>{
                onSignupURLEncoded();
            }}>Submit(URLENCODED)</button>
           

           <button type="button" onClick={()=>{
                onSignupFormData();
            }}>Submit(FormData)</button>
           
           </div>
          
           
        </form>
    </div>
  )
}

export default Signup