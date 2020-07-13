function checkIfLoggdIn(){
    firebase.auth().onAuthStateChanged(function(user){
        if (user) {
            console.log('로그인 되어 있습니다.')

            var photoURL = user.photoURL
            document.getElementById('google-pic')
            .setAttribute('src', photoURL)
            document.getElementById('google-signin')
            .setAttribute('style', 'display: none; visibility: hidden')
            document.getElementById('signout')
            .setAttribute('style', 'display: inline-block; visibility: visible')
        } else {
            console.log('로그인 되어 있지 않습니다.')
            document.getElementById('google-signin')
            .setAttribute('style', 'display: inline-block; visibility: visible')
            document.getElementById('signout')
            .setAttribute('style', 'display: none; visibility: hidden')

        }

    })


}
window.onload = function(){
    checkIfLoggdIn()
}


function signOut(){
    firebase.auth().signOut()

    document.getElementById('myprofile')
    .setAttribute('style', 'display: none; visibility: hidden')
    checkIfLoggdIn()
}

function signInWithGoogle(){
    var googleAuthProvider = new firebase.auth.GoogleAuthProvider
        firebase.auth().signInWithPopup(googleAuthProvider)
            .then(function(data){
                console.log(data)
                var photoURL = data.additionalUserInfo.profile.picture
                var idToken = data.credential.idToken
                localStorage.setItem('firebase_idToken', idToken)
                localStorage.setItem('google_photo', photoURL)

                document.getElementById('google-pic').setAttribute('src', photoURL)
                
                document.getElementById('myprofile')
                .setAttribute('style', 'display: inline-block; visibility: visible')
            })
            .catch(function(error){
                console.log(error)
        })
    }