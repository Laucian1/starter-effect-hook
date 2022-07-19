import React, {useState, useEffect} from "react"

function ProfileEdit({ userID }) {
    const [user, setUser] = useState({})

    useEffect (() => {
        setUser({})
        const abortController = new AbortController()

        async function loadUser() {
            try {
                const response = await fetch(
                    `https://jsonplaceholder.typicode.com/users/${userID}`,
                    { signal: abortController.signal }
                )
                const userFromAPI = await response.json()
                setUser(userFromAPI)
            } catch (error) {
                if (error.name === "AbortError") {
                    console.log("Aborted", userID)
                } else {
                    throw error
                }
            }
        }

        loadUser()

        return () => {
            console.log("cleanup", userID)
            abortController.abort()
        }
    }, [userID])

    useEffect(() => {
        if (user.username) {
            document.title = `${user.username} : Edit Profile`
        } else {
            document.title = "Edit Profile"
        }
    }, [user])

    const changeHandler = (event) => {
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
                <fieldset>  
                    <legend>API User ID: {user.id}</legend>
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
                </fieldset>
            </form>
        )
    }
    return "Loading..."
}

export default ProfileEdit