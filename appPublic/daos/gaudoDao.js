var Promise = require('promise')

module.exports.getBirthday = getBirthday
module.exports.getAge = getAge

function getAge()
{
    return getBirthday().then(
        function (birthday)
        {
            birthday = {'year': birthday.getFullYear(), 'month': (birthday.getMonth()+1), 'day': birthday.getDate()}
            var today = new Date()
            var today = {year: today.getFullYear(), month: today.getMonth()+1, day: today.getDate()}
            var years = today.year - birthday.year
            if(today.month < birthday.month || (today.month === birthday.month && today.day < birthday.day))
                --years

            return years
        }
    )
}

function getBirthday()
{
    return new Promise(
        function(resolve, reject) { resolve(new Date(1990, 11, 12)) } // actually 1990-12-12
    )
}
