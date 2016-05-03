var Promise = require('promise')
var db = require(__APP + 'database') 

module.exports.showAllLimit = showAllLimit
module.exports.showAll = showAll
module.exports.show = show

function showAllLimit(limit)
{
    if(!((typeof limit === 'number') && (limit % 1 === 0)))
        throw new TypeError("Limit must be an integer")

    if(limit <= 0)
        throw new RangeError("Limit must be a positive value")            

    return new Promise(
        function(resolve, reject)
        {
            var sql = 'SELECT * FROM guides LIMIT ?'
            db.all(sql, [limit],
                function (err, rows)
                {
                    if(err)
                        reject(err)
                
                    resolve(rows)
                }
            )
        }
    )
}

function showAll()
{
    return new Promise(
        function(resolve, reject)
        {
            var sql = 'SELECT * FROM guides'
            db.all(sql, [],
                function (err, rows)
                {
                    if(err)
                        return reject(err)
                
                    resolve(rows)
                }
            )
        }
    )
}

function show(id)
{
    if(!((typeof id === 'number') && (id % 1 === 0)))
        throw new TypeError("Id must be an integer")

    if(id < 0)
        throw new RangeError("Id must be a non-negative value")            

    return new Promise(
        function(resolve, reject)
        {
            var sql = 'SELECT title, bodyHtml as body, created, modified FROM guides WHERE id = ?'
            db.get(sql, [id],
                function (err, row)
                {
                    if(err)
                        return reject(err)              

                    if(row === undefined)
                        return resolve(null)

                    row.created = new Date(row.created + ' UTC')

                    if(row.modified !== null)
                        row.modified = new Date(row.modified + ' UTC')

                    resolve(row)
                }
            )
        }
    )
}
