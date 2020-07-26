import React, { Component } from 'react';
import './Reminder.css';
import moment from 'moment';
import Push from 'push.js';
import { bake_cookie, read_cookie } from 'sfcookies';


let runReminders = [];

//instead of passing props.onInputChange, destructure it instead
class Reminder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            dueDate: '',
            reminders: read_cookie('reminders'),
        }
    }

    onInputChange = (event) => {
        this.setState({ input: event.target.value });
    }

    onDateChange = (event) => {
        this.setState({ dueDate: event.target.value });
    }

    addReminders = () => {
        const currentDate = moment().format();
        //Inputs must in the future
        if (this.state.input && this.state.dueDate > currentDate) {
            const reminder = {
                id: Math.random(),
                text: this.state.input,
                dueDate: this.state.dueDate
            };
            this.state.reminders.push(reminder);
            //resetting the input bar
            this.setState({ input: '' })
            document.getElementById("myForm").value = '';
            bake_cookie('reminders', this.state.reminders);
            // console.log('added reminders', this.state.reminders);
            // console.log('curernt date', this.state.reminders.dueDate);
            // console.log('js date', moment(new Date()))
            //render notifications
            const item = this.state.input;
            const time = moment(new Date(this.state.dueDate)).fromNow();
            this.renderAddConfirmation(item, time);
        } else {
            alert('Missing inputs or invalid inputs. Date set must be in the future. Please re-enter valid inputs!')
        }
    }

    clearReminders = async () => {
        await this.setState({ reminders: [] });
        bake_cookie('reminders', this.state.reminders);
        console.log('clear', this.state.reminders);
    }

    deleteReminders = (id) => {
        const updatedReminders = this.state.reminders.filter(reminder => reminder.id !== id);
        this.setState({ reminders: updatedReminders });
        bake_cookie('reminders', updatedReminders);
        console.log('deleted cookies', this.state.reminders);
    }

    displayReminders = () => {
        const reminderList = this.state.reminders.map(reminder => {
            return (
                <ul id="ul" className="list-group col-l-4">
                    <li key={reminder.id} className="list-group-item shadow-4">
                        <button onClick={() => this.wrapperComplete(reminder)} className="btn btn-primay grow shadow-4">&#x2713;</button>
                        <div className="list-item">
                            <div>{reminder.text}</div>
                            <div><em>{moment(new Date(reminder.dueDate)).fromNow()}</em></div>
                            <div><em>{moment(new Date(reminder.dueDate)).calendar()}</em></div>
                        </div>
                        <button onClick={() => this.deleteReminders(reminder.id)} className="btn btn-dark grow shadow-4">&#x2715;</button>
                    </li>
                </ul>
            );
        })
        return reminderList;
    }

    allowNotifications = () => {
        if (Push.Permission.has) {
            console.log('permission granted')
        }
    }

    renderExpiryNotifications = (item, time) => {
        Push.create("Expiry ALERT!", {
            body: `${item} is expiring ${time}!`,
            icon: '/icon.png',
            timeout: 5000,
            onClick: function () {
                window.focus();
                this.close();
            }
        });
    }

    renderAddConfirmation = (item, time) => {
        Push.create("Reminder created!", {
            body: `Reminder for ${item} is created. Item will expire in ${time}!`,
            icon: '/icon.png',
            timeout: 5000,
            onClick: function () {
                window.focus();
                this.close();
            }
        });
    }
    
    wrapperComplete = (reminder) => {
        this.props.completeReminders(reminder);
        this.deleteReminders(reminder.id);
    }
    
    //pop expiring reminders when loaded
    componentDidMount = () => {
        this.state.reminders.forEach(reminder => {
            if (moment(new Date(reminder.dueDate)).fromNow() === 'in 7 days') {
                runReminders
                    .push(this.renderExpiryNotifications(reminder.text,
                        moment(new Date(reminder.dueDate)).fromNow()));
            }
        })
    }

    render() {
        const { onRouteChange } = this.props;
        return (
            <div className="App">
                <div className="title br3">
                    <div className="header">
                        <hr></hr>
                        <h1 className="pa2 br2 burpee"><strong> &#x23F0; B U R P E E </strong></h1>
                    </div>
                </div>
                <div className="form-inline">
                    <div className="reminder-container">
                        <div className="reminder-inputs br3 shadow-5">
                            <input
                                id="myForm"
                                onChange={this.onInputChange}
                                className="form-control item-input"
                                placeholder="Insert item name"
                            />

                            <input
                                id="myForm"
                                onChange={this.onDateChange}
                                className="form-control date-input"
                                type="datetime-local"
                            />

                            <button
                                onClick={this.addReminders}
                                className="add-btn btn btn-success grow add-button br2 shadow-4"
                                type="button">
                                &#xff0b;
                            </button>
                        </div>
                        <div>
                            {this.displayReminders()}
                        </div>

                        <button
                            onClick={() => onRouteChange('milestones')}
                            className="btn btn-secondary achieve-button grow shadow-4"
                            type="button">
                            Milestones &#x1f3c6;
                            </button>

                        <button
                            onClick={this.clearReminders}
                            className="btn btn-secondary clear-button grow shadow-4"
                            type="button">
                            Clear All &#x1f5d1;
                            </button>
                    </div>

                </div>
            </div>
        );
    }
}

export default Reminder;