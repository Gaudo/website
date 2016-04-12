Date.prototype.toLocalISOString =
    function ()
    {
        var year = this.getFullYear()
        var month = ('0' + (this.getMonth()+1)).slice(-2)
        var day = ('0' + this.getDate()).slice(-2)
        var date = [year, month, day]
        date = date.join('-')

        var hours = ('0' + this.getHours()).slice(-2)
        var minutes = ('0' + this.getMinutes()).slice(-2)
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

