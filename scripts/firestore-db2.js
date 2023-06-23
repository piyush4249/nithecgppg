const userDetails = document.querySelector('.userDetails');
const editProfile = document.querySelector('#editProfile');

function createUserCollection(user, downloadURL) {
  firebase.firestore().collection('users')
    .doc(user.email)
    .set({
      uid: user.uid,
      name: user.displayName,
      age:"",
      gender:"",
      email: user.email,
      ambientT: "",
      bodyT: "",
      file_name: "",
      file_url: "",
      hr: "",
      spo2: "",
      phoneno:"",
      clinicalHistory:"",
      photoURL: downloadURL
    });
}

async function getuserInfoRealtime(user) {
  if (user) {
    const userdocRef = await firebase.firestore().collection('users').doc(user.email);
    userdocRef.onSnapshot((doc) => {
      if (doc.exists) {
        const userInfo = doc.data();
        if (userInfo) {
          userDetails.innerHTML = `
            <table class="highlight">
              <tbody>
                <tr>
                  <td>Ambient T</td>
                  <td>${userInfo.ambientT}</td>
                </tr>
                <tr>
                  <td>Body T</td>
                  <td>${userInfo.body}</td>
                </tr>
                <tr>
                  <td>File Name</td>
                  <td>${userInfo.file_name}</td>
                </tr>
                <tr>
                  <td>File URL</td>
                  <td><a href="${userInfo.file_url}" download>Download File</a></td>
                </tr>
                <tr>
                  <td>HR</td>
                  <td>${userInfo.hr}</td>
                </tr>
                <tr>
                  <td>SPO2</td>
                  <td>${userInfo.spo2}</td>
                </tr>
                <tr>
                  <td>User ID</td>
                  <td>${userInfo.user_id}</td>
                </tr>
                <tr>
                  <td>Name</td>
                  <td>${userInfo.name}</td>
                </tr>
                <tr>
                  <td>Age</td>
                  <td>${userInfo.age}</td>
                </tr>
                <tr>
                  <td>Gender</td>
                  <td>${userInfo.gender}</td>
                </tr>
                <tr>
                  <td>Phone Number</td>
                  <td>${userInfo.phoneno}</td>
                </tr>
                <tr>
                  <td>Clinical History</td>
                  <td>${userInfo.clinicalHistory}</td>
                </tr>
              </tbody>
            </table>
            <button class="btn waves-effect #fbc02d yellow darken-2 modal-trigger" href="#modal3">Edit Details</button>
          `;
          if (userInfo.photoURL) {
            document.querySelector('#proimg').src = userInfo.photoURL;
          } else {
            document.querySelector('#proimg').src = './assets/noimage.png';
          }
        }
      }
    });
  } else {
    userDetails.innerHTML = `
      <h3>Please login</h3>
    `;
  }
}



async function getuserInfoRealtime2(user) {
  if (user) {
    const userdocRef = await firebase.firestore().collection('users').doc(user.email);
    userdocRef.onSnapshot((doc) => {
      if (doc.exists) {
        const userInfo = doc.data();
        if (userInfo) {
          userDetails.innerHTML = `
            <table class="highlight">
              <tbody>
                <tr>
                  <td>Ambient T</td>
                  <td>${userInfo.ambientT.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Body T</td>
                  <td>${userInfo.bodyT.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>File Name</td>
                  <td>${userInfo.file_name}</td>
                </tr>
                <tr>
                  <td>File URL</td>
                  <td><a href="${userInfo.file_url}" download>Download File</a></td>
                </tr>
                <tr>
                  <td>HR</td>
                  <td>${userInfo.hr.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>SPO2</td>
                  <td>${userInfo.spo2.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>User ID</td>
                  <td>${userInfo.user_id}</td>
                </tr>
                <tr>
                  <td>Name</td>
                  <td>${userInfo.name}</td>
                </tr>
                <tr>
                  <td>Age</td>
                  <td>${userInfo.age}</td>
                </tr>
                <tr>
                  <td>Gender</td>
                  <td>${userInfo.gender}</td>
                </tr>
                <tr>
                  <td>Phone Number</td>
                  <td>${userInfo.phoneno}</td>
                </tr>
                <tr>
                  <td>Clinical History</td>
                  <td>${userInfo.clinicalHistory}</td>
                </tr>
              </tbody>
            </table>
            <button class="btn waves-effect #fbc02d yellow darken-2 modal-trigger" href="#modal3">Edit Details</button>
          `;
          document.querySelector('#proimg').src = userInfo.photoURL;
        }
      }
    });
  } else {
    userDetails.innerHTML = `
      <h3>Please login</h3>
    `;
  }
}



