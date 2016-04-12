Date.prototype.toLocalISOString =
    function ()
    {
        var year = this.getFullYear()
        var month = this.getMonth0()+1
        var day = this.getDate0()
        var date = [year, month, day]
        date = date.join('-')

        var hours = this.getHours0()
        var minutes = this.getMinutes0()
        var time = [hours, minutes]
        time = time.join(':')

        var offset = this.getTimezoneOffset()
        var offsetString = ''

        if(offset >= 0) {
            offsetString = '-'
        }
        else {
            offset = -offset
            offsetString = '+' 
        }

        offsetString = offsetString + ('0' + offset/60).slice(-2) + ':' + ('0' + offset%60).slice(-2)

        return date + 'T' + time + offsetString
    }


Date.prototype.getMonth0() =
    function ()
    {
        return ('0' + this.getMonth()).slice(-2)
    }
    
Date.prototype.getDate0() =
    function ()
    {
        return ('0' + this.getDate()).slice(-2)
    }

Date.prototype.getHours0() =
    function ()
    {
        return ('0' + this.getHours()).slice(-2)
    }

Date.prototype.getMinutes0() =
    function ()
    {
        return ('0' + this.getMinutes()).slice(-2)
    }
