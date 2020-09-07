import React, {Component} from 'react';

import classes from './Activity.module.css';
import Timer from '../../components/Timer/Timer';

class Activity extends Component {
    state = {
        timerOn: false,
        stopwatchStart: 0,
        stopwatchTime: 0,
        timerTime: this.props.duration,
        timerStart: 0
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
            } else {
                clearInterval(this.timer);
                this.setState({timerOn: false});
            }
        }, 1000);
    };

    stopTimer = () => {
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
        return (
            <div className={classes.Activity}>
                <h3 className={classes.ActivityName}>{this.props.name}</h3>
                <Timer 
                    startTimer={this.startTimer} 
                    stopTimer={this.stopTimer}
                    goalTime={this.displayTime(this.props.duration)}
                    remainingTime={this.displayTime(this.state.timerTime)}
                    elapsedTime={this.displayTime(this.state.stopwatchTime)}
                    timerOn={this.state.timerOn}
                />
                <button className={classes.DeleteButton} 
                    onClick={this.props.deleteActivity}>Delete
                </button>
            </div>
        );
    }
};

export default Activity;