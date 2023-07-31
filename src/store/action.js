import Startfirebase from './../config/firebase'
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword,  signOut } from "firebase/auth";
import { set, ref, onValue, push, child, remove } from 'firebase/database'
export const SETUSERS = "SETUSERS"
export const SETFBUSERS = "SETFBUSERS"
export const LOGOUT = "LOGOUT"
export const GETTASKS = "GETTASKS"
export const INCREMENT_BY_VALUE = "INCREMENT_BY_VALUE"


export const setUsers = (users) => {
    return {
        type: SETUSERS,
        payload: users
    }
}

export const logInWithGmail = () => {

    return (dispatch) => {
        const db = Startfirebase('DB')
        const auth = Startfirebase('Auth')
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user

                let createUser = {
                    name: user.displayName,
                    //email: user.email,
                    profile: user.photoURL,
                    uid: user.uid
                }
                //console.log("User-->", createUser)
                set(ref(db, 'Users/' + user.uid), createUser)
                    .then(() => {
                        dispatch({ type: SETUSERS, payload: createUser })
                    })
                    .catch((error) => {
                        console.log("Error in saving data-->", error)
                    })

                // This gives you a Access Token. You can use it to access the API.
            })
            .catch((error) => {
                console.log("Error in Login-->", error)
            })
        //   dispatch({ type: "SETDATA", data: data })
    }
}

export const logInWithEailAndPassword = ({email, password}) => {

    return (dispatch) => {
        const db = Startfirebase('DB')
        const auth = Startfirebase('Auth')
        console.log(email,'--', password)
        /* createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                const user = result.user

                let createUser = {
                    name: user.displayName,
                    //email: user.email,
                    profile: user.photoURL,
                    uid: user.uid
                }
                //console.log("User-->", createUser)
                set(ref(db, 'Users/' + user.uid), createUser)
                    .then(() => {
                        dispatch({ type: SETUSERS, payload: createUser })
                    })
                    .catch((error) => {
                        console.log("Error in saving data-->", error)
                    })

                // This gives you a Access Token. You can use it to access the API.
            })
            .catch((error) => {
                console.log("Error in Login-->", error)
            }) */
        ///////////////////////////////////////////
          signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                const user = result.user

                let createUser = {
                    name: user.displayName,
                    //email: user.email,
                    profile: user.photoURL,
                    uid: user.uid
                }
                //console.log("User-->", createUser)
                set(ref(db, 'Users/' + user.uid), createUser)
                    .then(() => {
                        dispatch({ type: SETUSERS, payload: createUser })
                    })
                    .catch((error) => {
                        console.log("Error in saving data-->", error)
                    })

                // This gives you a Access Token. You can use it to access the API.
            })
            .catch((error) => {
                console.log("Error in Login-->", error)
            }) 
        //   dispatch({ type: "SETDATA", data: data })
    }
}

export const getUsers = () => {

    return (dispatch) => {
        const db = Startfirebase("DB")
        let users = []
        const dbRef1 = ref(db, '/Users');

        //This pattern can be useful when you want to fetch all children of a list in a single operation, rather than listening for additional child added events.
        onValue(dbRef1, (snapshot) => {
            if (snapshot.exists) {
                snapshot.forEach((childSnapshot) => {
                    //const childKey = childSnapshot.key;
                    const childData = childSnapshot.val();
                    users.push(childData)
                });
                //Place dispatch here...
                dispatch({ type: SETFBUSERS, payload: users })
                console.log('users----->', users)

            }
            else
                alert("No User in DB")
        }, {
            onlyOnce: true
        });
        //Don't place dispatch here...As this part is running before the above code
        //console.log("Users in Get Users-->", users)
    }
}

export const logOut = () => {

    return (dispatch) => {

        const auth = Startfirebase('Auth')

        signOut(auth).then(() => {
            dispatch({ type: LOGOUT })
        }).catch((error) => {
            // An error happened.
        });
    }
}

export const getTasks = (tasksUid) => {

    return (dispatch) => {
        const db = Startfirebase("DB")
        // let myTasks = [] //Don't place it here as it will empty the variable on Every childadded/changed/removed Place it down inside loop
        console.log("Mergged UID in getTasks->", tasksUid)
        const dbRef1 = ref(db, '/Tasks' + '/' + tasksUid);

        //This pattern can be useful when you want to fetch all children of a list in a single operation, rather than listening for additional child added events.
        onValue(dbRef1, (snapshot) => {
            let myTasks = []
            if (snapshot.exists()) {
                snapshot.forEach((childSnapshot) => {
                    //const childKey = childSnapshot.key;
                    const childData = childSnapshot.val();
                    myTasks.push(childData)
                });
                //Place dispatch here...
                dispatch({ type: GETTASKS, payload: myTasks })

            }
            else {
                dispatch({ type: GETTASKS, payload: myTasks }) //This dispatch will probably send an empty array jsut to remove previous chats if any
                // console.log('Tasks in Else-IF----->', myTasks)
                alert("No Tasks in DB for this user.")
            }

        }, {
            // onlyOnce: true
        });
        //Don't place dispatch here...As this part is running before the above code
        //console.log("Users in Get Users-->", users)
    }

}

export const setTasks = (task) => {
    return (dispatch) => {
        console.log("Tasks in Action", task)
        const db = Startfirebase("DB")
        const newTaskKey = push(child(ref(db), 'Tasks')).key

        let createTask = {
            title: task.title,
            desc: task.desc,
            name: task.name,
            uid: task.uid,
            taskUid: newTaskKey
        }

        set(ref(db, 'Tasks/' + task.taskUid + '/' + newTaskKey), createTask)
            .then(() => {
                // This dispatch was not needed at all. Because once the child data was added by set(), it triggered the OnValue() listener in the getChats(), which in return fetched all new changes and dispatched them to store. OnValue() This method is triggered once when the listener is attached and again every time the data, including children, changes.  
                // dispatch({ type: "SETTASKS", payload: createTask })
                console.log("Task added successfully")
            })
            .catch((error) => {
                console.log('ERROR->', error)
            })
    }
}

export const removeTask = (merggedID, taskID) => {
    return (dispatch) => {

        const db = Startfirebase("DB")
        remove(ref(db, 'Tasks/' + merggedID + '/' + taskID))
            .then(() => {
                //    alert('Data was Deleted') 
                console.log("Task Deleted...")
            })
            .catch((error) => { alert('Error', error) })
    }
}

export const incrementByValue = (number) => {
    return {
        type: INCREMENT_BY_VALUE,
        payload: number
    }
}
