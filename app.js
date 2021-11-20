let userSignUp = () => {
    let name = document.getElementById("name");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let address = document.getElementById("Address");
    let contact = document.getElementById("Contact");
    let country = document.getElementById("Country");
    let city = document.getElementById("City");
    let message = document.getElementById("message");
    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
        .then((res) => {
            let user = {
                // username: username.value,
                name: name.value,
                email: email.value,
                password: password.value,
                address: address.value,
                contact: contact.value,
                country: country.value,
                city: city.value,
            }
            firebase.database().ref(`users/${res.user.uid}`).set(user)
                .then(() => {
                    message.innerHTML = "Signup successful"
                    setTimeout(() => {
                        message.innerHTML = "";
                    }, 5000);
                    location.href = "userLogin.html"
                })
        })
        .catch((err) => {
            message.innerHTML = `${err}`
            setTimeout(() => {
                message.innerHTML = "";
            }, 5000);
            // console.log("err=>", err)
        })
}

let userLogIn = () => {
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
        .then((res) => {
            firebase.database().ref(`users/${res.user.uid}`).once('value', (data) => {
                message.innerHTML = "Login successful"
                setTimeout(() => {
                    message.innerHTML = "";
                }, 5000);
                location.href = "userhomepage.html"
                console.log(data.val())
            })
        })
        .catch((err) => {
            console.log('err=>', err)
            message.innerHTML = `${err}`
            setTimeout(() => {
                message.innerHTML = "";
            }, 2000);
        })
}

// --------------------------------------------------------------------------

let restSignUp = () => {
    let restaurantName = document.getElementById("restaurantName");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let address = document.getElementById("Address");
    let contact = document.getElementById("Contact");
    let country = document.getElementById("Country");
    let city = document.getElementById("City");
    let message = document.getElementById("message");
    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
        .then((res) => {
            let restaurant = {
                restaurantName: restaurantName.value,
                email: email.value,
                password: password.value,
                address: address.value,
                contact: contact.value,
                country: country.value,
                city: city.value,
            }
            firebase.database().ref(`restaurants/${res.user.uid}`).set(restaurant)
                .then(() => {
                    message.innerHTML = "Signup successful"
                    setTimeout(() => {
                        message.innerHTML = "";
                    }, 5000);
                    location.href = "restLogin.html"
                })
        })
        .catch((err) => {
            message.innerHTML = `${err}`
            setTimeout(() => {
                message.innerHTML = "";
            }, 5000);
            console.log("err=>", err)
        })
}

let restLogIn = () => {
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
        .then((res) => {
            firebase.database().ref(`restaurants/${res.user.uid}`).once('value', (data) => {
                message.innerHTML = "Login successful"
                setTimeout(() => {
                    message.innerHTML = "";
                }, 5000);
                location.href = "restdashboard.html"
                console.log(data.val())
            })
        })
        .catch((err) => {
            console.log('err=>', err)
            message.innerHTML = `${err}`
            setTimeout(() => {
                message.innerHTML = "";
            }, 2000);
        })
}

// -----------------------------------------------------------------------------

const logout = () => {
    firebase.auth().signOut().then(() => {
        window.location = "index.html"
    }).catch((error) => {
        // An error happened.
    });
}

// ----------------------------------------------------------------------------

var database = firebase.database().ref('restaurants/meals/')
var key = database.push().key;

let additems = () => {
    let price = document.getElementById("price");
    let itemName = document.getElementById("itemName");
    let category = document.getElementById("category");
    let delivery = document.getElementById("delivery");
    let addmessage = document.getElementById("addmessage");

    let meal = {
        uid: currentuid().uid,
        price: price.value,
        itemName: itemName.value,
        category: category.value,
        delivery: delivery.value,
        image: imgurl

    }
    database.child(key).set(meal)
    addmessage.innerHTML = "item added on user dashboard"
    setTimeout(() => {
        // addmessage.innerHTML = "item added on user dashboard"
        addmessage.innerHTML = "";
    }, 50000);

    
}


// ghous

let uploadFiles = (file) => {
    return new Promise((resolve, reject) => {
        let storageRef = firebase.storage().ref(`myfolder/Images/${file.name}`);
        let uploading = storageRef.put(file)
        uploading.on('state_changed',
            (snapshot) => {
              
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED:
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING:
                        console.log('file is uploading');
                        var progress = parseInt((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                        var p=document.getElementById("prgs")
                        p.innerHTML=`${progress} %`
                        console.log('Upload is ' + progress + '% done');
                        break;

                    
                }
            },
            (error) => {
                reject(error)
            },
            () => {
                uploading.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    // resolve(downloadURL)
                    imgurl=downloadURL
                });
            }
        );
    })
}

let saveImage = (e) => {
    let myFile = document.getElementById("file");
    uploadFiles(myFile.files[0])
    .then((url)=>{
        console.log(url)
    })
    e.preventDefault();
}

