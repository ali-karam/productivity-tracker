import React, {Component} from 'react';
import {connect} from 'react-redux';

import Activity from '../../components/Activity/Activity';
import TimeInDay from '../../components/TimeInDay/TimeInDay';
import * as actions from '../../store/actions/actions';

class Timer extends Component {
    state = {
        timerOn: false,
        stopwatchStart: 0,
        stopwatchTime: 0,
        timerTime: this.props.duration,
        timerStart: 0,
        id: this.props.id
    };

    componentDidMount() {
        this.initializeTimer();
    }

    componentWillUnmount() {
        this.stopTimer();
    }

    initializeTimer = () => {
        if(this.props.stopwatchTime != null) {
            this.setState({
                timerOn: false,
                stopwatchStart: this.props.stopwatchStart,
                stopwatchTime: this.props.stopwatchTime,
                timerTime: this.props.timerTime,
                timerStart: this.props.timerStart
            });
        }
    };

    startTimer = () => {
        this.setState({
          timerOn: true,
          stopwatchTime: this.state.stopwatchTime,
          stopwatchStart: Date.now() - this.state.stopwatchTime,
          timerTime: this.state.timerTime,
          timerStart: this.state.timerTime
        });

        this.timer = setInterval(() => {
            this.setState({
                stopwatchTime: Date.now() - this.state.stopwatchStart
            });

            const newTime = this.state.timerTime - 1000;
            if(newTime >= 0) {
                this.setState({
                    timerTime: newTime
                });
            } 
        }, 1000);
    };

    stopTimer = () => {
        if(this.props.idToDelete !== this.props.id) {
            this.props.onSave(this.state.id, this.state.stopwatchStart,
                this.state.stopwatchTime, this.state.timerStart, 
                    this.state.timerTime);
        }
        this.setState({ timerOn: false });
        clearInterval(this.timer);
    };

    displayTime = (time) => {
        let seconds = ("0" + (Math.floor(time / 1000) % 60)).slice(-2);
        let minutes = ("0" + (Math.floor(time / 60000) % 60)).slice(-2);
        let hours = ("0" + Math.floor(time / 3600000)).slice(-2);
        return `${hours} : ${minutes} : ${seconds}`;
    };

    render() {
        let timer = (
            <Activity
                startTimer={this.startTimer} 
                stopTimer={this.stopTimer}
                goalTime={this.displayTime(this.props.duration)}
                remainingTime={this.displayTime(this.state.timerTime)}
                elapsedTime={this.displayTime(this.state.stopwatchTime)}
                timerOn={this.state.timerOn}
                name = {this.props.name}
                deleteActivity = {this.props.deleteActivity}
            />
        );
        if(this.props.isDayTimer) {
            timer = (
                <TimeInDay
                    name={'Time In Day'}
                    enteredTime={'10:00'}
                    remainingTime={'5:00'}
                    elapsedTime={'5:00'}
                />
            );
        }
        return (
            <React.Fragment>{timer}</React.Fragment>
        );
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onSave: (id, stopwatchStart, stopwatchTime, timerStart, timerTime) => 
            dispatch(actions.saveTime(id, stopwatchStart, stopwatchTime, 
                timerStart, timerTime))
    };
};

export default connect(null, mapDispatchToProps)(Timer);