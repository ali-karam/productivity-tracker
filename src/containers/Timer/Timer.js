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
        id: this.props.id
    };

    componentDidMount() {
        this.initializeTimer();
        window.addEventListener("beforeunload", this.stopTimer.bind(this));
        if(this.props.isDayTimer) {
            this.initializeDayTimer().then(this.startTimer);
            window.addEventListener("beforeunload",
            this.saveDayTimerToLocalStorage.bind(this));
        }
    }

    componentWillUnmount() {
        window.removeEventListener("beforeunload", this.stopTimer.bind(this));
        if(this.props.isDayTimer) {
            window.removeEventListener("beforeunload",
                this.saveDayTimerToLocalStorage.bind(this));
        }
    }

    saveDayTimerToLocalStorage() {
        const dayTimer = {
            duration: this.props.duration,
            stopwatchStart: this.state.stopwatchStart,
            stopwatchTime: this.state.stopwatchTime,
            timerTime: this.state.timerTime
        };
        if(dayTimer.timerTime > 1800) {
            localStorage.setItem('dayTimer', JSON.stringify(dayTimer));
        } else {
            localStorage.removeItem('dayTimer');
        }
    }

    async initializeDayTimer() {
        if(localStorage.hasOwnProperty('dayTimer')) {
            let value = localStorage.getItem('dayTimer');
            value = JSON.parse(value);
            value.stopwatchTime = Date.now() - value.stopwatchStart;
            value.timerTime = value.duration - value.stopwatchTime
            this.setState({...value});
        }
    }

    initializeTimer = () => {
        if(this.props.stopwatchTime != null) {
            this.setState({
                timerOn: false,
                stopwatchStart: this.props.stopwatchStart,
                stopwatchTime: this.props.stopwatchTime,
                timerTime: this.props.timerTime
            });
        }
    };

    startTimer = () => {
        this.setState({
          timerOn: true,
          stopwatchTime: this.state.stopwatchTime,
          stopwatchStart: Date.now() - this.state.stopwatchTime
        });

        this.timer = setInterval(() => {
            let newTime = this.state.timerTime - 1000;
            newTime = newTime >= 0 ? newTime : this.state.timerTime;
            this.setState({
                stopwatchTime: Date.now() - this.state.stopwatchStart,
                timerTime: newTime
            });
        }, 1000);
    };

    stopTimer = () => {
        if(this.props.idToDelete !== this.props.id) {
            this.props.onSave(this.state.id, this.state.stopwatchStart,
                this.state.stopwatchTime, this.state.timerTime);
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
                    enteredTime={this.displayTime(this.props.duration)}
                    remainingTime={this.displayTime(this.state.timerTime)}
                    elapsedTime={this.displayTime(this.state.stopwatchTime)}
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
        onSave: (id, stopwatchStart, stopwatchTime, timerTime) => 
            dispatch(actions.saveTime(id, stopwatchStart, stopwatchTime, 
                timerTime))
    };
};

export default connect(null, mapDispatchToProps)(Timer);