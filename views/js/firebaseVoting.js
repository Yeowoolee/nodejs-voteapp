function addlanguage(){
    var database = firebase.database()
    var languageRef = database.ref('/languages')

    var languageInput = document.getElementById('addlanguage')

    var languageName = languageInput.value
    languageInput.value = ''
    languageRef.push({
        name: languageName,
        votes: 0
    })
        .then(function(){
            window.location.reload()
        })
        .chtch(function(error){
            console.log(error)
        })
}

function upvote(key){
    var database = firebase.database()
    var user = firebase.auth().currentUser
    var userId = user.uid
    var displayName = user.displayName

    //var restaurantVotesRef = database.ref('/languages/'+ key + '/votes'+ userId)
    var languageVotesRef = database.ref('/languages')
                                    .child(key)
                                    .child('/votes')
                                    .child(userId)
    languageVotesRef.set(displayName)
                    .then(function(){
                        window.location.reload()
                    })
                    .chtch(function(error){
                        console.log(error)
                    })
}
function downvote(key){
    var database = firebase.database()
    var user = firebase.auth().currentUser
    var userId = user.uid

    var languageVotesRef = database.ref('/languages')
                                    .child(key)
                                    .child('/votes')
                                    .child(userId)
                                    .remove()
                                    .then(function(){
                                        window.location.reload()
                                    })
}