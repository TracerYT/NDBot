module.exports = {
    formatDate(time){
        let newDate = new Date(time);
        let years = newDate.getFullYear();
        let months = newDate.getMonth();
        let days = newDate.getDate();

        let hours = newDate.getHours();
        let minutes = newDate.getMinutes();
        let seconds = newDate.getSeconds();

        months++;
        if(months < 10) months = `0${months}`;
        if(days < 10) days = `0${days}`;

        if(hours < 10) hours = `0${hours}`;
        if(minutes < 10) minutes = `0${minutes}`;
        if(seconds < 10) seconds = `0${seconds}`;    

        return `${hours}:${minutes}:${seconds} ${days}.${months}.${years}`;
    },
    dateDiff(date) {
        let newDate = new Date(date);
        let curDate = new Date();

        const MILLS_PER_DAY = 86400000;
        
        return Math.floor((curDate.getTime() - newDate.getTime()) / MILLS_PER_DAY);
    }
}