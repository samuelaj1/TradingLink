import Vue from "vue";
import moment from "moment";

Vue.filter('initials', (name) => {
    return name.split(" ").map((n)=>n[0]).join(".");
})

Vue.filter('serviceType', (value) => {
    return value.split("_").map(v => capitalizeFirstLetter(v)).join(" ");
})

Vue.filter('toCurrencyFormat', (value) => {
    return process.env.VUE_APP_CURRENCY + " " + (Math.round(value * 100) / 100).toFixed(2);
})

Vue.filter('to2DecimalPlace', (value) => {
    return (Math.round(value * 100) / 100).toFixed(2);
})

Vue.filter('capitalizeFirstLetter', (value) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
})

Vue.filter('to4DigitsLeadingZeros', (num, size = 4) => {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
})

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

Vue.filter('toFormattedDateTime', (value) => {
    return moment(value).format('MMMM Do YYYY h:mm a');
})

Vue.filter('toFormattedDate', (value) => {
    return moment(value).format('YYYY-MM-DD');
})