function updateUserProfile2(event) {
  event.preventDefault();

  const userDocRef = firebase.firestore()
    .collection('users')
    .doc(firebase.auth().currentUser.email);

  userDocRef.update({
    name: editProfile["name"].value,
    age: editProfile["age"].value,
    gender: editProfile["gender"].value,
    phoneno: editProfile["phoneno"].value,
    address: editProfile["address"].value,
    clinicalHistory: editProfile["clinicalHistory"].value
  });

  M.Modal.getInstance(myModel[2]).close();
}

function updateUserProfile(event) {
  event.preventDefault();

  const userDocRef = firebase.firestore().collection('users').doc(firebase.auth().currentUser.email);
  const name = editProfile['name'].value;
  const age = editProfile['age'].value;
  const gender = editProfile['gender'].value;
  const phoneno = editProfile['phoneno'].value;
  const address = editProfile['address'].value;
  const clinicalHistory = editProfile['clinicalHistory'].value;

  const updateData = {};

  if (name !== '') {
    updateData.name = name;
  }

  if (age !== '') {
    updateData.age = age;
  }

  if (gender !== '') {
    updateData.gender = gender;
  }

  if (phoneno !== '') {
    updateData.phoneno = phoneno;
  }

  if (address !== '') {
    updateData.address = address;
  }

  if (clinicalHistory !== '') {
    updateData.clinicalHistory = clinicalHistory;
  }

  userDocRef.update(updateData);

  M.Modal.getInstance(myModel[2]).close();
}



function uploadImage(e) {
  console.log(e.target.files[0]);
  const uid = firebase.auth().currentUser.uid;
  const email2= firebase.auth().currentUser.email;
  
  const fileRef = firebase.storage().ref().child(`users/${email2}/${e.target.files[0].name}`);

  const uploadTask = fileRef.put(e.target.files[0]);
  uploadTask.on('state_changed',
    (snapshot) => {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      if (progress == '100') alert('uploaded');
    },
    (error) => {
      console.log(error);
    },
    () => {
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        console.log('File available at', downloadURL);
        document.querySelector('#proimg').src = downloadURL;
        firebase.auth().currentUser.updateProfile({
          photoURL: downloadURL
        });
        const user = firebase.auth().currentUser;
        createUserCollection(user, downloadURL);
      });
    }
  );
}
async function allUserDetails() {
  document.getElementById('table').style.display = 'table';
  const userRef = await firebase.firestore().collection('users').get();
  userRef.docs.forEach((doc) => {
    const info = doc.data();
    const downloadButton = `<a href="${info.file_url}" download>Download</a>`;
    document.getElementById('tbody').innerHTML += `
      <tr>
        <td>${info.name}</td>
        <td>${info.email}</td>
        <td>${info.age}</td>
        <td>${info.gender}</td>
        <td>${info.phoneno}</td>
        <td>${info.ambientT.toFixed(2)}</td>
        <td>${info.bodyT.toFixed(2)}</td>
        <td>${info.hr.toFixed(2)}</td>
        <td>${info.spo2.toFixed(2)}</td>
        <td>${info.clinicalHistory}</td>
        <td>${info.file_name}</td>
        <!--<td>${info.file_url}</td>-->
        <td>${downloadButton}</td>
      </tr>
    `;
  });
}
