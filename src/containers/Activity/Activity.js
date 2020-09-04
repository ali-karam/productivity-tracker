import React, {Component} from 'react';
import './Activity.css';

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
        let timerButton = <button onClick={this.startTimer}>Start</button>;
        if(this.state.timerOn) {
            timerButton = <button onClick={this.stopTimer}>Pause</button>;
        }
        
        return (
            <div className='Activity'>
                <h3 className='ActivityName'>{this.props.name}</h3>
                <p>
                    <strong>Goal : </strong>
                    {this.displayTime(this.props.duration)}
                </p>
                <p>
                    <strong>Remaining : </strong>
                    {this.displayTime(this.state.timerTime)}
                </p>
                <p>
                    <strong>Elapsed : </strong>
                    {this.displayTime(this.state.stopwatchTime)}
                </p>
                {timerButton}
            </div>
        );
    }
};

export default Activity;