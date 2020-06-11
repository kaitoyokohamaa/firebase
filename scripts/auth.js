//get data
db.collection('guides').get().then(snapshot=>{
   setUpGuides(snapshot.docs)
})
//dignup
const signupform = document.querySelector('#signup-form');
signupform.addEventListener('submit',(e)=>{
    e.preventDefault()
    const email = signupform['signup-email'].value;   
    const password = signupform['signup-password'].value;

    auth.createUserWithEmailAndPassword(email,password).then(cred=>{
        console.log(cred.user)
        const modal = document.querySelector("#modal-signup")
        M.Modal.getInstance(modal).close();
        signupform.reset()
    })
}) 

//logout
const logout =document.querySelector('#logout')
logout.addEventListener('click', (e)=>{
    e.preventDefault();
    auth.signOut().then(() =>{
        console.log('user sined out')
    }).catch(err=>{
        alert(err)
    })
})

//login
const loginForm =document.querySelector('#login-form');
loginForm.addEventListener('submit' , (e)=>{
    e.preventDefault();
    const email=loginForm['login-email'].value;
    const password=loginForm['login-password'].value;
    auth.signInWithEmailAndPassword(email,password).then(cred=>{
   
      //close the login modal and reset the form
      const modal = document.querySelector("#modal-login")
        M.Modal.getInstance(modal).close();
        signupform.reset()
    })
})
auth.onAuthStateChanged(function (user) {
    if(user){
        console.log('user logged in:',user)
    }else{
        console.log("user logout")
    }
});


