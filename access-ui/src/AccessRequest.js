import './AccessRequest.css';

import axios from 'axios';
import logo from './logo.png';
import React from 'react';

import backgroundImageUrl from './background.png';

const styles = {
    form: {
        display: 'flex',
        flexDirection: 'column',        
        gap: '3px',
        alignItems: 'flex-start' // Align items to the start
    },
    labelInputPair: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Align items to the start
        justifyContent  : 'left',
        width: '100%'
    },
    label: {
        textAlign: 'left' // Text align to the left
    },
    input: {
        margin: '5px',
        padding: '10px',
        borderRadius: '5px',
        height: '10px', // Use 'height' instead of 'innerHeight'
        border: '1px solid #ccc',
        width: '100%', // Full width
        justifyContent: 'center'
    },
    formContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        padding: '20px',
        borderRadius: '5px'
    }
};

class AccessRequest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {      
            users: [],
            events: [],
            backgroundImageUrl: '',
            NewUserFormName: '',
            NewUserFormSurname: '',
            NewUserFormTitle: '',
            NewUserFormSeniority: '',
            NewUserFormComputerModel: '',
            NewUserFormRegion: '',
            NewUserFormFirstDay: '',
            NewUserFormBirthDay: '',

        };
        this.handleShowUsers = this.handleShowUsers.bind(this);
        this.handleShowEvents = this.handleShowEvents.bind(this);
        this.toggleOpenCreateUser = this.toggleOpenCreateUser.bind(this);

        this.handlenewUserFormNameChange = this.handlenewUserFormNameChange.bind(this);
        this.handlenewUserFormSurnameChange = this.handlenewUserFormSurnameChange.bind(this);
        this.handlenewUserFormTitleChange = this.handlenewUserFormTitleChange.bind(this);
        this.handlenewUserFormSeniorityChange = this.handlenewUserFormSeniorityChange.bind(this);
        this.handlenewUserFormComputerModelChange = this.handlenewUserFormComputerModelChange.bind(this);
        this.handlenewUserFormRegionChange = this.handlenewUserFormRegionChange.bind(this);
        this.handlenewUserFormFirstDayChange = this.handlenewUserFormFirstDayChange.bind(this);
        this.handlenewUserFormBirthDayChange = this.handlenewUserFormBirthDayChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleShowUsers() {
        this.setState({ isOpen: 'users' });
        fetch('http://localhost:8080/api/users')
        .then(response => response.json())
        .then(data => this.setState({ users: data }))
        .catch(error => console.error('Error:', error));
    }

    handleShowEvents() {
        this.setState({ isOpen: 'events' });
        fetch('http://localhost:8080/events')
        .then(response => response.json())
        .then(data => this.setState({ events: data }))
        .catch(error => console.error('Error:', error));      
    }

    toggleOpenCreateUser() {
        this.setState({ isOpen: 'createUser' });
    }

    handlenewUserFormBirthDayChange(event) {
        this.setState({ NewUserFormBirthDay: event.target.value });
    }

    handlenewUserFormFirstDayChange(event) {
        this.setState({ NewUserFormFirstDay: event.target.value });
    }

    handlenewUserFormRegionChange(event) {
        this.setState({ NewUserFormRegion: event.target.value });
    }

    handlenewUserFormComputerModelChange(event) {
        this.setState({ NewUserFormComputerModel: event.target.value });
    }

    handlenewUserFormSeniorityChange(event) {
        this.setState({ NewUserFormSeniority: event.target.value });
    }

    handlenewUserFormTitleChange(event) {
        this.setState({ NewUserFormTitle: event.target.value });
    }

    handlenewUserFormSurnameChange(event) {
        this.setState({ NewUserFormSurname: event.target.value });
    }

    handlenewUserFormNameChange(event) {
        this.setState({ NewUserFormName: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
    
        const data = {
            name: this.state.NewUserFormName,
            surname: this.state.NewUserFormSurname,
            computerModel: this.state.NewUserFormComputerModel,
            region: this.state.NewUserFormRegion,
            seniority: this.state.NewUserFormSeniority,
            birthDate: this.state.NewUserFormBirthDate,
            firstDay: this.state.NewUserFormFirstDay,
            title: this.state.NewUserFormTitle
        };
    
        fetch('http://localhost:8080/api/createUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    componentDidMount() {   
                this.setState({ backgroundImageUrl: backgroundImageUrl });                
            }    


    render() {
        return (
            <div style={{
                backgroundImage: `url(${this.state.backgroundImageUrl})`, // Use the URL from the state
                backgroundSize: 'cover',
                backgroundAttachment: 'fixed'
            }}>

                <img src={logo} alt="Logo" style={{ display: 'block', marginBottom: '20px', marginLeft: 'auto', marginRight: 'auto', width: '300px' }} />

                <button className="menuButton" onClick={this.handleShowUsers}>Users</button>
                <button className="menuButton" onClick={this.handleShowEvents}>Events</button>
                <button className="menuButton" onClick={this.toggleOpenCreateUser}>Create User</button>
                {this.state.isOpen === 'users' && (
                    <div>
                        <table style={{ margin: 'auto', marginTop: '12px', width: '50%', border: '1px solid black' }}>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.users.reverse().map((user, index) => (
                                    <tr key={user.id} style={{ backgroundColor: index % 2 === 0 ? 'lightgray' : 'white' }}>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {this.state.isOpen === "events" && (
                    <div>
                        <table style={{
                            margin: 'auto',
                            marginTop: '12px',
                            width: '50%',
                            border: '1px solid black',
                            borderRadius: '5px',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.26)',
                            fontFamily: 'Arial, sans-serif',
                            color: '#333'
                        }}>
                            {/* ... */}
                            <tbody>
                                {this.state.events.reverse().map((event, index) => {
                                    let backgroundColor = 'transparent';
                                    let fontColor = 'black';
                                    if (event.authEntity.authorized) {
                                        if (event.eventType === 'ENTRY') {
                                            backgroundColor = 'lightgreen'; // light green for granted entry
                                            fontColor = 'dark';
                                        } else if (event.eventType === 'EXIT') {
                                            backgroundColor = 'lightblue'; // light blue for granted exit
                                            fontColor = 'dark';
                                        }
                                    } else {
                                        if (event.authEntity.reason === 'Key does not exist in DB') {
                                            backgroundColor = 'darkgray'; // dark gray for unknown key
                                            fontColor = 'light';
                                        } else if (event.authEntity.reason === 'TIME_CONTROL') {
                                            backgroundColor = 'lightorange'; // light orange for denied for time control
                                        } else if (event.authEntity.reason === 'Key is disabled') {
                                            backgroundColor = 'darkorange'; // dark orange for denied for disabled key
                                        }
                                    }

                                    return (
                                        <tr key={event.user.userId} style={{ backgroundColor, color: fontColor, borderStyle: 'solid', borderWidth: '1px', padding: '10px' }}>
                                            <td>{event.user.username}</td>
                                            <td>{event.keylockCode}</td>
                                            <td>{event.dateTime}</td>
                                            <td>{event.eventType}</td>
                                            <td>{event.authEntity.authorized ? 'GRANTED' : 'DENIED'}</td>
                                            <td>{event.authEntity.reason}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
                {this.state.isOpen === 'createUser' && (
                    <div style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '5px' }}>
                    {/* Create User section */}
                    <form onSubmit={this.handleSubmit} style={styles.form}>
    <div style={styles.labelInputPair}>
        <label style={styles.label}>
                            Name:
                            <input type="text" name="NewUserFormName" value={this.state.NewUserFormName} onChange={this.handlenewUserFormNameChange} style={styles.input} />
                        </label>
                        <label style={styles.label}>
                            Surname:
                            <input type="surname" name="NewUserFormSurname" value={this.state.NewUserFormSurname} onChange={this.handlenewUserFormSurnameChange} style={styles.input} />
                        </label>
                        <label style={styles.label}>
                            Title:
                            <input type="text" name="NewUserFormTitle" value={this.state.NewUserFormTitle} onChange={this.handlenewUserFormTitleChange} style={styles.input} />
                        </label>
                        <label style={styles.label}>
                            Seniority:
                            <input type="text" name="NewUserFormSeniority" value={this.state.NewUserFormSeniority} onChange={this.handlenewUserFormSeniorityChange}  style={styles.input} />
                        </label>
                        <label style={styles.label}>
                            Computer Model:
                            <input type="text" name="NewUserFormComputerModel" value={this.state.NewUserFormComputerModel} onChange={this.handlenewUserFormComputerModelChange}  style={styles.input} />
                        </label>
                        <label style={styles.label}>
                            Region:
                            <input type="text" name="NewUserFormRegion" value={this.state.NewUserFormRegion} onChange={this.handlenewUserFormRegionChange}  style={styles.input} />
                        </label>
                        <label style={styles.label}>
                            First Day:
                            <input type="date" name="NewUserFormFirstDay" value={this.state.NewUserFormFirstDay} onChange={this.handlenewUserFormFirstDayChange}  style={styles.input} />
                        </label>
                        <label style={styles.label}>
                            Birth Day:
                            <input type="date" name="NewUserFormBirthDay" value={this.state.NewUserFormBirthDay} onChange={this.handlenewUserFormBirthDayChange}  style={styles.input} />
                        </label>
                        <button className="submitButton" type="submit">Submit</button>
                        </div>
                    </form>
                </div>
                )}
            </div>
        );
    }
}

export default AccessRequest;