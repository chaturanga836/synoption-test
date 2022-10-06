

NOTIFICATION_CHANNEL = 'syn_option_notification';

var io = null

module.exports = {
    func1:function initiateSocketCons(server, sub, db){


        io = require('socket.io').listen(server)

        // socket io code goes here
        io.sockets.on('connection', function (socket) {

            let userId = socket.handshake.query.userId;
        
                

            // Subscribe to the Redis channel using our global subscriber
            sub.subscribe(NOTIFICATION_CHANNEL)

            db.rpush([userId, socket.id], function(err, reply) {
                console.log(reply); //prints 2
            });

            // db.rpush.apply(db, [userId].concat([socket.id]).concat(function(err, ok){
            //   console.log(err, ok);
            // }));
            
            //socket.on('cw-notifications', function (data) {
                // console.log('SUBSCRIBE TO CHANNEL', data)
                
                // // Subscribe to the Redis channel using our global subscriber
                // sub.subscribe(NOTIFICATION_CHANNEL)
            //})
            
            socket.on('disconnect', function () {
                console.log('DISCONNECT')
                console.log('DISCONNECT UID ' + userId)
                console.log('DISCONNECT ID ' + socket.id)

                db.lrem(userId, 0, socket.id, function(err, data){
                    console.log(data); // Tells how many entries got deleted from the list
                });
            });
            
        })

    },

    func2:function emitToUser(destination, data){
        io.sockets.to(destination).emit('notification-messages', data)

    }
}


