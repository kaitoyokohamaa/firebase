
//dignup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;

  // sign up the user & add firestore data
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    return db.collection('users').doc(cred.user.uid).set({
      bio: signupForm['signup-bio'].value
    });
  }).then(() => {
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-signup');
    M.Modal.getInstance(modal).close();
    signupForm.reset();
  });
});

//create new guide
const createForm = document.querySelector("#create-form")
createForm.addEventListener('submit',(e) =>{
    e.preventDefault();

    db.collection("guides").add({
        title:createForm['title'].value,
        content:createForm['content'].value
    }).then(()=>{
        const modal = document.querySelector("#modal-content")
        M.Modal.getInstance(modal).close();
        createForm.reset()
    }).catch(err=>{
        console.log(err.message)
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
   //get data
   alert("認証成功！")
    db.collection('guides').onSnapshot(snapshot=>{
    setUpGuides(snapshot.docs)
    setupUI(user)
 },err=>{
     console.log(err.message)
 });
    }else{
        setupUI()
       setUpGuides([])
    }
});


