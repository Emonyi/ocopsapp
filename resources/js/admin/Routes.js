import React from 'react';
import { Route, Redirect, Switch, } from 'react-router-dom';
import Login from "./components/login/Login";
import Dashboard from './components/pages/Dashboard';
import ListPolls from './components/pages/polls/Index';
import AddPolls from './components/pages/polls/Add';
import EditPolls from './components/pages/polls/Edit';
import PollQuestion from './components/pages/polls/poll_question';
import ListTopics from './components/pages/topics/Index';
import AddTopics from './components/pages/topics/Add';
import EditTopics from './components/pages/topics/Edit';
import AddPollQuestions from './components/pages/questions/Question';
import ListUsers from './components/pages/users/Index';
import AddUsers from './components/pages/users/Add';
import EditUsers from './components/pages/users/Edit';
import AddQuestion from './components/pages/questions/Add';
import AuntenticatedRoute from './AuntenticatedRoute';

class Routes extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path='/login' component={Login} />
                <AuntenticatedRoute exact path="/" component={Dashboard} />
                <Route exact path="/polls" component={ListPolls}></Route>
                <Route path="/polls/add" component={AddPolls}></Route>
                <Route path="/polls/edit/:id" component={EditPolls}></Route>
                <Route path='/polls/poll_question' component={PollQuestion}/>
                <Route exact path='/questions/question/:id' component={AddPollQuestions}></Route>
                <Route exact path="/topics" component={ListTopics}></Route>
                <Route path="/topics/add" component={AddTopics}></Route>
                <Route path="/topics/edit/:id" component={EditTopics}></Route>
                <Route path="/questions/add/:id" component={AddQuestion}/>
                <Route exact path="/users" component={ListUsers} />
                <Route path ="/users/add" component={AddUsers}></Route>
                <Route path="/users/edit/:id" component={EditUsers} />
            </Switch>
        )
    }
}
export default Routes