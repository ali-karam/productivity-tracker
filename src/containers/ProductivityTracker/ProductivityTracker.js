import React, {Component} from 'react';
import Activity from '../../components/Activity/Activity';

class ProductivityTracker extends Component {
    state = {
        timerOn: false,
        timerStart: 0,
        timerTime: 0
    };

    startTimer = () => {
        this.setState({
            timerOn: true,
            timerStart: Date.now() - this.state.timerTime
        });
        this.timer = setInterval(() => {
            this.setState({
                timerTime: Date.now() - this.state.timerStart
            });
        }, 1000);
    };

    stopTimer = () => {
        this.setState({timerOn: false});
        clearInterval(this.timer);
    };

    resetTimer = () => {
        this.stopTimer();
        this.setState({
            timerStart: 0,
            timerTime: 0
        });
    };

    displayTime = () => {
        const timerTime  = this.state.timerTime;
        let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
        let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
        let hours = ("0" + Math.floor(timerTime / 3600000)).slice(-2);
        return `${hours} : ${minutes} : ${seconds}`;
    }

    render() {
        return (
            <div>
                <Activity 
                    time={this.displayTime()} 
                    startTimer={this.startTimer}
                    stopTimer={this.stopTimer}
                    resetTimer={this.resetTimer}
                />
            </div>
        );
    }
}

export default ProductivityTracker;