var meal = 0;
function showitems(image,pr, iNa, ca, de) {
    var ul = document.getElementById('list');
    var header = document.createElement('li');
    var i = document.createElement('li');
    var p = document.createElement('li');
    var iN = document.createElement('li');
    var c = document.createElement('li');
    var d = document.createElement('li');


    //   here i hardcode images as we didnt cover the firebase storage feature in the class yet,
    //   so i hardcoded image acc to the categories as one of the Sir guided to do that.
    // if (ca === "Chinese") {


        header.innerHTML = `
    <div class="card"  style="width: 18rem; d">
    <img src="${image}" height="200px"  class="card-img-top" alt="...">
    <div class="card-body">
    <h3 class="card-title">RS: ${pr}</h3>
    <h4 class="card-text"> Name: ${iNa}</h4>
    <h4 class="card-text">Category: ${ca}</h4>
    <h4 class="card-text">D/c: ${de}</h4>
    <button id="viewodr" onclick="placeorder()" type="submit" class="btn btn-secondary">place order</button>
`;
    // } if (ca === "Italian") {
    //     header.innerHTML = `
    //     <div class="card"  style="width: 18rem; d">
    //     <img src="images/italian.jpg" height="200px"  class="card-img-top" alt="...">
    //     <div class="card-body">
    //     <h3 class="card-title">RS: ${pr}</h3>
    //     <h4 class="card-text"> Name: ${iNa}</h4>
    //     <h4 class="card-text">Category: ${ca}</h4>
    //     <h4 class="card-text">D/c: ${de}</h4>
    //     <button id="viewodr" onclick="placeorder()" type="submit" class="btn btn-secondary">place order</button>
    // `;
    // }
    // if (ca === "Pakistani") {
    //     header.innerHTML = `
    //         <div class="card"  style="width: 18rem; d">
    //         <img src="images/pakistani.jpg" height="200px"  class="card-img-top" alt="...">
    //         <div class="card-body">
    //         <h3 class="card-title">RS: ${pr}</h3>
    //         <h4 class="card-text"> Name: ${iNa}</h4>
    //         <h4 class="card-text">Category: ${ca}</h4>
    //         <h4 class="card-text">D/c: ${de}</h4>
    //         <button id="viewodr" onclick="placeorder()" type="submit" class="btn btn-secondary">place order</button>
    //     `;
    // } if (ca === "Mexican") {
    //     header.innerHTML = `
    //             <div class="card"  style="width: 18rem; d">
    //             <img src="images/mexican.jpg" height="200px"  class="card-img-top" alt="...">
    //             <div class="card-body">
    //             <h3 class="card-title">RS: ${pr}</h3>
    //             <h4 class="card-text"> Name: ${iNa}</h4>
    //             <h4 class="card-text">Category: ${ca}</h4>
    //             <h4 class="card-text">D/c: ${de}</h4>
    //             <button id="viewodr" onclick="placeorder()" type="submit" class="btn btn-secondary">place order</button>    
    //         `;
    // }
    ul.appendChild(header);
    ul.appendChild(i);
    ul.appendChild(p);
    ul.appendChild(iN);
    ul.appendChild(c);
    ul.appendChild(d);
}

const postAllItems = () => {
    firebase.database().ref('restaurants/meals/').on('value', function (snapshot) {
        snapshot.forEach(
            function (Childsnapshot) {
                let img = Childsnapshot.val().image;
                let pe = Childsnapshot.val().price;
                let ie = Childsnapshot.val().itemName;
                let cy = Childsnapshot.val().category;
                let dy = Childsnapshot.val().delivery;
                showitems(img,pe, ie, cy, dy);
            });
    })
}
window.onload = postAllItems();

function currentuid() {
    var user = firebase.auth().currentUser
    return user
}

function placeorder() {
    let msg = {
        order: "new orders!!! waiting for confirmation "
    }
    localStorage.setItem('message', JSON.stringify(msg))
    alert("your order has been placed. wait for the confirmation")
}

function vieworders() {
    let { order } = JSON.parse(localStorage.getItem('message'));
    var ordermessage = document.getElementById('ordermessage')
    ordermessage.innerHTML = `${order}
    <button  onclick="accept()" id="viewodr">Accept</button>
    <button onclick="decline()" id="viewodr">decline</button>`
    alert("new orders waiting for response. check it out")
}

function accept() {
    let accept = {
        acceptodr: "waiting for accept "
    }
    localStorage.setItem('accepted', JSON.stringify(accept))
}

function decline() {
    let decline = {
        declineodr: "waiting for decline "
    }
    localStorage.setItem('declined', JSON.stringify(decline))
}

function orderprogress() {
    let { acceptodr } = JSON.parse(localStorage.getItem('accepted'));
    var orderaccept = document.getElementById('orderaccept')
    orderaccept.innerHTML = `${acceptodr}`
    let { declineodr } = JSON.parse(localStorage.getItem('declined'));
    var orderdecline = document.getElementById('orderdecline')
    orderdecline.innerHTML = `${declineodr}`
}
