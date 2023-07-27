import React, { useState } from "react";
import Axios from "axios";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";

/* We are going to create two routes

users route (static routes to display all links to individual users)

user route each user will be identified by their unique ID 
and the URL will pass this ID and the component will display the proper user content */

/* We will create a dummy users data */

const users = [
  {
    name: `Param`
  },
  {
    name: `Vennila`
  },
  {
    name: `Afrin`
  }
];

// Creating Routes for all users and a single user.

const IndexPage = () => {
  return <h3>Home Page</h3>;
};

const AboutPage = () => {
  return <h3>About Page</h3>;
};

const UsersPage = () => {
  return (
    <>
      {users.map((user, index) => (
        <h5 key={index}>
          <Link to={`/user/${index + 1}`}>{user.name}'s Page</Link>
        </h5>
      ))}
    </>
  );
};

const DiscoverBtn = () => {
  function wait(time) {
    return new Promise((resolve) => {
      setTimeout(resolve, time);
    });
  }
  const [isDisabled, setIsDisabled] = useState(false);
  const [btnText, setBtnText] = useState("Hello World!");
  const [resultData, setResultData] = useState({});
  async function btnHandler() {
    setBtnText("Bye World!");
    setIsDisabled(true);
    await wait(4000);
    Axios({
      url: "https://jsonplaceholder.typicode.com/posts"
    })
      .then((response) => {
        console.log(response.data);
        setResultData(response.data);
        setIsDisabled(false);
        setBtnText("Hello World!");
      })
      .catch((error) => {
        console.log(error);
        setIsDisabled(false);
        setBtnText("Hello World!");
      });
  }

  return (
    <>
      <Link to="/about">
        <button id="btn" onClick={btnHandler} disabled={isDisabled}>
          {btnText}
        </button>
      </Link>
      <div>{JSON.stringify(resultData)}</div>
    </>
  );
};

/* 
/////////////////How do we access the route parameters in the component if 
we wanted to display informations about the users?//////////////////////

React router passes two props to our component

match props and location props

If we console.log match and locations props we get something similar to this: 

/* /*
  URL: /user/1
  userId: 1
*/

// Match Props
//{ "path": "/user/:userId", "url": "/user/1", "isExact": true, "params": { "userId": "1" } }

// Location Props
//{ "pathname": "/user/1", "search": "", "hash": "", "key": "7e6lx5" }

//If we look at the content our userId parameter is in match.params.userId

//We can use these params in our compoent here and display information about our user

// Getting the userId from match props and display the user from the users array */ */

const UserPage = ({ match, location }) => {
  const {
    params: { userId }
  } = match;

  return (
    <>
      <p>
        <strong>User ID: </strong>
        {userId}
      </p>
      <p>
        <strong>User Name: </strong>
        {users[userId - 1].name}
      </p>
    </>
  );
};

export default function App() {
  return (
    <section className="App">
      {/*     /* Creating route definitions for our mapped users above requires us to use route parameters
Initially you would think the way to create route definitions would be like this:

///////// THE WRONG WAY TO DO IT - HARDCODING THEM ///////////
<Route exact path="/user/1" component={UserPage1} />
<Route exact path="/user/2" component={UserPage2} />

//////// THE RIGHT WAY TO DO IT - Parameterized routing //////////

<Route Path ="/user/:userId" component={UserPage} />

Here :userId is the dynamic route params in the route definition.
It gets passed to the component.

We can access these props called userId in the UserPage component if you want to.
 */}
      <Router>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/users">Users</Link>
        <br />
        <br />
        <DiscoverBtn />
        <br />
        <Route exact path="/" component={IndexPage} />
        <Route exact path="/users" component={UsersPage} />
        <Route exact path="/user/:userId" component={UserPage} />
        <Route exact path="/about" component={AboutPage} />
      </Router>
      <a href="/about">about with browser reload</a>
    </section>
  );
}
