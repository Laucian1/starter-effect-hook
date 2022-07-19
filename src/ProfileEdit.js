import React, {useState, useEffect} from "react"

function ProfileEdit() {
    const [user, setUser] = useState({})

    console.log("render", user)
    useEffect (() => {
        console.log("useEffect")
        async function loadUsers() {
            const response = await fetch(
                "https://jsonplaceholder.typicode.com/users/1"
            )
            const userFromAPI = await response.json()
            console.log("setUser", userFromAPI)
            setUser(userFromAPI)
        }
        loadUsers()
    }, [])

    useEffect(() => {
        if (user.username) {
            document.title = `${user.username} : Edit Profile`
        } else {
            document.title = "Edit Profile"
        }
    }, [user])

    const changeHandler = event => {
        setUser({ ...user, [event.target.name]: event.target.value })
    }

    const submitHandler = async (event) => {
        event.preventDefault()
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/users/${user.id}`,
            {
                method: "PUT",
                body: JSON.stringify(user)
            }
        )
        const savedData = await response.json()
        console.log("Saved user!", savedData)
    }

    if (user.id) {
        return (
            <form name="profileEdit" onSubmit={submitHandler}>
                <div>
                    <label htmlFor="username">User Name:</label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        required={true}
                        onChange={changeHandler}
                        value={user.username}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input 
                        id="email" 
                        name="email" 
                        type="email" 
                        required={true}
                        value={user.email} 
                        onChange={changeHandler}
                    />
                </div>
                <button type="submit">Save</button>
            </form>
        )
    }
    return "Loading..."
}

export default ProfileEdit