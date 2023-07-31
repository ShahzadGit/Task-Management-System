import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Accordion from 'react-bootstrap/Accordion'
import Image from 'react-bootstrap/Image'
import Table from 'react-bootstrap/Table'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { getUsers } from "../store/action";
import { getTasks } from "../store/action";
import { setTasks } from "../store/action";
import { removeTask } from "../store/action";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'


function Task() {

  const { users, current_user, isLoggedIn, tasks } = useSelector(state => ({
    current_user: state.current_user,
    isLoggedIn: state.isLoggedIn,
    users: state.users,
    tasks: state.tasks

  }), shallowEqual);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers())
    //console.log('Users-->', users);

  }, []);

  const [taskUser, setTaskUser] = useState({})
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")

  function startTask(user) {
    const uids = merge_uid(current_user.uid, user.uid)
    setTaskUser(user)
    // setTaskUser(preState => {
    //   return Object.assign({}, preState, user);
    // })
    dispatch(getTasks(uids))
  }

  function merge_uid(uid1, uid2) {
    if (uid1 < uid2) {
      return uid1 + uid2
    } else
      return uid2 + uid1
  }

  function send() {
    const uids = merge_uid(current_user.uid, taskUser.uid)

    let data = {
      title: title,
      desc: desc,
      name: current_user.name,
      uid: current_user.uid,
      taskUid: uids
    }
    // console.log("data-->", data)
    dispatch(setTasks(data)) //This will not only Set Task in State but also in Firebase DB, whiich in return invoke onValue listener and cause a re-render
    setTitle("")
    setDesc("")
  }

  function deleteTask(taskID) {
    const mergeddUid = merge_uid(current_user.uid, taskUser.uid)


    dispatch(removeTask(mergeddUid, taskID))
  }

  return (
    <div style={{ display: 'flex', textAlign: 'left', justifyContent: 'center' }}>

      <Accordion defaultActiveKey={['0']} alwaysOpen style={{ width: '70%' }}  >
        <Accordion.Item eventKey="0">
          <Accordion.Header>List of Groups</Accordion.Header>
          <Accordion.Body>
            <div style={{ display: 'flex', textAlign: 'left', justifyContent: 'center' }}>
              <Card style={{ width: '100%' }} >
                <ListGroup >
                  <Table striped size="sm" hover>
                    <tbody>
                      {users.map((user, i) => {
                        return (
                          current_user.uid !== user.uid &&
                          <tr key={i}>
                            <td><Image src={user.profile} roundedCircle width="40rem" style={{ float: 'left' }} /></td>
                            <td><h6>{user.name}</h6></td>
                            <td><Button variant="primary" id="button-addon2" onClick={() => startTask(user)}>Show Tasks</Button></td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </Table>
                </ListGroup>
              </Card>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Tasks...</Accordion.Header>
          <Accordion.Body>
            {Object.keys(taskUser).length ?
              <div style={{ display: 'flex', textAlign: 'left', justifyContent: 'center' }}>
                <Card style={{ width: '100%' }}>
                  {/* <Card.Img variant="top" src={taskUser.profile} style={{ width: '7rem', display: 'block', marginLeft: 'auto', marginRight: 'auto', borderRadius: '50%', border: '2px solid lightgray' }} /> */}
                  <Card.Body>
                    {/* <Card.Title>{taskUser.name}</Card.Title> */}
                    <Table striped size="sm" hover>
                      <tbody>
                        {tasks.length > 0 ?
                          tasks.map((v, i) => {
                            return (
                              <tr key={i}>
                                <td>{v.uid === current_user.uid ?
                                  <h6 style={{ color: "royalblue" }}><span>ME--> Title:</span> {v.title}<span>. Description: {v.desc}</span></h6> :
                                  <h6 style={{ color: "gray" }}>{taskUser.name}--> {v.title}. Description: {v.desc}</h6>}
                                </td>
                                <td><Form.Check type="checkbox"  label="Completed"/></td>
                                <td>{v.uid === current_user.uid && <Button variant="outline-primary" size="sm" onClick={() => { deleteTask(v.taskUid) }}><FontAwesomeIcon icon={faTrashCan} size="lg" /></Button>}</td>
                              </tr>

                            )
                          })
                          :
                          <Card.Text>No Tasks in DB</Card.Text>
                        }
                      </tbody>
                    </Table>

                    {/* <InputGroup className="mb-3">
                      <FormControl
                        placeholder="Write your Title"
                        aria-label="Write your Title"
                        aria-describedby="basic-addon2"
                        value={message}
                        onChange={(e) => { setMessage(e.target.value) }}
                      />
                      <Form.Control as="textarea" rows={3} placeholder="Write Description" />
                      <Button variant="primary" id="button-addon2" onClick={() => send()}>Add Task</Button>
                    </InputGroup> */}

                    <Form>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Control type="text"
                          placeholder="Write your Title" value={title}
                          onChange={(e) => { setTitle(e.target.value) }}
                        />
                        <Form.Control as="textarea" rows={3}
                          value={desc} onChange={(e) => { setDesc(e.target.value) }}
                          placeholder="Write Description" />
                        <Button variant="primary" id="button-addon2" onClick={() => send()}>Add Task</Button>
                      </Form.Group>
                    </Form>
                  </Card.Body>
                </Card>
              </div>
              :
              <h5>Select a Group to add tasks...!</h5>
            }
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>


    </div>
  );
}

export default Task;
