Date.prototype.toLocalISOString =
    function ()
    {
        var month = this.getMonth()+1
        var date = [this.getFullYear(), ('0'+ month).slice(-2), ('0'+ this.getDate()).slice(-2)]
        date = date.join('-')

        var time = [this.getHours(), this.getMinutes()]
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

