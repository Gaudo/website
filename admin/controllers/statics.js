module.exports.home =
    function(request, response)
    {
        response.render('index')
    }

module.exports.skills =
    function(request, response)
    {
        response.render('skills')
    }

module.exports.aboutMe =
    function(request, response)
    {
        var birthday = {year: 1990, month: 12, day: 12}
        var today = new Date()
        var today = {year: today.getFullYear(), month: today.getMonth()+1, day: today.getDate()}
        var years = today.year - birthday.year
        if(today.month < birthday.month || (today.month === birthday.month && today.day < birthday.day))
            --years

        response.render('about_me', {'years': years})
    }
