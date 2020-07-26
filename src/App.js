import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import Reminder from './components/Reminder';
import Milestone from './components/Milestone';
import moment from 'moment';
import { bake_cookie, read_cookie } from 'sfcookies';
import './App.css';

//Title of page
const burpee = 'Burpee'

//storing the number of timely reminders completed
let count = read_cookie('countCookie');

class App extends Component {
  // eslint-disable-next-line
  constructor() {
    super();
    this.state = {
      input: '',
      route: 'home',
    }
  }

  onRouteChange = (route) => {
    this.setState({ route: route });
  }

  completeReminders = (reminder) => {
    let newCount = count++;
    if (moment() <= moment(new Date(reminder.dueDate))) {
      bake_cookie('countCookie', newCount);
      console.log(moment() <= moment(new Date(reminder.dueDate)));
    }
  }

  // componentDidMount = () => {
  //   console.log('stateCount', this.state.count);
  //   console.log('countCookie', read_cookie('countCookie'));
  // }

  render() {
    return (
      <div>
        <Helmet>
          <title>{burpee}</title>
          <link href="data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAA/wAAAP8AAAD/G1OA/0BTV/9AU1f/QFNX/0BTV/9AU1f/AAAA/wAAAAAAAAAAAAAAAAAAAAAAAAD/Ra3w/0Wt8P8AAAD/G1OA/xtTgP9AU1f/q9bf/6vW3/+r1t//q9bf/0BTV/8AAAD/AAAAAAAAAAAAAAD/Ra3w/6/g//8AAAD/Ra3w/0Wt8P9AU1f/q9bf/6vW3/8AAAD/AAAA/6vW3/+r1t//AAAA/wAAAAAAAAAAAAAA/6/g//+v4P//AAAA/0Wt8P9FrfD/q9bf/6vW3/+r1t//q9bf/6vW3/8AAAD/rNfg/wAAAP8AAAAAAAAAAAAAAPWp2Pb/AAAA/wAAAABFrfD/Ra3w/6fU4P+n1OD/Ra3w/0Wt8P8AAAD/AgUI/6zX4P8AAAD/AAAAAAAAAAAAAAAAAAAA/wAAAAAAAAAIAgUH/0Wt8P9FrfD/AAAA//f3//9FrfD/Ra3w/0Wt8P8FBgb/AAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP9FrfD/Ra3w/0Wt8P9FrfD/Ra3w/wAAAP/39///AAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/r+D//0Wt8P9FrfD/Ra3w/0Wt8P9FrfD/Ra3w/wAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/6/g//9FrfD/Ra3w/0Wt8P9FrfD/Ra3w/wAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP+v4P//r+D//wAAAP8AAAD/AAAA/6/g//8AAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAP8AAAAAAAAAAAAAAAAAAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//8AAP//AAD8AwAA4AMAAMABAACAAQAAgAEAAIgBAADYAwAA+AMAAPgDAAD4BwAA+AcAAPzvAAD//wAA//8AAA==" rel="icon" type="image/x-icon" />
        </Helmet>

        {
          this.state.route === 'home'
          ? <Reminder completeReminders={this.completeReminders} onRouteChange={this.onRouteChange} />
          : <Milestone count={count} onRouteChange={this.onRouteChange} />
        }
      </div>
    );
  }
}

export default App;
