import React, {Component} from 'react';
import {connect} from 'react-redux';

import Activity from '../../components/Activity/Activity';
import TimeInDay from '../../components/TimeInDay/TimeInDay';
import * as actions from '../../store/actions/actions';
import {displayTime} from '../../shared/time';

class Timer extends Component {

    constructor(props) {
        super(props);

        if(this.props.stopwatchTime != null) {
            this.state = {
                timerOn: false,
                stopwatchStart: this.props.stopwatchStart,
                stopwatchTime: this.props.stopwatchTime,
                timerTime: this.props.timerTime,
                id: this.props.id
            };
        } else {
            this.state = {
                timerOn: false,
                stopwatchStart: 0,
                stopwatchTime: 0,
                timerTime: this.props.duration,
                id: this.props.id
            }
        }
    }

    componentDidMount() {
        window.addEventListener("beforeunload", this.stopTimer);
        if(this.props.isDayTimer) {
            this.initializeDayTimer().then(this.startTimer);
            window.addEventListener("beforeunload",
            this.saveDayTimerToLocalStorage.bind(this));
        } else if(this.props.timerOn){
            this.initializeTimerIfOn().then(this.startTimer);
        } 
    }

    componentWillUnmount() {
        window.removeEventListener("beforeunload", this.stopTimer);
        this.stopTimer();
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

    async initializeTimerIfOn() {
        if(this.props.stopwatchTime != null) {
            let value = {
                stopwatchStart: this.props.stopwatchStart,
                stopwatchTime: this.props.stopwatchTime,
                timerTime: this.props.timerTime,
                duration: this.props.duration
            };
            value.stopwatchTime = Date.now() - value.stopwatchStart;
            value.timerTime = value.duration - value.stopwatchTime + 1000;
            this.setState({...value});
        }
    }

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
                this.state.stopwatchTime, this.state.timerTime, this.state.timerOn);
        }
        this.setState({ timerOn: false });
        clearInterval(this.timer);
    };

    render() {
        let timer = (
            <Activity
                startTimer={this.startTimer} 
                stopTimer={this.stopTimer}
                goalTime={displayTime(this.props.duration)}
                remainingTime={displayTime(this.state.timerTime)}
                elapsedTime={displayTime(this.state.stopwatchTime)}
                timerOn={this.state.timerOn}
                name = {this.props.name}
                deleteActivity = {this.props.deleteActivity}
            />
        );
        if(this.props.isDayTimer) {
            timer = (
                <TimeInDay
                    enteredTime={displayTime(this.props.duration)}
                    remainingTime={displayTime(this.state.timerTime)}
                    elapsedTime={displayTime(this.state.stopwatchTime)}
                />
            );
        }
        return <React.Fragment>{timer}</React.Fragment>;
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onSave: (id, stopwatchStart, stopwatchTime, timerTime, timerOn) => 
            dispatch(actions.saveTime(id, stopwatchStart, stopwatchTime, 
                timerTime, timerOn))
    };
};

export default connect(null, mapDispatchToProps)(Timer);