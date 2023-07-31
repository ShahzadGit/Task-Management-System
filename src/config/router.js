import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import Home from './../components/Home'
import Chat from './../components/Chat'

class AppRouter extends React.Component {
    render() {
        return (

            <Router>
                {/* <Switch> */}
                    <Route path="/">
                        <Home />
                    </Route>
                    <Route path="/chat">
                        <Chat />
                    </Route>
                    {/* </Switch> */}
            </Router>



            // <BrowserRouter>
            //     <Routes>

            //         <Route path='/' element={<Home />} />
            //         <Route path='/chat' element={<Chat />} />
            //     </Routes>
            // </BrowserRouter>



        )
    }
}

export default AppRouter;