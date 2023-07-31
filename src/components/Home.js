import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form';
import Task from './Task'
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { logInWithGmail, logInWithEailAndPassword } from "./../store/action";
import { logOut } from "./../store/action";


function Home() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const handleSubmit = e => {
    e.preventDefault()
    dispatch(logInWithEailAndPassword({ email, password }))
  }


  const { current_user, isLoggedIn } = useSelector(state => ({
    current_user: state.current_user,
    isLoggedIn: state.isLoggedIn,
  }), shallowEqual);

  const dispatch = useDispatch();

  return (
    <div>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">:: HOME ::   Task Management System</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              {isLoggedIn ?
                <>Signed in as  : <a href="#">{current_user.name}</a><Button variant="outline-light" size="sm" onClick={() => dispatch(logOut())} style={{ marginLeft: '20px' }}>LogOut</Button></> :
                <h5>User Login Required!</h5>
              }
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      {isLoggedIn ?
        <Task /> :
        <>
          <Card style={{ width: '50%',  margin: 'auto' }} >
            <form onSubmit={handleSubmit}>
              <Form.Control
                type="email"
                name="email"
                value={email}
                placeholder="Email"
                onChange={(e) => { setEmail(e.target.value) }}
              />
              <Form.Control
                type="password"
                name="password"
                value={password}
                placeholder="Password"
                onChange={(e) => { setPassword(e.target.value) }}
              />
              <Button variant="primary" type="submit">Login With Email-Password</Button><br /><br />
              <Button variant="primary" onClick={() => dispatch(logInWithGmail())}>Login With Google</Button><br />


            </form>
            </Card>

        </>

      }
    </div>
  );
}

export default Home;