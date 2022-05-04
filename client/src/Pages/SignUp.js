import { useState } from "react";
const SignUp = (props) => {

	// Initial student in case that you want to update a new student
    const {initialPost = {id: null, 
		nickname: "", 
		email: ""}} = props;


// We're using that initial student as our initial state                       
const [user, setUser] = useState(initialPost);

//create functions that handle the event of the user typing into the form
const handleNicknameChange = (event) => {
const nickname = event.target.value;
setUser((user) => ({ ...user, nickname }));

}

const handleEmailChange = (event) => {
const email = event.target.value;
setUser((user) => ({ ...user, email }));

}

//A function to handle the post request
const postUser = (newUser) => {
return fetch('/api/users', {
method: 'POST',
headers: {'Content-Type': 'application/json'}, 
body: JSON.stringify(newUser)
}).then((response) => {
return response.json()
}).then((data) => {
console.log("From the post ", data);
props.saveUser(data);

});
}

//a function to handle the Update request
const updateUser = (existingUser) =>{
return fetch(`/api/users/${existingUser.id}`, {
method: 'PUT',
headers: {'Content-Type': 'application/json'}, 
body: JSON.stringify(existingUser)
}).then((response) => {
return response.json()
}).then((data) => {
console.log("From put request ", data);
props.saveUser(data);

});

}

// Than handle submit function now needs the logic for the update scenario 
const handleSubmit = (e) => {
	e.preventDefault();
	if(user.id){
		updateUser(user);
	} else {
		postUser(user);
	} 
	
};

return (
	<div>
	<h1>Sign Up</h1>

	<form onSubmit={handleSubmit}>
            <fieldset>
                <label>Username</label>
                <input
                    type="text"
                    id="add-nick-name"
                    placeholder="Nickname"
                    required
                    value={user.nickname}
                    onChange={handleNicknameChange}

                />
                <label>Email</label>
                <input
                    type="text"
                    id="add-email"
                    placeholder="Email"
                    required
                    value={user.email}
                    onChange={handleEmailChange}
                />
            </fieldset>
            
            <button type="submit">{!user.id ? "Submit" : "Save"}</button>
        </form>
	</div>
);
};

export default SignUp;